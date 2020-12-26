import React from 'react';
import { Modal, FlatList } from 'react-native';
import { scale } from 'react-native-size-matters';

import { Header } from '../../../containers';
import {
  SearchField,
} from '../containers';


export const CountrySelectionModal = ({modalVisible, onClose, onChangeTextInSearchLine, valueInSearchLine, renderItem, filterCountries, keyExtractor}) => (
  <Modal
    animationType="slide"
    transparent={false}
    visible={modalVisible}
  >
    <Header
      text='Выбор страны'
      onPress={onClose}
      type='secondary'
    />
    <SearchField
      onChangeTextInSearchLine={onChangeTextInSearchLine}
    />
    <FlatList style={{
        flex: 1,
        marginTop: scale(20),
        borderTopWidth: 1,
      }}
      data={filterCountries}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  </Modal>
);
