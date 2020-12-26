import React, { PureComponent } from 'react';

import {
  colors,
} from '../../../constants';
import {
  SearchBarWrapper,
  SearchInput,
} from '../components';
import {
  SearchIcon,
} from './SearchIcon';


export class SearchBar extends PureComponent {
  state = {
    searchText: '',
  };

  onSearchBarTextChange = (text) => {
    this.setState({
      searchText: text,
    });
  };

  render() {
    const { searchText } = this.state;

    return (
      <SearchBarWrapper>
        <SearchIcon />
        <SearchInput
          selectionColor={colors.borderColor}
          autoCorrect={false}
          value={searchText}
          placeholder="Поиск"
          onChangeText={this.onSearchBarTextChange}
          returnKeyType="search"
          blurOnSubmit={false}
        />
      </SearchBarWrapper>
    );
  }
}
