import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import AnimatedRectangle from './AnimatedRectangle';

class AudioWave extends React.Component {
  config = [
    // [topValue, bottomValue, delay]
    [30, 10, 0],
    [40, 15, 300],
    [25, 5, 600],
    [30, 10, 400],
    [40, 15, 0],
    [25, 5, 800]
  ];

  render() {
    return(
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {
          this.config.map(params => (
            <AnimatedRectangle
              // not the best key, but for now it works
              key={String(params[0] + params[1] + params[2])}
              topValue={params[0]}
              bottomValue={params[1]}
              delay={params[2]}
              isAnimated={this.props.isAnimated}
              color={this.props.color}
            />
          ))
        }
      </View>
    );
  }
}

AudioWave.propTypes = {
  isAnimated: PropTypes.bool,
  color: PropTypes.string
};

AudioWave.defaultProps = {
  isAnimated: true,
  color: 'black'
};

export default AudioWave;
