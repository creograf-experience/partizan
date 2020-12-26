import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import {
  StyleSheet,
  Animated,
  Keyboard,
  Platform,
  UIManager,
  Dimensions,
  findNodeHandle,
} from 'react-native';

import {
  clearSkip,
  clearMessages,
  clearActiveChat,
  clearNotification,
  activeChatWithDefaulValue,
} from '../../actions';

import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import { HeaderRightBtn, HeaderLeftBtn } from './components/HeaderBtn';

class ActiveChatScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('header') || navigation.getParam('contactName'),
    headerLeft: <HeaderLeftBtn navigation={navigation} />,
    headerRight: <HeaderRightBtn />,
    headerBackTitle: null,
  });

  state = {
    scrollViewRef: null,
    textInputRef: null,
    shouldScroll: true,
  };

  padding = new Animated.Value(0);
  platform = { ios: 'Will', android: 'Did' };

  componentDidMount() {
    this.keyboardShow = Keyboard.addListener(
      `keyboard${this.platform[Platform.OS]}Show`,
      this.handleKeyboardShow
    );
    this.keyboardHide = Keyboard.addListener(
      `keyboard${this.platform[Platform.OS]}Hide`,
      this.handleKeyboardHide
    );

    const { activeChat, clearNotification } = this.props;
    if (activeChat._id) clearNotification(activeChat._id);
  }

  componentWillUnmount() {
    this.keyboardShow.remove();
    this.keyboardHide.remove();

    const {
      activeChat,
      clearMessages,
      clearActiveChat,
      clearSkip,
      clearNotification,
    } = this.props;

    if (!activeChat._id) return;

    clearSkip();
    clearMessages();
    clearActiveChat();
    clearNotification(activeChat._id);
  }

  render() {
    const { navigation, activeChat } = this.props;
    const { shouldScroll } = this.state;

    const contactPhone = navigation.getParam('contactPhone'); 
    const contactName = navigation.getParam('contactName');

    return (
      <ActionSheetProvider>
        <Animated.View style={styles.container(this.padding)}>
          <MessageList
            chat={activeChat}
            setScrollViewRef={this.setScrollViewRef}
            shouldScroll={shouldScroll}
            setShouldScroll={this.setShouldScroll}
          />
          <MessageInput
            chat={activeChat}
            contactPhone={contactPhone}
            contactName={contactName}
            setShouldScroll={this.setShouldScroll}
            setTextInputRef={this.setTextInputRef}
          />
        </Animated.View>
      </ActionSheetProvider>
    );
  }

  handleKeyboardShow = event => {
    const { scrollViewRef, textInputRef } = this.state;
    const keyboardHeight = event.endCoordinates.height;
    const windowHeight = Dimensions.get('window').height;
    const currentlyFocusedField = findNodeHandle(textInputRef);

    UIManager.measure(currentlyFocusedField, (x, y, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);

      if (!gap || gap >= 0) return;

      Animated.timing(
        this.padding,
        {
          toValue: gap * -1,
          duration: event.duration,
        }
      ).start(() => scrollViewRef.scrollToEnd({ animated: true }));
    });
  }

  handleKeyboardHide = event => {
    Animated.timing(
      this.padding,
      {
        toValue: 0,
        duration: event ? event.duration : 100,
      }
    ).start();
  }

  setScrollViewRef = ref => this.setState({ scrollViewRef: ref });
  setTextInputRef = ref => this.setState({ textInputRef: ref });
  setShouldScroll = bool => this.setState({ shouldScroll: bool });
}

const styles = StyleSheet.create({
  container: padding => ({
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: padding,
  }),
});

const mapStateToProps = state => ({
  activeChat: activeChatWithDefaulValue(state),
});

ActiveChatScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  clearMessages: PropTypes.func.isRequired,
  clearActiveChat: PropTypes.func.isRequired,
  clearNotification: PropTypes.func.isRequired,
  clearSkip: PropTypes.func.isRequired,
  activeChat: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  {
    clearMessages,
    clearActiveChat,
    clearNotification,
    clearSkip,
  }
)(ActiveChatScreen);
