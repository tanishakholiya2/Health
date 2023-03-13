import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, TextInput } from 'react-native-web';
import Timer from './timer';
import { useState } from 'react';


export default function WorkoutJournal(props) {
    return(
        <>
        <Text> Workout Routine </Text>
        <Text> Monday </Text>
        <Text> Tuesday </Text>
        <Text> Wednesday </Text>
        <Text> Thursday </Text>
        <Text> Friday </Text>
        <Text> Saturday </Text>
        <Text> Sunday </Text>
        </>
    )
}
