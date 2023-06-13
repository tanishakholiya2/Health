import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Timer from '../../timer';
import { useState } from 'react';
import { doc, collection, addDoc, setDoc, getDoc } from "firebase/firestore"; 
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function WorkoutJournal({route, navigation}) {
    const [workoutFields, setWorkoutFields] = useState(route.params.workoutFields);
    const [responses, setResponses] = useState([]);
    const [disabled, setDisabled] = useState(true);
    let fields = route.params.workoutFields;
    const [id, setId] = useState("");
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setId(uid);
        }
      });

      const handleChange = (index, event) => {
        let temp = [...workoutFields];
        temp[index] = event;
        setWorkoutFields(temp);
        isDisabled();
    }

    const isDisabled = () => {
        let dis = false;
        workoutFields.map((val) => {
            if(val.name != undefined) {
                dis = true;
            }
        })
        setDisabled(dis);
    }
      const addWorkout = async () => { 
        setResponses(workoutFields);
        try{
            const data = {
                time: workoutFields[0],
                feeling: workoutFields[1],
                workoutType: workoutFields[2],
                date: new Date().toDateString(),
            }
            const docRef = await addDoc(collection(db, "users", id, "workouts"), {
            data }).then(navigation.navigate("Workouts", {workoutFields: fields}))
        Alert.alert('successfully added!')
        }    
        catch(e) {
            console.error(e);
        }
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
            {fields.map((field, index) => {
                if(field['type']=='rating') return(
                    <View>
                        <Text style={styles.text}> {field['name']} </Text>
                        {/* <TextInput
                            placeholder="Enter here" 
                            onChangeText={(text)=>{handleChange(index, text)}}
                            style={{borderWidth:2, borderColor:'skyBlue', marginTop:5}}/> */}
                        <Stars
                            count={5}
                            starSize={30}
                            update={(val)=>{handleChange(index, val)}}
                            fullStar={<Icon name={'star'} size={30} style={[styles.myStarStyle]}/>}
                            emptyStar={<Icon name={'star-outline'} size={30} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}
                        />
                    </View>
                )
                if(field['type']=='textInput') return(
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}> {field['name']} </Text>
                        <TextInput
                            placeholder="Enter here" 
                            onChangeText={(text)=>{handleChange(index, text)}}
                            style={{borderWidth:2, borderColor:'skyBlue', marginTop:5}}/>
                    </View>
                )
            })}
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={()=>{addWorkout()}} style={styles.button} disabled={disabled}>
                <Text style={styles.buttonText}>Enter</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={()=>{navigation.navigate("WorkoutLogs")}} style={styles.button}>
                <Text style={styles.buttonText}>See previous Entries</Text>
            </TouchableOpacity>
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
      textInput: {
        borderWidth:2, 
        borderColor:'skyBlue', 
        marginTop:5, 
      },
      myStarStyle: {
        color: '#FDFD96',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
      },
      myEmptyStarStyle: {
        color: 'white',
      }
  });