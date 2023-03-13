import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, TextInput } from 'react-native-web';
import WorkoutTimer from './workouttimer';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';


export default function Timer({ navigation, route }) {
    const [timePassed, setTime] = React.useState(0);
    const [isRunning, setIsRunning] = React.useState(false)
    var [setsDone, setSets] = React.useState(1);
    var [exercisesDone, setExercises] = React.useState(1);
    var [isRest, setIsRest] = React.useState(false);
    var time = route.params.time;
    var restTime = route.params.rest;
    var totalSets = route.params.numSets;
    var totalExercises = route.params.numExercises;

    React.useEffect(()=> {
      let start = null;
      if(!isRest){
        console.log('work')
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
        console.log('rest');
        console.log(timePassed)
        if(isRunning && !(timePassed === restTime)){
          start = setInterval(()=>setTime(timePassed+1000), 1000);
        }
        if(timePassed === restTime) {
          setIsRunning(false);
          setTime(0);
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
            console.log(timeGone);
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
    return(
    <View>
      <Text> set {setsDone}/{totalSets} </Text>
      <Text> exercise {exercisesDone}/{totalExercises} </Text>
      {isRest===true && <Text> REST </Text>}
      {isRest===false && <Text> {(time-timePassed)/1000} </Text>}
      {isRest===true && <Text> {(restTime-timePassed)/1000} </Text>}
      <Button title={isRunning ? "Stop" : "Start"} onPress={toggleStopwatch}/>
    </View>
    )
  }