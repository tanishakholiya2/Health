import { db } from "../../firebase";
import { doc, addDoc, setDoc, getDoc, getDocs, collection } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase';

export default function HeadacheTracker({route, navigation}) {
    const [headaches, setHeadaches] = useState([]);
    const headacheFields = route.params.headacheFields;
    const [id, setId] = useState("");
    const [signedIn, setSignedIn] = useState(false);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setId(uid);
            setSignedIn(true);
        }
      });

      const getEntries = async () => {
        const querySnapshot = await getDocs(collection(db, "users", id, "logs"));
        const temp = [...headaches];
        querySnapshot.forEach((doc) => {
            temp.push(doc.data().data);
        });
        setHeadaches(temp);      
    }

    useEffect(()=>{
        getEntries()
    }, [id, db])

    const merge = (arr) => {
        let merged = "";
        arr.map((val)=>{
            merged += val.value + ', '
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
        {!signedIn && 
            <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={styles.button}>
                <Text style={styles.buttonText}>Login to view previous headaches and log headaches</Text>
        </TouchableOpacity>}
        {signedIn && 
        <TouchableOpacity onPress={()=>{navigation.navigate("Headache", {headacheFields})}} style={styles.button}>
            <Text style={styles.buttonText}> Log Headache </Text>
        </TouchableOpacity>}
        </View>
        
        {headaches.map((headache, index) => {

            return(
                <TouchableOpacity onPress={()=>{navigation.navigate("HeadacheInfo", {headache})}} style={styles.button}>
                    <Text style={styles.buttonText}>{headache.date} </Text>
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