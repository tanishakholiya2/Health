import { db } from "../../firebase";
import { doc, addDoc, setDoc, getDoc, getDocs, collection } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

export default function HeadacheInfo({route, navigation}) {
    const [id, setId] = useState("");
    let headache = route.params.headache;
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setId(uid);
        }
      });

    const merge = (arr) => {
        let merged = "";
        arr.map((val, index)=>{
            merged += val.value
            if(index != arr.length-1) {
              merged += ', '
            }
        })
        return merged
    }
    
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
        <Text style={styles.text}> {headache.date} </Text>
        <View style={styles.textContainer}>
            <Text style={styles.infoText}> Start time: {headache.startTime} </Text>
            <Text style={styles.infoText}> End time: {headache.endTime} </Text>
            <Text style={styles.infoText}> Position: {headache.position} </Text>
            <Text style={styles.infoText}> Relief measures: {headache.reliefs} </Text>
            <Text style={styles.infoText}> Triggers: {headache.triggers} </Text>
        </View>
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
    textContainer: {
      borderRadius: 2,
      borderWidth: 2,
      borderColor: "#172c42",
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
      infoText: {
        fontSize: 16,
        marginBottom: 10,
      }
  });