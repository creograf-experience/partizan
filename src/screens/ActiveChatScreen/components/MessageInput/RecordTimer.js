import React from 'react';
import { View, Text } from'react-native';

class RecordTimer extends React.Component {
  state = { minutes: 0, seconds: 0 };

  render() {
    const { minutes, seconds } = this.state;
    const formatSec = `0${seconds}`.slice(-2);

    return(
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={{
          borderRadius: 50,
          width: 10,
          height: 10,
          backgroundColor: 'red',
          marginRight: 10
        }}/>
        <Text>{minutes}:{formatSec}</Text>
      </View>
    );
  }

  componentDidMount() {
    let { seconds, minutes } = this.state;

    this.timer = setInterval(() => {
      seconds += 1;

      if (seconds < 60) {
        this.setState({ seconds });
        return;
      }

      minutes += 1;
      seconds = 0;
      this.setState({ minutes, seconds });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
}

export default RecordTimer;
