//This screen was intended to be the second chat scrren. It is just a copy of it for now. 
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; 
import { View, ImageBackground } from 'react-native';

import Fire from './Fire';

class ChatScreen2 extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params || {}).name || 'Chat!',
        headerRight: <View />
    });

    state = {
        messages: [],
    };

    get user() {
        return {
            name: this.props.navigation.state.params.name,
           _id: Fire.shared.uid,          
        };
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={Fire.shared.send}
                user={this.user}
            />
        );
    }

    componentDidMount() {
        Fire.shared.on(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),                         
            }))
        );
    }
    componentWillUnmount() {
        Fire.shared.off();
    }
}

export default ChatScreen2;