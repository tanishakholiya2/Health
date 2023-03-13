import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, TextInput } from 'react-native-web';
import Timer from './timer';
import { useState } from 'react';


export default function WorkoutTimer(props) {
    const [numSets, setSets] = React.useState(0);
    const [exercises, setExercises] = React.useState(0);
    const [workTime, setWorkTime] = React.useState(0);
    const [restTime, setRestTime] = React.useState(0);
    const [timeLeft, setTimeLeft] = React.useState(0);

    function onChange (value, func) {
      console.log(value);
      func(value);
    }
    return(
      <View>
        {console.log("exercises: " + exercises + " work " + workTime + " rest " + restTime + " sets " + numSets + " ")}
        <Text> Number of exercises </Text>
        <input type="number" onChange={(e)=>{onChange(e.target.value, setExercises)}} />
        <Text> Exercises length (in seconds) </Text>
        <input type="number" onChange={(e)=>{onChange(e.target.value, setWorkTime)}} />
        <Text> Rest length </Text>
        <input type="number" onChange={(e)=>{onChange(e.target.value, setRestTime)}} />
        <Text> Number of sets </Text>
        <input type="number" onChange={(e)=>{onChange(e.target.value, setSets)}} />
        <Button title="go" onPress={() => props.navigation.navigate("Timer", { time:workTime*1000, numExercises:exercises, numSets:numSets, rest: restTime*1000 })} />
      </View>
    )
}

const styles = StyleSheet.create({
    thumbnail: {
      width: 300,
      height: 300,
      resizeMode: "contain"
    }
  });