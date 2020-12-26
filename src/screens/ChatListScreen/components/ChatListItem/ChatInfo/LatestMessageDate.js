import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { whatDayItIs, format } from '../../../../../utils/whatDayItIs';

const LatestMessageDate = ({ date }) => {
  const msgDate = {
    fullDate: date,
    day: new Date(date).getUTCDate(),
    month: new Date(date).getUTCMonth(),
    year: new Date(date).getUTCFullYear(),
  };

  return (
    <View style={styles.latestMessageDate}>
      <Text>
        { whatDayItIs(msgDate, format('hh:mm')) }
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  latestMessageDate: {},
});

LatestMessageDate.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default LatestMessageDate;
