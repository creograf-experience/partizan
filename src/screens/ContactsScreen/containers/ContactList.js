import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { verticalScale, scale } from 'react-native-size-matters';

import { colors, CONTACT_SCREEN } from '../../../constants';
import { setActiveChat } from '../../../actions';

import Rating from '../../ContactScreen/components/Rating';

class ContactList extends PureComponent {
  render() {
    const { contact, navigation } = this.props;

    return (
      <View>
        <TouchableOpacity
          underlayColor={colors.primaryTextColor}
          style={styles.container}
          onPress={() => navigation.navigate(CONTACT_SCREEN, { contact })}
        >
          <View style={styles.contactInfo}>
            <Text style={[styles.title]}>{contact.name}</Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {
                contact.rating.averageValue > 0 &&
                Platform.OS === 'android' &&
                  <Rating
                    value={contact.rating.averageValue}
                    containerStyle={{marginRight: 10}}
                  />
              }
              {
                contact.userExist
                  ? this.renderPartizanMark()
                  : <View style={styles.image} />
              }
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderPartizanMark = () => {
    return(
      <Image
        style={styles.image}
        source={require('../../../../assets/images/chat-logo.png')}
      />
    );
  }
}

const styles = StyleSheet.create({
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(16),
    paddingRight: scale(24),
    paddingLeft: scale(15),
    borderBottomColor: '#a4a4a4',
    borderBottomWidth: 1,
  },
  image: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(30) / 2,
  },
  title: {
    color: colors.primaryTextColor,
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    color: colors.primaryTextColor,
    fontSize: 15,
    marginTop: verticalScale(4),
  },
});

ContactList.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phoneNumbers: PropTypes.array.isRequired,
    userExist: PropTypes.bool.isRequired,
  }).isRequired,
  chats: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  chats: state.chats.chatList,
});

export default connect(mapStateToProps, { setActiveChat })(withNavigation(ContactList));
