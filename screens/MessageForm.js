import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { ServerConstants } from '../constants/Server';
import io from 'socket.io-client';
import moment from 'moment';

export default class MessageForm extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super();

    const roomId = this.initRoomId();

    this.state = {
      socket:this.initSocketConnection(),
      roomId: roomId,
      roomIdText:roomId,
      message: new String(),
      messageColor:this.initMessageColor(),
      displayedMessages:[]
    }
  }

  initSocketConnection() {
    try{
      const socket = io.connect(ServerConstants.url);
      return socket;
    }catch(err) {
      if(err){
        Alert.alert("Connection Error","Could not successfully connect to server.");
        return null;
      }
    }
  }

  componentDidMount() {
    this.initSocketListener(this);
  }

  initSocketListener = (self,roomId = self.state.roomId) => {
    self.state.socket.removeListener(roomId);

    self.state.socket.on(roomId,function(msgObj){
        self.receiveMessage(self,JSON.parse(msgObj));
    });

    Alert.alert('You joined a room.','Here is its Id: '+roomId);
  }

  initMessageColor() {
    const messageColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    return messageColor;
  }

  initRoomId() {
    const S4 = () => (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    const roomIdText = (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    
    this.setState({roomIdText});

    return 'foo';
  }

  sendMessage(self) {
    self.state.socket.emit('msgToServer',JSON.stringify({
      "msg":self.state.message,
      "msgColor":self.state.messageColor,
      "date":new Date(),
      "roomId":self.state.roomId
    }));

    // clear message input field
    self.setState({message:''});
  }

  receiveMessage(self,msgObj) {
    self.setState({
      displayedMessages:self.state.displayedMessages.concat(msgObj)
    });
  }

  joinRoom(self) {
    const roomId = self.state.roomIdText;

    self.setState({roomId});

    self.initSocketListener(self,roomId);
  }

  render() {
  
    return (
      <View style={styles.container}>
        <View style={styles.homeHeader}>
          <Text style={{fontSize:15,fontWeight:'bold',textAlign:'center'}}>
            ChatLink
          </Text>
        </View>
        
        <View style={{position:'relative',top:0,left:0,marginTop:0,height:440,zIndex:0}}>
          <ScrollView style={{borderColor:'#000000',borderWidth:1,padding:5}}
                      ref={ref => this.scrollView = ref}
                      onContentSizeChange={(contentWidth, contentHeight)=>{        
                          this.scrollView.scrollToEnd({animated: true});
                      }}>
            <View>
              {this.state.displayedMessages.map((msgObj,key) => (
                <View style={{backgroundColor:'#efffb5',borderRadius:10,padding:5,marginTop:4}}>
                  <Text style={{color:msgObj.msgColor}} key={key}> 
                    <Text style={{color:'#ccc'}}>{moment(msgObj.date).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                    {': '+msgObj.msg}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        <KeyboardAvoidingView style={{position:'absolute',bottom:-80,right:0,left:0,backgroundColor:'#ffffff'}} 
                              behavior="padding" 
                              enabled={true}>
          <ScrollView>
            <View>
              <TextInput 
                style={{
                  borderBottomColor:'#000000',
                  borderBottomWidth:1,
                  color:this.state.messageColor
                }}
                placeholder="Enter your message here"
                editable={true}
                onChangeText={(message) => this.setState({message})}
                onSubmitEditing={() => this.sendMessage(this)}
                value={this.state.message}
                ref="message"
              />
              <TextInput style={styles.inputContainers}
                placeholder="Enter your room id here"
                editable={true}
                ref="roomid"
                onChangeText={(roomIdText) => this.setState({roomIdText})}
                onSubmitEditing={() => this.joinRoom(this)}
                value={this.state.roomIdText}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  homeHeader: {
    backgroundColor: '#fff',
    marginTop:25
  },
  inputContainers:{
    marginTop:10,
    borderBottomColor:'#000000',
    borderBottomWidth:1
  },
  container:{
    margin:10
  }
});
