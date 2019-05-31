import React from 'react';
import Camera from './components/Camera';
import Results from './components/Results';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const AppStackNavigator = createStackNavigator({
  Camera: {
    screen: Camera,
    navigationOptions: {
      headerVisible: false,
      header: null
    }
  },
  Results: {
    screen: Results,
    navigationOptions: {
      title: 'Results',
      headerMode: 'screen'
    }
  }
});

let Navigation = createAppContainer(AppStackNavigator);

export default class App extends React.Component {
  render() {
    return <Navigation />;
  }
}
