import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

function Rating({ value, containerStyle, textStyle }) {
  return(
    <View style={[
      {
        width: 35,
        height: 25,
        backgroundColor: getBackgroundColor(value),
        justifyContent: 'center',
        alignItems: 'center'
      },
      containerStyle
    ]}>
      <Text style={[{color: 'white'}, textStyle]}>
        {value}
      </Text>
    </View>
  );
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object
};

export default Rating;

// возвращает цвет по 5ти бальной шкале
// 1 - 2 красный
// 2.1 - 3.9 желтый
// 4 - 5 зеленый
function getBackgroundColor(rating) {
  const num = Number(rating);
  const colors = {
    red: '#E74C3C',
    yellow: '#F1C40F',
    green: '#2ECC71'
  };

  if (num <= 2) return colors.red;
  if (num > 2 && num < 4) return colors.yellow;
  if (num >= 4) return colors.green;
}
