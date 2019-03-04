/*import React, { Component } from 'react';
import { AppRegistry, ImageBackground, Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer, } from 'react-navigation';

import MapScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import styles from './screens/Stylesheet/Style';

class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Main',
    }

    render() {
        return (

                <View style={styles.btnContainer}>

                        <TouchableOpacity
                            style={styles.userBtn}
                            onPress={() => this.props.navigation.navigate('Login')}
                        >
                            <Text>Enter</Text>
                        </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.userBtn}
                        onPress={() => this.props.navigation.navigate('Map')}
                    >
                        <Text>Map</Text>
                    </TouchableOpacity>
                </View>
        );
    }
}

const Rootstack = createStackNavigator(
    {
        Home: HomeScreen,
        Map: MapScreen,
        Login: LoginScreen,

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

AppRegistry.registerComponent(
    'AwesomeProject',
    () => App);*/

import React, { Component } from 'react'
import { StyleSheet, View, Text, StatusBar, Image, Button } from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin'

export default class App extends Component {
    state = { userDetails: '', GoogleLogin: false, }

    render() {
        return (
            <View style={styles.container}>
            <StatusBar backgroundColor='#FF7043'>
            </StatusBar>

            <View style={styles.headerContainer}>
                <Text style={styles.headerTxt}>Home Screen</Text>
            </View>

                <View style={this.state.GoogleLogin ? { display: "none" } : styles.signinContainer}>

                    <GoogleSigninButton
                    style={{ width: 192, height: 50 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this.signIn}>
                    </GoogleSigninButton>
            </View>

                <View style={this.state.GoogleLogin ? styles.userDetailContainer : { display: 'none' }}>
                <Image style={styles.userImage} source={{ uri: this.state.userDetails.photo }}></Image>
                <Text style={styles.txtEmail}>{this.state.userDetails.email}</Text>
                <Text style={styles.txtName}>{this.state.userDetails.name}</Text>
                <Button color="#FF5722" title='Logout' onPress={this.signOut}></Button>
            </View>
            </View>
        )
    }

    ignOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut()
            this.setState({
                userDetails: '',
                GoogleLogin: false,
            })
        } catch (error) {
            console.log(error.toString())
        }
    }

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('User Details', JSON.stringify(userInfo))

            this.setState({
                GoogleLogin: true, userDetails: userInfo.user,
            })

        } catch (error) {
            this.setState({ GoogleLogin: false, })
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("Cancel ", statusCodes.SIGN_IN_CANCELLED)
                // user cancelled the login flow 
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("InProgress ", statusCodes.IN_PROGRESS)
                // operation (f.e. sign in) is in progress already 
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("Not Available ", statusCodes.PLAY_SERVICES_NOT_AVAILABLE) 
                // play services not available or outdated 
            } else { console.log("Error ", error) }
        }
    };


}

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile 
    webClientId: '602222878267-1ki3ucs1nso4t4scrnh5mem9sr6mjd20.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access) 
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER 
    hostedDomain: '', // specifies a hosted domain restriction 
    loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd) 
    forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login. 
    accountName: '', // [Android] specifies an account name on the device that should be used // 
    iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist) 
});

    const styles = StyleSheet.create({
        container: {
            flex: 1
        },
        headerContainer: {
            width: '100%', height: 40, justifyContent: 'center', backgroundColor: '#FF5722',
        },
        headerTxt: {
            fontSize: 13, color: 'white', alignSelf: 'center'
        },
        signinContainer: {
            flex: 1, justifyContent: 'center', alignItems: 'center',
        },
        userDetailContainer: {
            flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'
        },
        userImage: {
            width: 100, height: 100,
        },
        txtEmail: {
            color: 'black', marginTop: 10, fontSize: 13,
        },
        txtName: {
            color: 'black', margin: 10, fontSize: 13,
        }
    })