import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {bool, number, object, string, func} from 'prop-types';
import Icon from 'react-native-vector-icons/Octicons';

export default class SearchBar extends Component {
  static propTypes = {
    handleSearch: func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  _onTextChange = (text) => {
    this.setState({searchText: text});
  };

  _onSubmit = () => {
    this.props.handleSearch(this.state.searchText);
  };

  render() {
    const {searchText} = this.state;
    return (
      <View style={Styles.SearchView}>
        <Icon name="search" size={24} />
        <TextInput
          style={Styles.SearchInput}
          placeholder="Search Movies"
          placeholderTextColor="black"
          value={searchText}
          autoCapitalize="none"
          returnKeyType="search"
          autoCorrect={false}
          onChangeText={(text) => this._onTextChange(text)}
          onSubmitEditing={() => {
            this._onSubmit();
          }}
        />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  SearchView: {
    backgroundColor: '#cccccc',
    marginHorizontal: 15,
    marginVertical: 15,
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    elevation: 6,
  },
  SearchInput: {
    height: 40,
    marginHorizontal: 5,
    flex: 1,
    fontSize: 14,
    fontFamily: 'ProductSans-Regular',
  },
});
