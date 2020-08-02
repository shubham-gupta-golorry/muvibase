import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {bool, number, object, string} from 'prop-types';

const Images = {
  Home: require('../images/home.png'),
  Favs: require('../images/favs.png'),
};

const ImageText = {
  Home: 'Search for Movies to see results',
  Favs: 'Add some movies to your watch list',
};

export default class PlaceHolder extends Component {
  static propTypes = {
    screenCode: string.isRequired,
  };

  render() {
    const {screenCode} = this.props;
    let placeholderTxt = '';
    let placeholderImg = '';
    if (screenCode === 'home') {
      placeholderTxt = ImageText.Home;
      placeholderImg = Images.Home;
    } else {
      placeholderTxt = ImageText.Favs;
      placeholderImg = Images.Favs;
    }
    return (
      <View style={Styles.imageContainer}>
        <Image source={placeholderImg} style={Styles.image} />
        <Text style={Styles.placeHolderText}>{placeholderTxt}</Text>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
  },
  placeHolderText: {
    fontFamily: 'ProductSans-Regular',
    fontSize: 14,
  },
  image: {
    resizeMode: 'contain',
  },
});
