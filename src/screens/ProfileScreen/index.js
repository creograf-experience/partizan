import React from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';

import { setUser } from '../../actions';
import api from '../../networkers';

import AnonymousProfile from './components/AnonymousProfile';
import PublicProfile from './components/PublicProfile';
import HorizontalLine from './components/HorizontalLine';
import MyRating from './components/MyRating';
import Spinner from '../../components/Spinner';
import LogoutButton from './components/LogoutButton';
import Footer from './components/Footer';

class ProfileScreen extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    image: null,
    rating: 0,
    loading: false
  };

  render() {
    if (this.state.loading) return <Spinner />

    return(
      <KeyboardAvoidingView
        style={{flex: 1}}
        enabled
        behavior="padding"
        keyboardVerticalOffset={Platform.select({ ios: 64, android: 85 })}
      >
        <ScrollView contentContainerStyle={{
          flexGrow: 1,
          flexDirection: 'column',
          paddingTop: 20,
          paddingHorizontal: 20,
          paddingBottom: 10,
          backgroundColor: '#f5f5f5'
        }}>
          <AnonymousProfile
            avatarSrc={this.props.user.profile.avatar}
            profileName={this.props.user.profile.name}
          />

          <HorizontalLine />

          <PublicProfile
            avatarSrc={this.props.user.avatar}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            handleStateChange={this.handleStateChange}
            image={this.state.image}
          />

          <Footer>
            {
              Platform.OS === 'android' &&
                <MyRating value={this.state.rating} />
            }
            <LogoutButton />
          </Footer>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true });

      const rating = await api.profiles.getUserRating();
      const { firstName, lastName } = this.props.user;

      this.setState({ rating, firstName, lastName });
  
      this.props.navigation.setParams({
        handleCheckmarkClick: this.handleCheckmarkClick
      });

      this.setState({ loading: false });

    } catch (err) {
      console.warn(err);
      this.setState({ loading: false });
    }
  }

  handleStateChange = field => value => this.setState({ [field]: value });

  handleCheckmarkClick = async () => {
    try {
      this.setState({ loading: true });

      const firstName = this.state.firstName.length
        ? this.state.firstName
        : this.props.user.firstName;

      const lastName = this.state.lastName.length
        ? this.state.lastName
        : this.props.user.lastName;

      await api.profiles.editPublicProfile({
        firstName,
        lastName,
        avatar: this.state.image
          ? 'data:image/jpg;base64,' + this.state.image.base64
          : null
      });

      const user = await api.profiles.getUserProfile();
      this.props.setUser(user);

      this.setState({
        loading: false,
        image: null,
        firstName: user.firstName,
        lastName: user.lastName
      });

    } catch (err) {
      console.warn(err);
      this.setState({ loading: false });
    }
  }
}

ProfileScreen.navigationOptions = ({ navigation }) => ({
  title: 'Профиль',
  headerRight:
    <TouchableOpacity
      style={{marginRight: 10, padding: 5}}
      onPress={navigation.getParam('handleCheckmarkClick')}
    >
      <Image
        style={{width: 30, height: 30}}
        source={require('../../../assets/icons/checkmark.png')}
      />
    </TouchableOpacity>
});

const mapStateToProps = state => ({
  user: state.auth.user
});

const connectedProfileScreen = connect(
  mapStateToProps,
  { setUser }
)(ProfileScreen);
export { connectedProfileScreen as ProfileScreen };
