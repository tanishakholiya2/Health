import React from 'react';
import { TextInput, TouchableOpacity, Text, View, StyleSheet, Alert } from 'react-native';
import { auth } from './firebase';
import { useState } from 'react';
import { onAuthStateChanged, deleteUser } from 'firebase/auth';
import { db } from './firebase';
import { deleteDoc, doc } from 'firebase/firestore';


export default function Settings({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState("");
    const [user, setUser] = useState();
    const [signedIn, setSignedIn] = useState(false);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setId(uid);
            setSignedIn(true);
            setUser(user)
        }
      });
    const delete1 = () => {
        Alert.alert('Confirm', 'Are you sure?', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Yes', onPress: (deleteuser)},
          ]);
    }
    const deleteuser = () =>{
        deleteDoc(doc(db, "users", id));
        deleteUser(user)
        navigation.navigate('Home')
    }

    return(
        <>
        <View style={styles.container}>
            <View style={{gap: 50}}>
            <TouchableOpacity onPress={()=>auth.signOut()} style={styles.button}>
                <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={delete1} style={styles.button}>
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            </View>
        </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#b4cebd',
    },
    text: {
        color: '#083316', fontSize: 20, marginBottom: 8
    },
    inputContainer: {
        marginBottom: 20,
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
      },
      button: {
        backgroundColor: "#172c42",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
      },
      radioButtons: {
        display:'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'space-evenly',
        marginHorizontal: 2,
    },
      buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#172c42",
        borderWidth: 2,
      },
      buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
      },
      buttonOutlineText: {
        color: "#0782F9",
        fontWeight: "700",
        fontSize: 16,
      },
      timeContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 4,
      }
  });