import React, { PureComponent } from 'react';

import {
  Button,
} from '../../containers';
import { TitleText } from '../../components';

import {
  ContentWrapper,
} from './components';
import {
  DetailsContainer,
  LogoContainer,
} from './containers';
import { REGISTRATION_SCREEN } from '../../constants';


export default class WelcomeScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentScreenIndex: 0,
      agreementAccepted: false,
    };

    this.screens = [
      {
        title: 'Честная обратная связь!',
        description: 'Узнайте, что о вас думают окружающие.',
        checkboxVisible: false,
        buttonText: 'Далее',
        onButtonPress: this.handleScreenTransition,
      },
      {
        title: 'Собирайте мнение о себе от своих знакомых',
        description: 'Анонимно выскажите свое мнение о них.',
        checkboxVisible: false,
        buttonText: 'Далее',
        onButtonPress: this.handleScreenTransition,
      },
      {
        title: 'Хамов в бан!',
        description: 'Мы понимаем, что сложно, но постарайтесь без оскорблений.',
        checkboxVisible: true,
        buttonText: 'Авторизация',
        onButtonPress: () => this.props.navigation.navigate(REGISTRATION_SCREEN),
      },
    ];
  }

  handleScreenTransition = () => {
    const {
      currentScreenIndex,
    } = this.state;

    this.setState({
      currentScreenIndex: currentScreenIndex + 1,
    });
  };

  handleAgreementAcceptance = () => {
    const {
      agreementAccepted,
    } = this.state;

    this.setState({
      agreementAccepted: !agreementAccepted,
    });
  };


  render() {
    const {
      currentScreenIndex,
      agreementAccepted,
    } = this.state;

    const {
      title,
      description,
      buttonText,
      onButtonPress,
      checkboxVisible,
    } = this.screens[currentScreenIndex];

    return (
      <ContentWrapper>
        <LogoContainer />

        <TitleText>
          {title}
        </TitleText>

        <DetailsContainer
          description={description}
          checkboxVisible={checkboxVisible}
          onCheck={this.handleAgreementAcceptance}
          checkMarkVisible={agreementAccepted}
        />

        <Button
          disabled={currentScreenIndex === 2 && !agreementAccepted}
          type="primary"
          text={buttonText}
          onPress={onButtonPress}
        />
      </ContentWrapper>
    );
  }
}
