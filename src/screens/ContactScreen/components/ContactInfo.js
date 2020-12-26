import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

function ContactInfo({ contact }) {
  return(
    <View style={{marginBottom: 20}}>
      <Text style={{fontSize: 20, textAlign: 'center'}}>
        {contact.name}
      </Text>
      {
        !contact.userExist &&
          <Text style={{fontSize: 10, textAlign: 'center'}}>
            не зарегистрирован в приложении
          </Text>
      }
    </View>
  );
}

ContactInfo.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    userExist: PropTypes.bool.isRequired
  }).isRequired
};

export default ContactInfo;
