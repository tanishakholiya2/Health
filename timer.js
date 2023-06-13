import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, TextInput } from 'react-native-web';
import WorkoutTimer from './components/workouts/workouttimer';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Audio } from 'expo-av';

export default function Timer({ navigation, route }) {
    const [timePassed, setTime] = React.useState(0);
    const [isRunning, setIsRunning] = React.useState(false)
    var [setsDone, setSets] = React.useState(1);
    var [exercisesDone, setExercises] = React.useState(1);
    var [isRest, setIsRest] = React.useState(false);
    const [sound, setSound] = React.useState();
    var time = route.params.time;
    var restTime = route.params.rest;
    var totalSets = route.params.numSets;
    var totalExercises = route.params.numExercises;
    const [numLoops, setNumLoops] = React.useState(0);

    startSound = async() => {
      await Audio.setAudioModeAsync({ });
      const { sound: playbackObject } = await Audio.Sound.createAsync(
        { uri: 'http://foo/bar.mp3' },
        { shouldPlay: true }
      );
      playbackObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      playbackObject.setIsLooping(true);

    }

    onPlaybackStatusUpdate = (playbackStatus) => {
      if (playbackStatus.didJustFinish) {
        if (this.state.numberOfLoops == 2) {
          playbackObject.setIsLooping(false);
        }
        setNumLoops(numLoops+1);
      }
    };

    React.useEffect(()=> {
      let start = null;
      if(!isRest){
        if(isRunning && !(timePassed === time)){
            start = setInterval(()=>setTime(timePassed+1000), 1000);
        }
        if(timePassed === time) {
          setIsRunning(false);
          setTime(0);
          finish();
          //navigation.navigate("WorkoutTimer");
        }
      }
      else {
        if(isRunning && !(timePassed === restTime)){
          start = setInterval(()=>setTime(timePassed+1000), 1000);
        }
        if(timePassed === restTime) {
          setIsRunning(false);
          setTime(0);
          startSound();
          finish();
          //navigation.navigate("WorkoutTimer");
        }
      }
      return () => clearInterval(start);
    },  [timePassed, isRunning])
    function toggleStopwatch() {
        setIsRunning(!isRunning)
    }
    function finish() {
      setTime(0);
      if(exercisesDone < totalExercises) {
        if(isRest) {
          setExercises(exercisesDone+1);
        }
        setIsRunning(true);
      }
      else if(setsDone < totalSets) {
        if(isRest) {
          setExercises(1);
          setSets(setsDone+1);
        }
        setIsRunning(true);
      }
      else {
        setIsRunning(false);
      }
      setIsRest(!isRest);
    }
   /* function countdown() {
      React.useEffect(()=> {
        let start = null;
        if(isRunning && !(timeGone === time)){
            start = setInterval(()=>setTime(timePassed+500), 500);
        }
        if(timePassed === time) {
          time = route.params.time;
          setTimePassed(0);
          setIsRunning(false);
        }
        return () => clearInterval(start);
      },  [timePassed, isRunning])
      start = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
      return(start)
    } */
    // Alert.alert("sets: " + totalSets + " exercises: " + totalExercises)
    return(
    <View style={styles.container}>
      <Text style={styles.infoText}> Set {setsDone}/{totalSets} </Text>
      <Text style={styles.infoText}> Exercise {exercisesDone}/{totalExercises} </Text>
      {isRest ? <Text style={styles.infoText}> REST </Text> : <Text style={styles.infoText}> {(time-timePassed)/1000} </Text>}
      {isRest ? <Text style={styles.infoText}>{(restTime-timePassed)/1000} </Text> : <Text></Text>}
      <TouchableOpacity onPress={toggleStopwatch} style={styles.button}>
        <Text> {isRunning ? "Stop": "Start"} </Text>
      </TouchableOpacity>
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