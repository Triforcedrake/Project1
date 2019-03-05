import React, { Component } from 'react'
import { StyleSheet, View, Text, StatusBar, Image, Button, TouchableOpacity } from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin'
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { createStackNavigator, createAppContainer, } from 'react-navigation';
import firebase from 'react-native-firebase'

import ChatScreen from './screens/ChatScreen';
import MainScreen from './screens/MainScreen';

class HomeScreen extends Component {
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
                        onPress={this.googleSignIn}>
                    </GoogleSigninButton>

                    <Button
                        onPress={this.fbSignIn}
                        title="Sign in with facebook"
                        color="#3c50e8"
                    />

                    <TouchableOpacity
                        style={styles.testButton}
                        onPress={() => this.props.navigation.navigate('Main')}
                    >
                        <Text>Test Login</Text>
                    </TouchableOpacity>
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

    googleSignIn = async () => {
        try {
            // add any configuration settings here:
            await GoogleSignin.configure();

            const data = await GoogleSignin.signIn();

            // create a new firebase credential with the token
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
            // login with credential
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

            console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
        } catch (e) {
            console.error(e);
        }
    }

    fbSignIn = async () => {
    try {
        const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            // handle this however suites the flow of your app
            throw new Error('User cancelled request');
        }

        console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

        // get the access token
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            // handle this however suites the flow of your app
            throw new Error('Something went wrong obtaining the users access token');
        }

        // create a new firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

        // login with credential
        const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

        console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()))
    } catch (e) {
        console.error(e);
    }
}
}

const Rootstack = createStackNavigator(
    {
        Home: HomeScreen,
        Main: MainScreen,
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

/*   ignOut = async () => {
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
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    testButton: {
        color: 'blue' , flex: 1, 
    },
})