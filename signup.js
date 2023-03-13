import React from 'react';
import { TextInput, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { auth } from './firebase';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";


export default function SignUp({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const createUser = async () =>{
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
    }).then(navigation.navigate("Onboarding"));
    }

    return(
        <>
        <View style={styles.container}>
            <Text style={styles.text}> Email </Text>
            <TextInput  
                placeholder="Enter email"
                value={email.toLowerCase()}
                onChangeText={(text) => setEmail(text.toLowerCase())}
                style={styles.input}
                />
            <Text style={styles.text}> Password </Text>
            <TextInput 
                placeholder="Enter password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
            />

            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={()=>{createUser()}} style={styles.button}>
                <Text style={styles.buttonText}>Signup</Text>
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
    input: {
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
      width: "80%",
    },
    text: {
        fontWeight: "800",
        fontSize: 24,
    },
    buttonContainer: {
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
    },
    button: {
      backgroundColor: "#172c42",
      width: "100%",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
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
  });