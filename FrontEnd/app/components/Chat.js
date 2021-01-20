import React from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import socketIOClient from "socket.io-client";
import "react-chat-widget/lib/styles.css";
export default class Chat extends React.Component {
  socket = socketIOClient(this.props.endpoint);
  display = [];
  state = {
    message: "",
    display_data: this.display,
    uid: Math.floor(Math.random() * 100)
  };
  componentDidMount() {
    this.socket.on("my response", data => {
      if (this.state.uid !== data.uid) {
        console.log(data.uid, this.state.uid);
        addResponseMessage(data.data);
      }
    });
  }

  handleNewUserMessage = newMessage => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
    this.socket.emit("my event", {
      data: newMessage,
      uid: this.state.uid
    });
  };

  render() {
    return (
      // Prop key for handleNewUserMessage must begin with 'on'
      <Widget handleNewUserMessage={this.handleNewUserMessage} />
    );
  }
}
