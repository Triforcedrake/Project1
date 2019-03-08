//The main chat screen
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; 
import { View, ImageBackground } from 'react-native';

import Fire from './FireChat1';

class ChatScreen extends React.Component {

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

export default ChatScreen;