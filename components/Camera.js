import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, Permissions } from 'expo' 
import { Icon } from 'native-base'


class CameraComponent extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' })
  }
  render() {
      const { hasCameraPermission } = this.state

      if (hasCameraPermission === null) {
          return <View/>
      }
      else if (hasCameraPermission === false) {
          return <Text> No access to camera. </Text>
      }

      else {
        return (
          <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={this.state.type}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-around', bottom: '-85%' }}>
                  <Icon
                    size= {80} 
                    name="home" style={{ color: 'white', fontWeight: 'bold' }} />
                  <Icon
                    size= {80}
                    onPress={() => {
                      this.setState({
                        type: this.state.type === Camera.Constants.Type.back ?
                        Camera.Constants.Type.front :
                        Camera.Constants.Type.back
                      })
                    }}
                    name="md-reverse-camera" style={{ color: 'white', fontWeight: 'bold' }} />
                </View>
              </View>
            </Camera>
          </View>
        )
      }
  }
}

export default CameraComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});