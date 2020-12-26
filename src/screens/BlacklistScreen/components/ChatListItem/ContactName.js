import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const ContactName = ({ name }) => (
  <View style={styles.container}>
    <Text style={styles.senderName}>
      {renderName(name)}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  senderName: {
    fontSize: 20,
  },
});

ContactName.propTypes = {
  name: PropTypes.object.isRequired,
};

export default ContactName;

const renderName = name => (
  name.fake
    ? `${name.fake.profile.name} - ${name.fake.generatedNum}`
    : name.contactName
);
