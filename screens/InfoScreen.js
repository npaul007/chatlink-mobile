import React from 'react';
import { ScrollView, StyleSheet,Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class InfoScreen extends React.Component {
  static navigationOptions = {
    title: 'Info',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={{fontSize:24,fontWeight:'bold'}}>What is ChatLink?</Text>
        <Text>ChatLink is an anonymous chatting platform.</Text>
        <Text>It simply streams messages from users via its server on a channel of the user's choice</Text>
        <Text style={{fontSize:24,fontWeight:'bold'}}>What sets it apart</Text>
        <Text>The cool thing about ChatLink is that it doesn't save messages to any database. It simply serves as a conduit to send and receive messages.</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    margin:10
  },
});
