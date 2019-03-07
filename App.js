import React, { Component } from 'react'
import { StyleSheet, View, Text, StatusBar, Image, Button, ImageBackground, Spacer } from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin'
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import { createStackNavigator, createAppContainer, } from 'react-navigation';
import firebase from 'react-native-firebase'
import SplashScreen from 'react-native-splash-screen'

import ChatScreen from './screens/ChatScreen';
import styles from './screens/stylesheet/Style';

class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Welcome',
    });

    componentDidMount() {
        SplashScreen.hide();
    }

    state = { userDetails: '', GoogleLogin: false, }

    render() {
        const { userDetails } = this.state;
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

            </View>
        )
    }

    onLoginGoogle = async () => {
        try {
            // add any configuration settings here:
            await GoogleSignin.configure();

            const data = await GoogleSignin.signIn();

            this.setState({
                GoogleLogin: true, userDetails: data.user,
            })

            if (data.isCancelled) {
                // handle this however suites the flow of your app
                Alert.alert(
                    'User cancelled request',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]
                );
            }

            this.setState({ data });
            // create a new firebase credential with the token
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
            // login with credential
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential)
                .then((data) => {
                    this.props.navigation.navigate('Chat', { name: this.state.userDetails.name })
                })

                .catch((error) => {
                    console.log('ERROR', error)
                });

            //console.warn(JSON.stringify(firebaseUserCredential.data.toJSON()));

        }
        catch (e) {
            console.error(e);
        }
    }


    fbSignIn = async () => {
        try {
            const result = await LoginManager.logInWithReadPermissions(['email', 'password'])
                .then(
                    (result) => {
                        if (result.isCancelled) {
                            AccessToken.getCurrentAccessToken()
                                .then((data) => {
                                    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                                    firebase.auth().signInWithCredential(credential)
                                        .then(loginUserSuccess(dispatch))
                                    this.props.navigation.navigate('Chat', { name: this.state.userDetails.name })
                                        .catch((error) => {
                                            loginSingUpFail(dispatch, error.message);
                                        });
                                });
                        } else {
                            Alert.alert(
                                'User cancelled request',
                                [
                                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                                ]
                            );
                        }
                    },
                    (error) => {
                        console.log('ERROR', error)
                    });
        } catch (e) {
            console.error(e);
        }
    }

    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({
                data: null,
                userDetails: '',
                GoogleLogin: false,
            });
        } catch (error) {
            console.error(error);

        }
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
