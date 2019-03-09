import React, { Component } from 'react'
import { View, Text, Image, Button, Alert, StyleSheet } from 'react-native'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk'
import { createStackNavigator, createAppContainer, } from 'react-navigation'
import { ListItem, List, } from 'react-native-elements'
import firebase from 'react-native-firebase'
import SplashScreen from 'react-native-splash-screen'

import ChatScreen from './screens/ChatScreen';
import ChatScreen2 from './screens/ChatScreen2';
import styles from './screens/Stylesheet/Style';

class HomeScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Welcome',
    });

    state = { userDetails: '', GoogleLogin: false, }

    componentDidMount() {
        SplashScreen.hide();
    }

    //an attempt at detecting existing login, almost works, but gets error on logout.

    /*componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((data) => {
            this.setState({
                GoogleLogin: true,
                userDetails: data,
            });
        });
    }

    componentWillUnmount() {
        this.authSubscription();
    } */

    render() {
        //List of chat rooms. 
        const list = [
            {
                name: 'Chat Room 1',
                subtitle: 'For good heroes',
                page: 'Chat',
            },
            {
                name: 'Chat Room 2',
                subtitle: 'For evil deeds',
                page: 'Chat2',
            },
        ];

        //The views here check if the user is logged in to google or not and displays different things accordingly
        return (
            <View style={styles.container}>

                <View style={this.state.GoogleLogin ? { display: "none" } : styles.signinContainer}>
                    <GoogleSigninButton
                        style={styles.googleButton}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={this.onLoginGoogle}>
                    </GoogleSigninButton>

                    <View style={{ padding: 25, }}>
                    </View>

                    <LoginButton
                        onPress={this.fbSignIn}
                    />
                </View>

                <View style={this.state.GoogleLogin ? styles.userDetailContainer : { display: 'none' }}>
                    <Text style={styles.txtEmail}>{this.state.userDetails.email}</Text>
                    <Text style={styles.txtName}>{this.state.userDetails.name}</Text>
                    <Button color="#FF5722" title='Logout' onPress={this.signOut}></Button>
                </View>

                <View style={this.state.GoogleLogin ? styles.listContainer : { display: 'none' }}>
                    {
                        //Our list is displayed here
                        list.map((l) => (
                            <ListItem
                                key={l.name}
                                title={l.name}
                                subtitle={l.subtitle}
                                onPress={() => this.props.navigation.navigate(l.page, { name: this.state.userDetails.name })}
                                chevron
                            />
                        ))
                    }
                </View>
            </View>
        )
    }

    //The google signin function. 
    onLoginGoogle = async () => {
        try {
            await GoogleSignin.configure();

            const data = await GoogleSignin.signIn();

            this.setState({
                GoogleLogin: true, userDetails: data.user,
            })

            if (data.isCancelled) {
                // Attempt at giving the user an alert if they cancel sign in. Not sure what aint working. 
                () => Alert.alert(
                    'User cancelled request',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false },
                );
            }

            this.setState({ data });
            // create a new firebase credential with the token       
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
            // login with credential
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential)
                .then((data) => {
                })

                .catch((error) => {
                    console.log('ERROR', error)
                });
        }
        catch (e) {
            console.error(e);
        }
    }

    //The facebook sign in. Does not quite work. Facebook login screen opens, but user never gets past the LoginManager. 
    fbSignIn = async () => {
        try {
            const result = await LoginManager.logInWithReadPermissions(['email', 'password'])
                .then(
                    (result) => {
                        if (result.isCancelled) {
                            () => Alert.alert(
                                'User cancelled request',
                                [
                                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                                ],
                                { cancelable: false },
                            );
                        } else {
                            AccessToken.getCurrentAccessToken()
                                .then((data) => {
                                    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                                    firebase.auth().signInWithCredential(credential)
                                        .then(loginUserSuccess(dispatch))
                                    this.props.navigation.navigate('Chat', { name: this.state.userDetails.name, email: this.state.userDetails.email })
                                        .catch((error) => {
                                            loginSingUpFail(dispatch, error.message);
                                        });
                                });
                        }
                    },
                    (error) => {
                        console.log('ERROR', error)
                    });
        } catch (e) {
            console.error(e);
        }
    }

    //The function that signs out the user when logout is pressed. 
    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({
                data: null,
                userDetails: '',
                GoogleLogin: false,
            });
        }
        catch (error) {
            console.error(error);
        }

        //Was intended to be the Facebook logout function, but as the facebook login never worked properly i never finished it. 
        /*   try {
               await LoginManager.revokeAccess();
               await LoginManager.signOut();
               this.setState({ data: null 
               }); 
           } catch (error) {
               console.error(error);
           }
        */

    };
}

const Rootstack = createStackNavigator(
    {
        Home: HomeScreen,
        Chat: ChatScreen,
        Chat2: ChatScreen2,


    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#1e90ff'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1
            }
        }
    }
);

const AppContainer = createAppContainer(Rootstack);

export default class App extends Component {
    render() {
        return (
            <AppContainer />
        );
    }
}
