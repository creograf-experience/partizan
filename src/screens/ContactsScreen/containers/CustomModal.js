import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  scale, verticalScale,
} from 'react-native-size-matters';
import {
  RadioGroup,
  RadioButton,
} from 'react-native-flexi-radio-button';
import { Image, View } from 'react-native';

import {
  ModalWrapper,
  ModalTopWrapper,
  ModalBottomWrapper,
  ModalChatButtonWrapper,
  ModalShareButtonWrapper,
  ModalText,
  RadioButtonWrapper,
} from '../components';

type Props = {
  numbers: PropTypes.array,
  onSharePress: PropTypes.func,
  onChatPress: PropTypes.func,
};

export class CustomModal extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: this.props.numbers[0],
      types: this.props.numbers,
    };
  }

  onSelect(value) {
    this.setState({
      selectedType: value,
    });
  }

  onSharePress = () => {
    const { onSharePress } = this.props;
    const { selectedType } = this.state;

    onSharePress(`${selectedType.number}`);
  };

  onChatPress = () => {
    const { onChatPress } = this.props;
    const { selectedType } = this.state;

    onChatPress(`${selectedType.number}`);
  };

  renderPartizanMark = (number) => (
    <View
      style={{ flexDirection: 'row' }}
    >
      <View style={{ width: '80%', justifyContent: 'center' }}>
        <ModalText>
          +{number.number}
        </ModalText>
      </View>
      <Image
        style={{
          width: scale(30),
          height: scale(30),
          borderRadius: scale(30) / 2,
          opacity: number.phoneExist ? 1 : 0,
        }}
        source={require('../../../../assets/images/chat-logo.png')}
      />
    </View>
  );

  render() {
    const { selectedType, types } = this.state;
    const { contact } = this.props;
    return (
      <ModalWrapper>
        <ModalTopWrapper>
          <ModalText
            style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20 }}
          >
            {contact.name}
          </ModalText>
          <ModalText
            style={{ paddingHorizontal: scale(10), paddingTop: verticalScale(5),textAlign: 'center', alignSelf: 'center' }}
          >
            Вы можете отправить приглашение или анонимное сообщение
          </ModalText>
          <RadioButtonWrapper>
            <RadioGroup
              size={30}
              thickness={2}
              color="#000000"
              highlightColor="#808080"
              selectedIndex={0}
              onSelect={(index, value) => this.onSelect(value)}
            >
              {
                types.map(number => {
                  return (
                    <RadioButton
                      style={{ borderRadius: scale(5), paddingVertical: 18 }}
                      value={number}
                      color="black"
                    >
                      { this.renderPartizanMark(number) }
                    </RadioButton>
                  );
                })
              }
            </RadioGroup>
          </RadioButtonWrapper>
        </ModalTopWrapper>
        <ModalBottomWrapper>
          <ModalChatButtonWrapper
            onPress={this.onChatPress}
            disabled={selectedType === null}
          >
            <ModalText>
              Написать анонимно
            </ModalText>
          </ModalChatButtonWrapper>
          <ModalShareButtonWrapper
            onPress={this.onSharePress}
            disabled={selectedType.phoneExist}
          >
            <ModalText
              style={{ color: selectedType.phoneExist ? '#808080' : '#000000' }}
            >
              Пригласить
            </ModalText>
          </ModalShareButtonWrapper>
        </ModalBottomWrapper>
      </ModalWrapper>
    );
  }
}

CustomModal.defaultProps = {};
