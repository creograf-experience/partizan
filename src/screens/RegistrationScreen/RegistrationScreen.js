import React, { PureComponent } from 'react';
import { Alert, Linking, AsyncStorage } from 'react-native';

import api from '../../networkers';
import {
  countries,
  urls,
  LOADING_SCREEN
} from '../../constants';

import { Button } from '../../containers';
import { ContentWrapper, TitleWrapper } from './components';
import {
  CountrySelectionModal,
  InputNumberContainer,
  LogoContainer,
  CountryLineContainer,
} from './containers';
import { TitleText } from '../../components';

export default class RegistrationScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      modalVisible: false,
      searchLineText: '',
      country: 'Россия',
      callingCode: '+7',
      flag: urls.russianFlagUrl,
      telephoneNumber: '',
      phoneString: '+74951348348',
    };
  }

  _storeData = async (number) => {
    try {
      await AsyncStorage.setItem('number', number);

    } catch (error) {
      console.warn(error);
    }
  };

  putNumberInDataBase = async (number) => {
    try {
      await api.auth.savePhone(number);

    } catch (err) {
      console.warn(err);
    }
  };

  onCallingButtonPressed = async () => {
    const telephoneNumber = { phone: `${this.state.callingCode}` + `${this.state.telephoneNumber}` };

    if (this.state.telephoneNumber === '') return Alert.alert('Ошибка', 'Для продолжения укажите номер телефона');
    if (!this.checkNumber()) return Alert.alert('Ошибка', 'Пожалуйста, введите корректный номер');

    await this._storeData(telephoneNumber.phone);
    const { phoneString, callingCode } = this.state;
    Linking.openURL(`tel:${ callingCode === '+86' ? '0074951348348' : phoneString }`);
    await this.putNumberInDataBase(telephoneNumber.phone);
    this.props.navigation.navigate(LOADING_SCREEN);
  };

  checkNumber = () => {
    const number = this.state.telephoneNumber;
    const { country } = this.state;
    if (country === 'Россия') {
      return number.length === 10 && !isNaN(parseFloat(number)) 
    }
    else{
      return number.length < 18 && number.length > 6 && !isNaN(parseFloat(number))
    }
  };

  setModalVisible = () => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible,
      searchLineText: '',
    });
  };

  onChangeTextInSearchLine = (text) => {
    this.setState({
      searchLineText: text,
    });
  };

  onChangeTelephoneNumber = (text) => {
    this.setState({
      telephoneNumber: text,
    });
  };

  onCountrySelection = (name, callingCode, flag) => {
    this.setState({
      country: name,
      callingCode,
      flag,
    });
    this.setModalVisible();
  };

  filterCountries = () => {
    const allCountries = Object.values(countries);
    if (this.state.searchLineText.length === 0) {
      return allCountries;
    }
    else {
      return allCountries.filter(
        country => country.name.rus.toLowerCase()
          .indexOf(this.state.searchLineText.toLowerCase()) === 0
      );
    }
  };


  renderItem = ({ item }) => {
    if (item.callingCode) {
      return (
        <CountryLineContainer
          onCountrySelection={this.onCountrySelection}
          uri={item.flag}
          countryName={item.name.rus}
          callingCode={`+${item.callingCode}`}
        />
      );
    }
    return null;
  };

  render() {
    return (
      <ContentWrapper>
        <LogoContainer />
        <TitleWrapper>
          <TitleText>
            Регистрация
          </TitleText>
        </TitleWrapper>
        <InputNumberContainer
          onChangeTelephoneNumber={this.onChangeTelephoneNumber}
          makeModalVisible={this.setModalVisible}
          countryName={this.state.country}
          callingCode={this.state.callingCode}
          flag={this.state.flag}
        />
        <Button
          disabled={this.state.disabled}
          type="primary"
          text="Позвонить"
          onPress={() => this.onCallingButtonPressed()}
        />
        <CountrySelectionModal
          countries={countries}
          modalVisible={this.state.modalVisible}
          onClose={this.setModalVisible}
          onChangeTextInSearchLine={this.onChangeTextInSearchLine}
          valueInSearchLine={this.state.searchLineText}
          renderItem={this.renderItem}
          filterCountries={this.filterCountries()}
          keyExtractor={item => item.name.common}
        />
      </ContentWrapper>
    );
  }
}
