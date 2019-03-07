//The style sheet for most of the app scenes. 
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';


export default styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
    },
    signinContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userDetailContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtEmail: {
        color: 'black',
        marginTop: 10,
        fontSize: 13,
    },
    txtName: {
        color: 'black',
        margin: 10,
        fontSize: 13,
    },
    googleButton: {
        width: 200,
        height: 50,
        alignSelf: 'center',
    },
})