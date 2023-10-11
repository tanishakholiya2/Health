import { db } from "../../firebase";
import { doc, addDoc, setDoc, getDoc, getDocs, collection } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase';

export default function WorkoutLogs({route, navigation}) {
    const [entries, setEntries] = useState([]);
    const [id, setId] = useState("");
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setId(uid);
        }
      });

    const getEntries = async () => {
        const querySnapshot = await getDocs(collection(db, "users", id, "workouts"));
        const temp = [...entries];
        querySnapshot.forEach((doc) => {
            temp.push(doc.data().data);
        });
        setEntries(temp);      
    }

    useEffect(()=>{
        getEntries()
    }, [id, db])

    const merge = (arr) => {
        let merged = "";
        arr.map((val)=>{
            merged += val + ', '
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
        <View style={styles.buttonContainer}>
        </View>
        {entries.map((entry, index) => {
            return(
                <TouchableOpacity key={index} onPress={()=>{navigation.navigate("WorkoutInfo", {workout: entry})}} style={styles.button}>
                    <Text style={styles.buttonText}>{entry.date} </Text>
                </TouchableOpacity>
            )
        })
        }
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
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 5,
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