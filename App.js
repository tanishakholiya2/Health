import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Memories from './memories';
import Journal from './journal';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkoutTimer from './workouttimer';
import Workouts from './workouts';
import Timer from './timer';
import Login from './login';
import WorkoutJournal from './workoutjournal';
import { auth } from './firebase';
import SignUp from './signup';
import Onboarding from './onboarding';
import { useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { db } from './firebase';
import { useEffect } from 'react';
import {doc, getDoc} from "firebase/firestore";
import HeadacheLog from './headacheLog';
import HeadacheTracker from './headacheTracker';
import Todo from './todo';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Memories" component={Memories} />
        <Stack.Screen name="Journal" component={Journal} />
        <Stack.Screen name="Workouts" component={Workouts} />
        <Stack.Screen name="WorkoutTimer" component={WorkoutTimer} />
        <Stack.Screen name="WorkoutJournal" component={WorkoutJournal} />
        <Stack.Screen name="Timer" component={Timer} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Headache" component={HeadacheLog} />
        <Stack.Screen name="Headache Tracker" component={HeadacheTracker} />
        <Stack.Screen name="Todo" component={Todo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Home({navigation}) {
  const [journalMorningFields, setJournalMFields] = useState([]);
  const [journalNightFields, setJournalNFields] = useState([]);
  const [headacheFields, setHeadacheFields] = useState([]);
  const [workoutFields, setWorkoutFields] = useState([]);
  const getData = (field) => {
    if (typeof field === 'object') {
        return ({
            name: Object.keys(field)[0].trim(),
            type: Object.values(field)[0]
        });
    }
    const [name, type] = field.trim().split(':');
    if (typeof type === 'string') {
        return ({
            name: name.trim(),
            type: type.trim(),
        });
    }
  }
  const fetchData = async () => {
    let docRef = doc(db, "fields", "headache");
    await getDoc(docRef).then((headacheData) => {
      const data = headacheData.data().headacheData;
      setHeadacheFields(data.map((field) => getData(field)));
    });
    docRef = doc(db, "fields", "journal");
    await getDoc(docRef).then((journalData) => {
        let data = journalData.data().journalFieldsMorning;
        setJournalMFields(data.map((field) => getData(field)));
        data = journalData.data().journalFieldsNight;
        setJournalNFields(data.map((field) => getData(field)));
    });
    docRef = doc(db, "fields", "workouts");
    await getDoc(docRef).then((workoutData) => {
      const data = workoutData.data().workoutFields;
        setWorkoutFields(data.map((field) => getData(field)));
    });
  }
  useEffect(()=>{fetchData()}, [])
  const [signedIn, setSignedIn] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });
  if(signedIn) {
    return(
      <View style={{ flex:1, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#b4cebd' }}>
      <Text style={{fontSize:100}}>title</Text>
      <Button title="Memories" color='#172c42' onPress={()=>navigation.navigate('Memories')}/>
      <Button title="Journal" color='#172c42' onPress={()=>navigation.navigate('Journal')}/>
      <Button title="Workouts" color='#172c42' onPress={()=>navigation.navigate('Workouts')}/>
      <Button title="Headache Tracker" color='#172c42' onPress={()=>navigation.navigate('Headache Tracker', {headacheFields})}/>
      <Button title="Todo" color='#172c42' onPress={()=>navigation.navigate('Todo')}/>
      <Button title="Logout" color='#172c42' onPress={()=>auth.signOut()}/>
      </View>
    )
  }
  else {
    return(
      <View style={{ flex:1, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#b4cebd' }}>
      <Text style={{fontSize:100}}>title</Text>
      <Button title="Login" color='#172c42' onPress={()=>navigation.navigate('Login')}/>
      <Button title="Signup" color='#172c42' onPress={()=>navigation.navigate('Signup')}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: "#172c42",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});
