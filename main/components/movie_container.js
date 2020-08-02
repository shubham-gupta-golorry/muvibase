import React, {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {bool, func, object, string, arrayOf} from 'prop-types';
import {PlaceHolder, MovieCard} from '../components/index';

export default class MovieContainer extends Component {
  static propTypes = {
    isLoading: bool.isRequired,
    movieData: arrayOf(object).isRequired,
    screenCode: string.isRequired,
    favorites: arrayOf(string),
    addToFavs: func.isRequired,
  };

  _makeItems = ({item}) => (
    <MovieCard
      key={String(item.imdbID)}
      posterURI={item.Poster}
      year={item.Year}
      title={item.Title}
      id={item.imdbID}
      favorites={this.props.favorites}
      addToFavs={this.props.addToFavs}
    />
  );

  _renderListPlaceholder = () => (
    <View style={Styles.placeHolderContainer}>
      <PlaceHolder screenCode={this.props.screenCode} />
    </View>
  );

  render() {
    const {isLoading, movieData} = this.props;
    return (
      <View style={Styles.dataContainer}>
        {isLoading ? (
          <ActivityIndicator color="black" size="large" />
        ) : (
          <FlatList
            data={movieData}
            keyExtractor={(item) => String(item.imdbID)}
            renderItem={this._makeItems}
            ListEmptyComponent={this._renderListPlaceholder}
            numColumns={2}
            style={Styles.listView}
          />
        )}
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  dataContainer: {
    flex: 1,
  },
  listView: {
    marginBottom: 60,
    paddingHorizontal: 15,
  },
  placeHolderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
});
