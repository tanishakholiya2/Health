import { db } from "../../firebase";
import { useState, useEffect } from 'react';
import { Button, TextInput, StyleSheet, View, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { doc, collection, addDoc, setDoc, getDoc } from "firebase/firestore"; 
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

export default function Workouts({route, navigation}) {
    const workoutFields = route.params.workoutFields;
    const [id, setId] = useState("");
    const [signedIn, setSignedIn] = useState(false);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setId(uid);
            setSignedIn(true);
        }
      });
    return(
        <View style={styles.container}>
          <ScrollView
                contentContainerStyle={{
                    display: "flex",
                    flexDirection: "column",
                }}
                keyboardDismissMode="on-drag"
                automaticallyAdjustKeyboardInsets={true}
            >
          <TouchableOpacity onPress={()=>{navigation.navigate("WorkoutTimer")}} style={styles.button}>
            <Text style={styles.buttonText}>Workout Timer</Text>
          </TouchableOpacity>
          {!signedIn && 
            <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={styles.button}>
                <Text style={styles.buttonText}>Login to view previous headaches and log headaches</Text>
          </TouchableOpacity>}
          {signedIn && 
          <TouchableOpacity onPress={()=>{navigation.navigate("WorkoutJournal", {workoutFields})}} style={styles.button}>
            <Text style={styles.buttonText}>Workout Logs</Text>
          </TouchableOpacity>}
          </ScrollView>
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
  headacheInfo: {
      borderWidth: '2',
  },
  text: {
      fontWeight: "800",
      fontSize: 24,
      marginBottom: 10,
  },
  inputContainer: {
      marginBottom: 10,
  },
  buttonContainer: {
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 5,
    },
    button: {
      backgroundColor: "#172c42",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 5,
      marginHorizontal: 10,
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