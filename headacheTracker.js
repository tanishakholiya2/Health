import { db } from "./firebase";
import { doc, addDoc, setDoc, getDoc, getDocs, collection } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import TimePicker from 'react-time-picker'
import RadioGroup from 'react-native-radio-buttons-group'; 
import MultiSelect from 'react-native-multiple-select';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';


export default function HeadacheTracker({route, navigation}) {
    const [headaches, setHeadaches] = useState([]);
    const headacheFields = route.params.headacheFields;
    const [id, setId] = useState("");
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setId(uid);
        }
      });

    const getHeadaches = async () => {
        const querySnapshot = await getDocs(collection(db, "logs"));
        const temp = [...headaches];
        querySnapshot.forEach((doc) => {
            if(doc.get('id') === id){
                temp.push(doc.data());
                setHeadaches(temp);
            }
        });
    }

    useEffect(()=>{
        getHeadaches()
    }, [id, db])
    
    return(
        <View style={styles.container}>
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={()=>{navigation.navigate("Headache", {headacheFields})}} style={styles.button}>
            <Text style={styles.buttonText}>Log Headache</Text>
        </TouchableOpacity>
        </View>
        
        {headaches.map((headache) => {
            console.log(headache);
            return(
                <div>
                    <h2> {headache.date} </h2>
                    <p> {headache.startTime} </p>
                    <p> {headache.endTime} </p>
                    <p> {headache.position} </p>
                </div>
            )
        })
        }
        
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