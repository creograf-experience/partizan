import React from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

class AnimatedRectangle extends React.Component {
  defaultValue = 20;
  animatedHeight = new Animated.Value(this.defaultValue);
  animation = null;

  render() {
    return(
      <Animated.View style={{
        marginRight: 5,
        height: this.animatedHeight,
        width: 4,
        backgroundColor: this.props.color
      }}/>
    );
  }

  componentDidMount() {
    if (!this.props.isAnimated) return;
    this.startAnimation();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isAnimated && this.props.isAnimated) {
      this.startAnimation();
    }

    if (prevProps.isAnimated && !this.props.isAnimated) {
      this.stopAnimation();
    }
  }

  startAnimation = () => {
    this.animation = this.getAnimation();
    this.animation.start();
  }

  stopAnimation = () => {
    this.animation.stop();
    this.animatedHeight.setValue(this.defaultValue);
  }

  getAnimation = () => Animated.loop(
    Animated.sequence([
      Animated.delay(this.props.delay),
      Animated.timing(
        this.animatedHeight,
        {
          toValue: this.props.topValue,
          duration: 400,
        }
      ),
      Animated.timing(
        this.animatedHeight,
        {
          toValue: this.props.bottomValue,
          duration: 400,
        }
      ),
      Animated.timing(
        this.animatedHeight,
        {
          toValue: this.defaultValue,
          duration: 400,
        }
      )
    ])
  );
}

AnimatedRectangle.propTypes = {
  topValue: PropTypes.number.isRequired,
  bottomValue: PropTypes.number.isRequired,
  delay: PropTypes.number.isRequired,
  isAnimated: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired
};

export default AnimatedRectangle;
