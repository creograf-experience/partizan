import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import formatter from '../../../utils/formatter';

function PhonePicker({ phoneNumbers, onSelect, selectedPhone }) {
  return(
    <View style={{
      alignItems: 'center',
      marginBottom: 40,
      flex: 1,
      flexGrow: 0
    }}>
      <Text style={{
        textAlign: 'center',
        marginBottom: 10
      }}>
        Выберите телефон:
      </Text>

      {
        phoneNumbers.map(phone =>
          <PhoneNumber
            key={phone.number}
            number={phone.number}
            onSelect={onSelect}
            selectedPhone={selectedPhone}
          />
        )
      }
    </View>
  );
}

PhonePicker.propTypes = {
  phoneNumbers: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedPhone: PropTypes.string.isRequired
};

export default PhonePicker;

function PhoneNumber({ number, onSelect, selectedPhone }) {
  const formattedNumber = formatter.toPhone(number);

  return(
    <TouchableOpacity
      onPress={() => onSelect(number)}
      style={{
        marginBottom: 10,
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: selectedPhone === number ? 'black' : 'white'
      }}
    >
      <Text style={{
        color: selectedPhone === number ? 'white' : 'black'
      }}>
        {formattedNumber}
      </Text>
    </TouchableOpacity>
  );
}

PhoneNumber.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedPhone: PropTypes.string.isRequired
};
