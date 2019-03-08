//Firebase setup for handling the chat system
import firebase from 'firebase'; // 4.8.1
import firebaseApp from './config/fireConfig';

class Fire {
    constructor() {
        this.init();
        this.observeAuth();
    }

    init = () =>
        firebaseApp;
     

    observeAuth = () =>
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    
    onAuthStateChanged = user => {
        if (!user) {
            try {
                firebase.auth().signInAnonymously();
            } catch ({ message }) {
                alert(message);
            }
        }
    };
    
    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
    //This defines where the chat is stored. Duplicating all code here and changing this value would allow you setup a new chat room easily,
    //but I am certain that there is a more efficient way to do. 
    get ref() {
        return firebase.database().ref('Chat2');
    }

    parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;
        const timestamp = new Date(numberStamp);
        const message = {
            _id,
            timestamp,
            text,
            user,
        };
        return message;
    };

    on = callback =>
        this.ref
            .limitToLast(50)
            .on('child_added', snapshot => callback(this.parse(snapshot)));

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }
    // send the message to the Backend
    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            const message = {
                text,
                user,
                timestamp: this.timestamp,
            };
            this.append(message);
        }
    };

    append = message => this.ref.push(message);

    // close the connection to the Backend
    off() {
        this.ref.off();
    }
}

Fire.shared = new Fire();
export default Fire;