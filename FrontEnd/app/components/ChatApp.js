import React from "react";
import {
  Chat,
  Channel,
  ChannelHeader,
  Thread,
  Window,
  ChannelList,
  MessageList,
  MessageInput
} from "stream-chat-react";
import { Redirect } from "react-router-dom";

import { StreamChat } from "stream-chat";
import ThemeContext from "../contexts/theme";
import Error from "./Error";
import Loading from "./Loading";
import "stream-chat-react/dist/css/index.css";

const sort = { last_message_at: -1 };

function ChatApp(props) {
  const one2one = props.location.one2one;
  const client = new StreamChat("tqnbvvgngey3");
  let error = false;
  const theme = React.useContext(ThemeContext);
  if (theme.login) {
    client.setUser(
      {
        id: theme.uid,
        name: theme.uid,
        image: theme.profile_pic
      },
      theme.token
    );
  }
  if (theme.login && one2one) {
    if (one2one[0] === one2one[1]) {
      console.log("gotcha");
      error = true;
    } else {
      var channel = client.channel("messaging", {
        members: [one2one[0], one2one[1]],
        name: one2one[0]
      });
    }
  }

  if (!theme.login) {
    return (
      <Redirect
        to={{
          pathname: "/"
        }}
      />
    );
  }

  if (error) {
    return (
      <Error message="Talking to yourself is lonely. Two are better than one." />
    );
  }

  return (
    (client === undefined && <Loading />) ||
    ((one2one && (
      <Chat client={client} theme="messaging light">
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    )) || (
      <Chat client={client} theme="messaging light">
        <ChannelList
          filters={{ type: "messaging", members: { $in: [theme.uid] } }}
          sort={sort}
        />
        <Channel>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    ))
  );
}

export default ChatApp;
