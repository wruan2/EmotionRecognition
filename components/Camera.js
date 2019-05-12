import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, Permissions, FaceDetector } from 'expo'; 
import { Icon } from 'native-base';

var emotionDict = {
  0: 'Angry',
  1: 'Disgust',
  2: 'Fear',
  3: 'Happy',
  4: 'Sad',
  5: 'Surprise',
  6: 'Neutral'
}

class CameraComponent extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    faces : [],
    face: false
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' })
  }
  snap = () => {
    if (this.camera) {
      photo = this.camera.takePictureAsync();
    }
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
            <Camera style={{ flex: 1 }} 
              type={this.state.type}
              onFacesDetected={this.handleFacesDetected}
              faceDetectorSettings={{
                mode: FaceDetector.Constants.Mode.fast,
                detectLandmarks: FaceDetector.Constants.Mode.none,
                runClassifications: FaceDetector.Constants.Mode.none,
              }}>
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
  handleFacesDetected = ({ faces }) => {
    if(faces.length > 0){
      this.setState({ faces });
      this.snap();
      console.debug('hi');
    }
  };
  displayEmotion
}

export default CameraComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});