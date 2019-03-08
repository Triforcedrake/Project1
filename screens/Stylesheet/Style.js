//The style sheet 
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';


export default styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtEmail: {
        color: 'black',
        marginTop: 10,
        fontSize: 20,
    },
    txtName: {
        color: 'black',
        margin: 10,
        fontSize: 20,
    },
    googleButton: {
        width: 200,
        height: 50,
        alignSelf: 'center',
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    listContainer: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        width: '100%',
        position: 'absolute',
        bottom: 35,
    },
    titles: {
        color: 'blue',
    },
})