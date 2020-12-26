import React from 'react';
import { FlatList } from 'react-native';
import { scale } from 'react-native-size-matters';

import {
  SearchBar,
} from './index';
import {
  ContentWrapper,
} from '../../../components';


export const List = ({ onChangeTextInSearchLine, renderItem, filterContacts, keyExtractor}) => (
  <ContentWrapper>
    <SearchBar
      onChangeTextInSearchLine={onChangeTextInSearchLine}
    />
    <FlatList
      data={filterContacts}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  </ContentWrapper>
);
