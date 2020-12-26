import React, { PureComponent } from 'react';
import { AsyncStorage, Alert } from 'react-native';

import api from '../../networkers';

import { ActivityIndicatorContainer } from './containers';
import { ContentWrapper } from './components';
import { PROFILE_SELECTION_SCREEN, REGISTRATION_SCREEN } from "../../constants";

class LoadingScreenComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      numberOfRequests: 0
    };
  }

  async componentDidMount() {
    await this.getNumberFromStorage();
    this._timer = setInterval(() => { this.profileCheck(); }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  getNumberFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('number');
      if (value !== null) {
        this.setTelephone(value);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  profileCheck = async () => {
    let number = this.state.numberOfRequests;
    if (number < 5) {
      try {
        const { phone } = this.state;
        const { navigation } = this.props;

        const res = await api.auth.verifyPhone(phone)

        const { isVerified, jwtToken } = res;
        number += 1;
        this.setState({ numberOfRequests: number });
        if (!isVerified) return;

        await this._storeData(jwtToken);
        await api.notifications.notifyContacts();

        clearInterval(this._timer);
        navigation.navigate(PROFILE_SELECTION_SCREEN);

      } catch (err) {
        console.warn(err);
        number += 1;
        this.setState({ numberOfRequests: number });
      }
    } else {
      Alert.alert('Проверьте соединение с интернетом.', 'Возможно, отсутствует подключение к серверу. Пожалуйста, попробуйте позже.');
      this.props.navigation.navigate(REGISTRATION_SCREEN);
    }
  };

  _storeData = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);

    } catch (error) {
      console.warn(error);
    }
  };

  setTelephone = (number) => {
    this.setState({ phone: number });
  };

  render() {
    return (
      <ContentWrapper>
        <ActivityIndicatorContainer />
      </ContentWrapper>
    );
  }
}

export default LoadingScreenComponent;
