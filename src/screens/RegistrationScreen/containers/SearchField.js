import React from 'react';

import { SearchFieldWrapper } from '../components';
import {colors} from '../../../constants';


export const SearchField = ({onChangeTextInSearchLine}) => (
  <SearchFieldWrapper
    placeholder='Поиск'
    placeholderTextColor={colors.searchLineTextColor}
    onChangeText={(text) => onChangeTextInSearchLine(text)}
    fontColor={colors.searchLineTextColor}
  />
);
