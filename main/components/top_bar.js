import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {string} from 'prop-types';

// reusable top bar header

export default class TopBar extends Component {
  static propTypes = {
    title: string.isRequired,
  };

  render() {
    const {title} = this.props;
    return (
      <View style={Styles.topBar}>
        <Text style={Styles.header}> {title} </Text>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  header: {
    color: 'black',
    fontFamily: 'ProductSans-Regular',
    fontSize: 20,
  },
  topBar: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
});
