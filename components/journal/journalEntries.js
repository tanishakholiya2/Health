import { db } from "../../firebase";
import { doc, addDoc, setDoc, getDoc, getDocs, collection } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase';
import Card from "../card";

export default function JournalEntries({route, navigation}) {
    const [entries, setEntries] = useState([]);
    const [id, setId] = useState("");
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setId(uid);
        }
      });

    const getEntries = async () => {
        const querySnapshot = await getDocs(collection(db, "users", id, "journals"));
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
        if(typeof arr == undefined) {
          return arr;
        }
        arr.map((val, index)=>{
            merged += val
            if(index != arr.length-1) {
              merged +=  ', '
            }
        })
        return merged
    }
    let entry = route.params.entry
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
    <Text style={styles.text}> {entry.date} </Text>
    {entry.type === "morning" ? 
    <View style={styles.textContainer}>
        <Text style={styles.infoText}> Type: {entry.type} </Text>
        <Text style={styles.infoText}> Looking forward to: {merge(entry.lookingForwardTo)} </Text>
        <Text style={styles.infoText}> Goals: {merge(entry.goals)} </Text>
        <Text style={styles.infoText}> Positive affirmations: {merge(entry.positiveAffs)} </Text>
    </View>:<View style={styles.textContainer}>
        <Text style={styles.infoText}> type: {entry.type} </Text>
        <Text style={styles.infoText}> Things that could have gone better: {merge(entry.better)} </Text>
        <Text style={styles.infoText}> Goals met: {merge(entry.goals)} </Text>
        <Text style={styles.infoText}> Self care activities: {merge(entry.selfCare)} </Text>
    </View>

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