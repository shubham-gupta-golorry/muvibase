import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {TopBar, MovieContainer} from '../components/index';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      favsData: [],
      favorites: [],
    };
  }

  componentDidMount() {
    this._getFavs();
  }

  _getFavs = async () => {
    const favsStored = await AsyncStorage.getItem('FAV_MOVIES');
    const favsData = JSON.parse(favsStored);
    if (favsData !== null) {
      const favIds = [];
      favsData.map((favData) => {
        favIds.push(favData.imdbID);
      });
      this.setState({favsData: favsData, favorites: favIds});
    }
  };

  _updateFavs = async () => {
    await AsyncStorage.setItem(
      'FAV_MOVIES',
      JSON.stringify(this.state.favsData),
    );
  };

  _modifyFavs = (id) => {
    const {favorites, favsData} = this.state;
    if (favorites.includes(id)) {
      const newFavs = favorites.filter((fid) => fid !== id);
      this.setState({favorites: newFavs});
      Snackbar.show({
        text: 'Removed from Favorites!',
        duration: Snackbar.LENGTH_SHORT,
      });
      const tempFavData = favsData.filter((data) => data.imdbID !== id);
      this.setState({favsData: tempFavData});
      this._updateFavs();
    } else {
      favorites.push(id);
      this.setState({favorites: favorites});
      Snackbar.show({
        text: 'Added to Favorites!',
        duration: Snackbar.LENGTH_SHORT,
      });
      const tempFavData = favsData.filter((data) => data.imdbID === id);
      favsData.push(tempFavData[0]);
      this.setState({favsData: favsData});
      this._updateFavs();
    }
  };

  render() {
    const {favsData, isLoading, favorites} = this.state;
    return (
      <>
        <TopBar title="Your Favorites" />
        <View style={Styles.favsContainer}>
          <MovieContainer
            isLoading={isLoading}
            movieData={favsData}
            screenCode="favs"
            favorites={favorites}
            addToFavs={this._modifyFavs}
          />
        </View>
      </>
    );
  }
}

const Styles = StyleSheet.create({
  favsContainer: {
    flex: 1,
  },
});
