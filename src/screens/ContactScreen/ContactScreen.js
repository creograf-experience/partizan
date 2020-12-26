import React from 'react';
import {
  View,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { verticalScale } from 'react-native-size-matters';
import * as SMS from 'expo-sms';

import {
  BLACKLIST_SCREEN,
  ACTIVE_CHAT_SCREEN
} from '../../constants';
import { setActiveChat } from '../../actions';
import api from '../../networkers';

import {
  HeaderButtonWrapper,
  HeaderButtonText,
} from '../ContactsScreen/components';
import Avatar from './components/Avatar';
import ContactInfo from './components/ContactInfo';
import StarRatingSelection from './components/StarRatingSelection';
import PhonePicker from './components/PhonePicker';
import {
  ButtonsIfNotPartizan,
  ButtonsIfPartizan
} from './components/Buttons';
import { HeaderLeftBtn } from '../ActiveChatScreen/components/HeaderBtn';

class ContactScreen extends React.Component {
  state = {
    selectedRating: { value: 0 },
    phoneNumbers: [],
    selectedPhone: ''
  };

  render() {
    const { contact } = this.props.navigation.state.params;
    const {
      selectedRating,
      selectedPhone,
      phoneNumbers
    } = this.state;

    return(
      <ScrollView contentContainerStyle={{
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 30,
        backgroundColor: '#f5f5f5'
      }}>
        <View style={{alignItems: 'center'}}>
          <Avatar ratingValue={contact.rating.averageValue} />

          <ContactInfo contact={contact} />

          {
            Platform.OS === 'android' &&
              <StarRatingSelection
                onSelect={this.handleStarRatingSelect}
                selectedRating={selectedRating}
              />
          }

          {
            phoneNumbers.length > 1 &&
              <PhonePicker
                phoneNumbers={phoneNumbers}
                selectedPhone={selectedPhone}
                onSelect={value => this.setState({ selectedPhone: value })}
              />
          }
        </View>

        <View style={{alignSelf: 'stretch'}}>
          {
            contact.userExist
              ? <ButtonsIfPartizan
                  onSendMessagePress={this.openChat}
                />
              : <ButtonsIfNotPartizan
                  onInvitePress={this.sendInvite}
                  onSendMessagePress={this.openChat}
                />
          }
        </View>
      </ScrollView>
    );
  }

  componentDidMount() {
    const { contact } = this.props.navigation.state.params;
    
    if (!contact.userExist) {
      this.setState({
        phoneNumbers: contact.phoneNumbers,
        selectedPhone: contact.phoneNumbers[0].number,
        selectedRating: { value: contact.latestRatingValue, id: 0 }
      });
      return;
    }

    const phoneNumbers =
      contact.phoneNumbers.filter(number => number.phoneExist);

    this.setState({
      phoneNumbers,
      selectedPhone: phoneNumbers[0].number,
      selectedRating: { value: contact.latestRatingValue, id: 0 }
    });
  }

  handleStarRatingSelect = async item => {
    try {
      const { contact } = this.props.navigation.state.params;
      this.setState({ selectedRating: item });

      await api.contacts.rate(contact, item.value);

      contact.latestRatingValue = item.value;

    } catch (err) {
      console.warn(err);
      Alert.alert('Ошибка', 'Что-то пошло не так. Попробуйте позже');
    }
  }

  openChat = () => {
    const { chats } = this.props;
    const { selectedPhone } = this.state;

    const existingChat = chats.find(chat =>
      chat.mirrorPhone === selectedPhone && chat.withWho.contactName
    );

    return existingChat
      ? this.openExistingChat(existingChat)
      : this.openNewChat();
  }

  openExistingChat = chat => {
    const { navigation, setActiveChat } = this.props;

    setActiveChat(chat);
    navigation.navigate(ACTIVE_CHAT_SCREEN, {
      header: chat.withWho.contactName,
    });
  }

  openNewChat = () => {
    const { navigation } = this.props;
    const { contact } = navigation.state.params;
    const { selectedPhone } = this.state;

    navigation.navigate(ACTIVE_CHAT_SCREEN, {
      contactPhone: selectedPhone,
      contactName: contact.name,
    });
  }

  sendInvite = async () => {
    try {
      const { selectedPhone } = this.state;
      const isAvailable = await SMS.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Ошибка!', 'Отправка СМС недоступна на вашем устройстве');
        return;
      }

      const URL = 'Android: https://play.google.com/store/apps/details?id=com.partizan&hl=ru\n\niOS: https://itunes.apple.com/us/app/partizan/id1459473485?l=ru&ls=1&mt=8';
      await SMS.sendSMSAsync(selectedPhone, `Приглашаю присоединиться к приложению "Партизан":\n\n${URL}`);

    } catch (err) {
      console.warn(err);
      Alert.alert('Ошибка!', 'Что-то пошло не так, попробуйте еще раз');
    }
  }
}

ContactScreen.navigationOptions = ({ navigation }) => ({
  title: 'Контакты',
  headerLeft: <HeaderLeftBtn navigation={navigation} />,
  headerRight: (
    <HeaderButtonWrapper
      onPress={() => navigation.navigate(BLACKLIST_SCREEN)}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: verticalScale(4)
      }}
    >
      <HeaderButtonText style={{
        color: '#000000',
        alignSelf: 'center'
      }}>
        Чёрный список
      </HeaderButtonText>
    </HeaderButtonWrapper>
  )
});

const mapStateToProps = state => ({
  chats: state.chats.chatList
});

export default connect(mapStateToProps, { setActiveChat })(ContactScreen);
