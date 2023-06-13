import React from 'react';
import { auth } from './firebase';
import { db } from './firebase';
import { TextInput, Text, TouchableOpacity, StyleSheet, View, Alert } from 'react-native';
import { NavigationScreenProp, NavigationParams } from "react-navigation";
import { NavigationState, RouteProp } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from 'react';
import { doc, addDoc, setDoc } from "firebase/firestore"; 
import { getDocs, getFirestore } from "firebase/firestore";


export default function Onboarding({navigation}) {
    const [isSignedIn, setSignedIn] = useState(false);
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFName]= useState("");
    const [lastName, setLName]= useState("");
    const [age, setAge] = useState(0);
    const [mental, setMental] = useState([]);
    const [physical, setPhysical] = useState([]);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setSignedIn(true);
            setId(uid);
            setEmail(user.email);
        } else {
            setSignedIn(false);
            setId("");
            setEmail("");
        }
      });
    

    const addInfo = async () => {
        try{
            const docRef = await setDoc(doc(db, "users", id), {
            firstName: firstName,
            lastName: lastName,
            age: age,
            email: email,
            mentalHealth: mental,
            physicalHealth: physical,
        }).then(navigation.navigate("Home"))
    }
        catch(e) {
            console.error(e);
        }
    }

    const write = () => {
        addInfo()
    }

    return(
        <View style={styles.container}>
          <Text style={styles.text}> First Name </Text>
          <TextInput 
            placeholder="Enter name"
            value={firstName}
            onChangeText={(text) => setFName(text)}
            style={styles.input}
          />
          <Text style={styles.text}> Last Name </Text>
          <TextInput 
            label={'Last Name'}  
            placeholder="Enter name"
            value={lastName}
            onChangeText={(text) => setLName(text)}
            style={styles.input}
          />
          <Text style={styles.text}> Age </Text>
          <TextInput
            placeholder="Enter age"
            value={age}
            onChangeText={(text) => setAge(text)}
            style={styles.input}
          />
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => {if(firstName!=="" && lastName!=="") {write()}}} style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            </View>
        </View>
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