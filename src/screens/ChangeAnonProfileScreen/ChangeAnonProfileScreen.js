import React, { PureComponent } from 'react';
import { FlatList, Alert, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import api from '../../networkers';
import { setProfile } from '../../actions';

import { HeaderLeftBtn } from '../ActiveChatScreen/components/HeaderBtn';
import { ContentWrapper } from '../../components';
import { ProfileContainer } from './containers';
import Spinner from '../../components/Spinner';

class ChangeAnonProfileScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      selectedProfile: '',
      selectedProfileId: '',
      checkboxVisible: false,
      profiles: []
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.getProfileIdFromStorage();
    await this.getProfiles();
    this.setState({ isLoading: false });
  }

  static navigationOptions = ({ navigation }) => ({
     title: 'Выберите профиль',
     headerLeft: <HeaderLeftBtn navigation={navigation} />
  });

  storeProfileId = async (profile) => {
   try {
       await AsyncStorage.setItem('profileId', profile);

     } catch (error) {
       console.warn(error);
     }
  };

  onProfileSelection = async (profileName, profileId) => {
    const visible = this.state.checkboxVisible;
    this.setState({ selectedProfile: profileName });
    this.setState({ selectedProfileId: profileId });
    this.setState({ checkboxVisible: !visible });

    try {
      await Promise.all([
        this.storeProfileId(profileId),
        api.profiles.editUserProfile(profileId)
      ]);

      const selected = this.state.profiles.find(profile => profile._id === profileId);
      this.props.setProfile(selected);

      Alert.alert('Ваш профиль изменен', 'Теперь у вас новый профиль');
      this.props.navigation.goBack();

    } catch (err) {
      console.warn(err)
      Alert.alert('Ошибка', 'Что-то пошло не так. Попробуйте еще раз.');
      this.props.navigation.goBack();
    }
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

  getProfiles = async () => {
    try {
      const { selectedProfileId } = this.state;
      const res = await api.profiles.getAll();

      const selectedProfile = res.find(profile => profile._id === selectedProfileId);
      const profiles = [
        selectedProfile,
        ...res.filter(profile => profile._id !== selectedProfileId)
      ]

      this.setState({
        profiles,
        selectedProfile: selectedProfile.name
      });

    } catch (err) {
      console.warn(err);
    }
  };

  getProfileIdFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('profileId');
      this.setState({ selectedProfileId: value });
    } catch (error) {
      console.warn(error);
    }
  };

  render() {
    if (this.state.isLoading) return <Spinner />;

    return (
      <ContentWrapper>
        <FlatList style={{flex: 1}}
          data={this.state.profiles}
          keyExtractor={profile => profile._id}
          renderItem={this.renderItem}
        />
      </ContentWrapper>
    );
  }
}

export default connect(null, { setProfile })(ChangeAnonProfileScreen);
