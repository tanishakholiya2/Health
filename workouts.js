import { Button, TextInput } from 'react-native-web';
import { useState } from 'react';


export default function Workouts(props) {
    return(
        <>
        <Button title="Circuit Training Timer" onPress={() => props.navigation.navigate("WorkoutTimer")} />
        <Button title="Workout Journal" onPress={() => props.navigation.navigate("WorkoutJournal")} />
        </>
    )
}