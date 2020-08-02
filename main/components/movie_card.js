import React, {Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {func, string, arrayOf} from 'prop-types';

const noPoster = require('../images/no-art.png');

export default class MovieCard extends Component {
  static propTypes = {
    title: string.isRequired,
    year: string.isRequired,
    posterURI: string.isRequired,
    id: string.isRequired,
    favorites: arrayOf(string),
    addToFavs: func.isRequired,
  };

  render() {
    const {title, year, posterURI, id, favorites, addToFavs} = this.props;
    let imgSource = null;
    if (posterURI === 'N/A') {
      imgSource = noPoster;
    } else {
      imgSource = {
        uri: posterURI,
      };
    }
    return (
      <View style={Styles.movieCard}>
        <ImageBackground
          source={imgSource}
          imageStyle={{borderRadius: 4}}
          style={Styles.moviePoster}>
          <TouchableOpacity
            style={Styles.touchableFavIconContainer}
            onPress={() => addToFavs(id)}>
            <Icon
              name={favorites.includes(id) ? 'star' : 'star-outline'}
              size={26}
              color={favorites.includes(id) ? '#ffb900' : 'white'}
            />
          </TouchableOpacity>
        </ImageBackground>
        <Text style={Styles.header}> {title} </Text>
        <Text style={Styles.subHeader}> {year} </Text>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  header: {
    color: 'black',
    fontFamily: 'ProductSans-Regular',
    fontSize: 14,
    textAlign: 'center',
  },
  subHeader: {
    color: 'black',
    fontFamily: 'ProductSans-Regular',
    fontSize: 12,
    textAlign: 'center',
  },
  movieCard: {
    flexDirection: 'column',
    margin: 5,
    width: 150,
  },
  moviePoster: {
    height: 223,
    width: 150,
    borderRadius: 4,
  },
  touchableFavIconContainer: {
    padding: 5,
    margin: 5,
    backgroundColor: 'rgba(99, 110, 114, 0.5)',
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
});
