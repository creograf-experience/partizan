import React, { PureComponent } from 'react';
import {
  AsyncStorage,
  FlatList,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';

import { connectSocket } from '../../actions';
import { TAB_NAVIGATOR } from '../../constants';
import api from '../../networkers';

import { ContentWrapper } from '../../components';
import { Header } from '../../containers';
import { ProfileContainer } from './containers';
import Spinner from '../../components/Spinner';

class ProfileSelectionScreenComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      selectedProfile: '',
      selectedProfileId: '',
      checkboxVisible: false,
      profiles: [],
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.getProfiles();
    this.setState({ isLoading: false });
  }

  onProfileSelection = (profileName, profileId) => {
    const visible = this.state.checkboxVisible;
    this.setState({ selectedProfile: profileName });
    this.setState({ selectedProfileId: profileId });
    this.setState({ checkboxVisible: !visible });
  };

  isCheckMarkVisible = (ProfileName) => {
    return ProfileName === this.state.selectedProfile;
  };

  renderItem = ({ item }) => {
    return (
      <ProfileContainer
        avatarImage={item.avatar}
        avatarName={item.name}
        avatarId={item._id}
        selectedProfile={this.state.selectedProfile}
        isCheckMarkVisible={this.isCheckMarkVisible}
        onProfileSelection={this.onProfileSelection}
      />
    );
  };

  getPhone = async () => {
    try {
      const value = await AsyncStorage.getItem('number');
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.warn(error);
    }
  };

  storeProfileId = async (prifileId) => {
    try {
      await AsyncStorage.setItem('profileId', prifileId);

    } catch (error) {
      console.warn(error);
    }
  };

  buttonDidPressed = async () => {
    try {
      if (this.state.selectedProfileId === '') return Alert.alert('Ошибка', 'Выберите профиль');

      const phoneNumber = await this.getPhone();
      await this.storeProfileId(this.state.selectedProfileId);

      const data = { phone: phoneNumber, profileId: this.state.selectedProfileId };
      await api.profiles.setUserProfile(data);

      this.props.connectSocket();

      this.props.navigation.navigate(TAB_NAVIGATOR);
    } catch (err) {
      console.warn(err);
    }
  };

  getProfiles = async () => {
    try {
      const res = await api.profiles.getAll();
      this.setState({ profiles: res });

    } catch (err) {
      console.warn(err);
    }
  };

  render() {
    if (this.state.isLoading) return <Spinner />;

    return (
      <ContentWrapper>
        <Header
          text="Выберите профиль"
          onPress={() => { this.buttonDidPressed(); }}
          type="profiles"
        />
        <FlatList
          style={{
            flex: 1,
          }}
          data={this.state.profiles}
          keyExtractor={profile => profile._id}
          renderItem={this.renderItem}
        />
      </ContentWrapper>
    );
  }
}

export default connect(
  null,
  { connectSocket }
)(ProfileSelectionScreenComponent);
