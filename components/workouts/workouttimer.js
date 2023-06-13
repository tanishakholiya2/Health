import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Timer from '../../timer';
import { useState } from 'react';


export default function WorkoutTimer(props) {
    const [numSets, setSets] = React.useState(0);
    const [exercises, setExercises] = React.useState(0);
    const [workTime, setWorkTime] = React.useState(0);
    const [restTime, setRestTime] = React.useState(0);

    function onChange (value, func) {
      func(value);
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
        <Text style={styles.infoText}> Number of exercises </Text>
        <TextInput onChangeText={(val)=>{onChange(val, setExercises)}} keyboardType='numeric' style={styles.textInput}/>
        <Text style={styles.infoText}> Exercises length (in seconds) </Text>
        <TextInput keyboardType='numeric' onChangeText={(val)=>{onChange(val, setWorkTime)}} style={styles.textInput}/>
        <Text style={styles.infoText}> Rest length </Text>
        <TextInput keyboardType='numeric' onChangeText={(val)=>{onChange(val, setRestTime)}} style={styles.textInput}/>
        <Text style={styles.infoText}> Number of sets </Text>
        <TextInput keyboardType='numeric' onChangeText={(val)=>{onChange(val, setSets)}}style={styles.textInput}/>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={()=>{
            props.navigation.navigate("Timer", { time:workTime*1000, numExercises:exercises, numSets:numSets, rest: restTime*1000 })}} style={styles.button}>
              <Text style={styles.buttonText}>Go</Text>
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
    infoText: {
      fontSize: 16,
      marginBottom: 10,
    }
});