import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { verticalScale } from 'react-native-size-matters';

import { colors } from '../../constants';

import { onlyBlockedChats } from '../../actions';

import ChatList from './components/ChatList';

const BlacklistScreen = ({ chats }) => (
  <View style={styles.container}>
    <ChatList chats={chats} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});


BlacklistScreen.navigationOptions = ({ navigation }) => ({
  title: 'Чёрный список',
  headerStyle: {
    backgroundColor: colors.primaryBackgroundColor,
    paddingBottom: verticalScale(5),
  },
  headerTintColor: colors.secondaryBackgroundColor,
  headerTitleStyle: {
    flex: 1,
  },
  headerLeft: (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ marginLeft: 10 }}
    >
      <Image
        source={require('../../../assets/icons/back.png')}
        style={{ width: 30, height: 30 }}
      />
    </TouchableOpacity>
  ),
});

BlacklistScreen.propTypes = {
  chats: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  chats: onlyBlockedChats(state),
});

export default connect(mapStateToProps)(BlacklistScreen);
