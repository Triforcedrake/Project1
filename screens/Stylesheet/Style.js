//The style sheet for most of the app scenes. 
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';


export default styles = StyleSheet.create({

    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontFamily: 'immortal',
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        color: 'white',
    },
    input: {
        textAlign: 'center',
        borderRadius: 25,
        width: "90%",
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
    },
    userBtn: {
        textAlign: 'center',
        borderRadius: 15,
        backgroundColor: "#FFD700",
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        width: "45%",
    },
    mapBtn: {
        textAlign: 'center',
        padding: 15,
        bottom: 15,
        borderRadius: 15,
        backgroundColor: "#FFD700",
        justifyContent: "center",
        alignItems: "center",
        width: "45%",
    },
    listContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#B6A6BB',
    },
    addListMain: {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#2a8ab7'
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
    },
    mapContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },

})

