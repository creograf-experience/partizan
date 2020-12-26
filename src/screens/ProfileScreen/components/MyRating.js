import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Rating from '../../ContactScreen/components/Rating';
import { Button } from '../../ContactScreen/components/Buttons';

class MyRating extends React.Component {
  state = {
    messages: ['Показать', 'Скрыть']
  };

  render() {
    if (!this.props.value) return null;
  
    const message = this.state.messages[0];

    return(
      <View>
        {
          message !== 'Показать' &&
            <Rating
              value={this.props.value}
              containerStyle={{width: 45, height: 35, alignSelf: 'center'}}
              textStyle={{fontSize: 16}}
            />
        }
        <Button
          title={`${message} вашу обратную связь`}
          onPress={this.changeMessage}
          style={{marginBottom: 5, marginTop: 10}}
        />
      </View>
    );
  }

  changeMessage = () =>
    this.setState({ messages: this.state.messages.reverse() });
}

MyRating.propTypes = {
  value: PropTypes.number
};

export default MyRating;
