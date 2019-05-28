import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, Permissions, FaceDetector } from 'expo'; 
import { Icon } from 'native-base';

class CameraComponent extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    countDownSeconds: 3, 
    countDownStarted: false,
    pictureTaken: false,
    faces: [],
    uploading: true,
    predictions: []
  }

  countDownTimer = null;
  
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' })
  }
  
  snap = async() => {
    this.setState({
      pictureTaken: true,
    });
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      try {
        response = await this.uploadImage(photo.uri).then((response) => response.json())
                  .then((responseData) => {
                    this.setState ({
                      predictions: responseData['prediction']
                    });
                  });
      }
      catch (error) {
        console.log(error);
      }
      console.log(this.state.predictions);
    }
  };

  uploadImage = async(uri) => {
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
  
    let formData = new FormData();
    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`
    });
    let options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
  
    return fetch('http://localhost:3000/upload', options);
  };

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
              }}
              ref = {ref => {
                this.camera = ref;
              }}>
              <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', display: this.state.faceDetected && !this.state.pictureTaken ? 'flex' : 'none' }}>
                  <Text style={styles.countdown} >
                    Capture in: {this.state.countDownSeconds}  
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row',  alignSelf: 'center', position: 'absolute', bottom: '0%' }}>
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
    if (faces.length > 0){
      this.setState({
        faceDetected: true,
      });
      if (!this.state.faceDetected && !this.state.countDownStarted){
        this.initCountDown();
      }
    } 
    else {
      this.setState({ faceDetected: false });
      this.cancelCountDown();
    }
  };
  
  initCountDown = ()=>{
    this.setState({ 
      countDownStarted: true,
      pictureTaken: false
    });
    this.countDownTimer = setInterval(this.handleCountDownTime, 1000);
  }
  
  cancelCountDown = ()=>{
    clearInterval(this.countDownTimer);
    this.setState({ 
      countDownSeconds: 3,
      countDownStarted: false,
    });
  }
  
  handleCountDownTime = ()=>{
    if (this.state.countDownSeconds > 0){
      let newSeconds = this.state.countDownSeconds-1;
      this.setState({
        countDownSeconds: newSeconds,
      });
    } 
    else {
      this.cancelCountDown();
      this.snap();
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
  countdown: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  }
});