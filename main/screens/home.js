import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';

import {TopBar, SearchBar, MovieContainer} from '../components/index';
import omdb from '../api/omdb.js';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: [],
      isLoading: false,
      favorites: [],
    };
    this.favsData = [];
  }

  componentDidMount() {
    this._getFavs();
  }

  _getFavs = async () => {
    const favsStored = await AsyncStorage.getItem('FAV_MOVIES');
    const favsData = JSON.parse(favsStored);
    if (favsData !== null) {
      this.favsData = favsData;
      const favIds = [];
      favsData.map((favData) => {
        favIds.push(favData.imdbID);
      });
      this.setState({favorites: favIds});
    }
  };

  _updateFavs = async () => {
    await AsyncStorage.setItem('FAV_MOVIES', JSON.stringify(this.favsData));
  };

  _handleSearch = async (text) => {
    if (text.length < 4) {
      Snackbar.show({
        text: 'Please input atleast 4 characters',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      this.setState({isLoading: true});
      try {
        const response = await omdb.get(text);
        this.setState({movieData: response.data.Search, isLoading: false});
      } catch (error) {
        Snackbar.show({
          text: error.response.data,
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
  };

  _modifyFavs = (id) => {
    const {favorites, movieData} = this.state;
    if (favorites.includes(id)) {
      const newFavs = favorites.filter((fid) => fid !== id);
      this.setState({favorites: newFavs});
      Snackbar.show({
        text: 'Removed from Favorites!',
        duration: Snackbar.LENGTH_SHORT,
      });
      const tempFavData = this.favsData.filter((data) => data.imdbID !== id);
      this.favsData = tempFavData;
      this._updateFavs();
    } else {
      favorites.push(id);
      this.setState({favorites: favorites});
      Snackbar.show({
        text: 'Added to Favorites!',
        duration: Snackbar.LENGTH_SHORT,
      });
      const tempFavData = movieData.filter((data) => data.imdbID === id);
      this.favsData.push(tempFavData[0]);
      this._updateFavs();
    }
  };

  render() {
    const {} = this.props;
    const {movieData, isLoading, favorites} = this.state;
    return (
      <>
        <TopBar title="Browse Movies" />
        <View style={Styles.homeContainer}>
          <SearchBar handleSearch={this._handleSearch} />
          <MovieContainer
            isLoading={isLoading}
            movieData={movieData}
            screenCode="home"
            favorites={favorites}
            addToFavs={this._modifyFavs}
          />
        </View>
      </>
    );
  }
}

const Styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
});
