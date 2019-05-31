import React, { Component } from 'react';
import { Dimensions, StyleSheet, Image, View, FlatList, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import Emoji from 'react-native-emoji';
import * as Progress from 'react-native-progress';

const extractKey = ({emotion}) => emotion

class ResultsComponent extends Component {
  state = {
    photo: this.props.navigation.state.params.photo,
    data: [
      {emotion: 'Angry', emoji: 'angry', prediction: this.props.navigation.state.params.prediction[0]},
      {emotion: 'Disgust', emoji: 'face_vomiting', prediction: this.props.navigation.state.params.prediction[1]},
      {emotion: 'Fear', emoji: 'fearful', prediction: this.props.navigation.state.params.prediction[2]},
      {emotion: 'Happy', emoji: 'smiley', prediction: this.props.navigation.state.params.prediction[3]},
      {emotion: 'Sad', emoji: 'disappointed', prediction: this.props.navigation.state.params.prediction[4]},
      {emotion: 'Surprise', emoji: 'open_mouth', prediction: this.props.navigation.state.params.prediction[5]},
      {emotion: 'Neutral', emoji: 'neutral_face', prediction: this.props.navigation.state.params.prediction[6]},
    ]
  };
  renderItem = ({item}) => {
    var value = item.prediction;
    value = value.toFixed(8);
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Emoji name={item.emoji} style={{fontSize: 30}} />
        <View style={{flex: 1, flexDirection: 'column' }}>
          <Text style= {{fontSize: 20}}>
            <Text style={{fontWeight: "bold"}}> {item.emotion}: </Text>
            {value} 
          </Text>
          <Progress.Bar progress={item.prediction} width={Dimensions.get("window").width - 100} />
        </View>
      </View>
    )
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };
  
  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Image
            style={{width: Dimensions.get("window").width, height: Dimensions.get("window").width - 80}}
            source={{uri: this.state.photo}}
          />
        </View>
        <FlatList
          style={styles.list}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={extractKey}
          ItemSeparatorComponent={this.renderSeparator}
      />
      </View>
    );
  }
}

export default createAppContainer (ResultsComponent);

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { flex: 1 }
});