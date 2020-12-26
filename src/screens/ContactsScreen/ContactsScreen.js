import React, { Component } from 'react';
import {
  View,
  FlatList,
  Alert,
  Text
} from 'react-native';
import { SearchBar } from 'react-native-elements/src/index';
import { verticalScale } from "react-native-size-matters";

import { BLACKLIST_SCREEN } from '../../constants';
import api from '../../networkers';

import {
  HeaderButtonWrapper,
  HeaderButtonText
} from './components';
import ContactList from './containers/ContactList';
import Spinner from "../../components/Spinner";

export default class ContactsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      contacts: [],
      constantContacts:[],
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.showContactsAsync();
  }

  async showContactsAsync() {
    try {
      const contacts = await this.takeContactsFromServer();

      if (!contacts.length) {
        this.setState({ loading: false });
        Alert.alert('', 'У вас нет контактов');
        return;
      }

      this.setState({ contacts, constantContacts: contacts, loading: false });
      this.arrayholder = contacts;

    } catch (err) {
      console.warn(err);
    }
  }

  takeContactsFromServer = async () => {
    try {
      const res = await api.contacts.getUserContacts()
      return this.ContactsSorted(res);

    } catch (err) {
      console.warn(err);
    }
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Контакты',
    headerRight: (
      <HeaderButtonWrapper
        onPress={() => navigation.navigate(BLACKLIST_SCREEN)}
        style={{ justifyContent: 'center', alignItems: 'center', paddingTop: verticalScale(4) }}
      >
        <HeaderButtonText
          style={{ color: '#000000', alignSelf: 'center' }}
        >
            Чёрный список
        </HeaderButtonText>
      </HeaderButtonWrapper>
    ),
  });

  ContactsSorted = contacts => contacts.sort((a, b) => a.name.localeCompare(b.name));

  searchFilterFunction = (text) => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter((item) => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      contacts: newData,
    });
  };

  renderContact = ({ item }) => {
    return (
      <ContactList
        contact={item}
      />
    );
  };

  renderHeader = () => {
    const { contacts, value } = this.state;

    return (
      <SearchBar
        placeholder="Поиск"
        containerStyle={{ backgroundColor: '#f5f5f5', borderBottomColor: '#a4a4a4', borderBottomWidth: 1 }}
        inputContainerStyle={{ backgroundColor: '#f5f5f5' }}
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={value}
      />
    );
  };

  render() {
    const { loading, contacts, constantContacts } = this.state;

    if (loading) {
      return (
        <Spinner />
      );
    }
    return (
      constantContacts.length === 0
        ? (
          <View style={{ flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24 }}>
              У вас нет контактов.
            </Text>
          </View>
        )
        : (
          <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <FlatList
              data={contacts}
              renderItem={this.renderContact}
              keyExtractor={contact => contact.id}
              ListHeaderComponent={this.renderHeader}
            />
          </View>
        )
    );
  }
}
