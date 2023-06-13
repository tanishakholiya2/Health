import { db } from "../../firebase";
import { doc, addDoc, setDoc, getDoc, getDocs, collection } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function WorkoutInfo({route, navigation}) {
    const [id, setId] = useState("");
    let workout = route.params.workout;
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
        <Text style={styles.text}> {workout.date} </Text>
        <View style={styles.textContainer}>
            <Text style={styles.infoText}> Time: {workout.time} </Text>
            <View style={{display:"flex", flexDirection: "row"}}>
            <Text style={styles.infoText}> How it felt: </Text>
            <Stars
              display={workout.feeling}
              spacing={8}
              count={5}
              starSize={30}
              fullStar={<Icon name={'star'} size={30} style={[styles.myStarStyle]}/>}
              emptyStar={<Icon name={'star-outline'} size={30} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}
              />
            </View>
            <Text style={styles.infoText}> Workout Type: {workout.workoutType} </Text>
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