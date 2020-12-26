import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

function StarRatingSelection({ onSelect, selectedRating }) {
  const ratingStars = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 }
  ];

  return(
    <View style={{
      alignItems: 'center',
      marginBottom: 40
    }}>
      <Text style={{
        textAlign: 'center',
        marginBottom: 10
      }}>
        оставить обратную связь анонимно:
      </Text>
      <View style={{flexDirection: 'row'}}>
        {
          ratingStars.map(star =>
            <TouchableOpacity
              disabled={star.value === selectedRating.value}
              key={star.id}
              onPress={() => onSelect(star)}
              style={{marginRight: 10}}
            >
              <Image
                style={{width: 30, height: 30}}
                source={
                  star.value <= selectedRating.value
                    ? require('../../../../assets/icons/star-filled.png')
                    : require('../../../../assets/icons/star.png')
                }
              />
            </TouchableOpacity>
          )
        }
      </View>
    </View>
  );
}

StarRatingSelection.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedRating: PropTypes.shape({
    value: PropTypes.number.isRequired
  }).isRequired
};

export default StarRatingSelection;
