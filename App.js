import React from 'react';
import { StyleSheet, View } from 'react-native';
import Camera from './components/Camera'


export default class App extends React.Component {
  render() {
        return (
          <View style={{ flex: 1 }}>
                <Camera></Camera>
          </View>
        )
      }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
