import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Memories from './memories';
import Journal from './components/journal/journal';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkoutTimer from './components/workouts/workouttimer';
import Workouts from './components/workouts/workouts';
import Timer from './timer';
import Login from './login';
import WorkoutJournal from './components/workouts/workoutjournal';
import { auth } from './firebase';
import SignUp from './signup';
import Onboarding from './onboarding';
import { useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { db } from './firebase';
import { useEffect } from 'react';
import {doc, getDoc} from "firebase/firestore";
import HeadacheLog from './components/headache/headacheLog';
import HeadacheTracker from './components/headache/headacheTracker';
import Todo from './todo';
import "@expo/metro-runtime";
import JournalEntries from './components/journal/journalEntries';
import JournalLogHome from './components/journal/journalLogHome';
import HeadacheInfo from './components/headache/headacheInfo';
import { Alert } from 'react-native-web';
import WorkoutLogs from './components/workouts/workoutLogs';
import WorkoutInfo from './components/workouts/workoutLogInfo';
import ChatBot from './Chatbot';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Memories" component={Memories} />
         <Stack.Screen name="Journal" component={Journal} />
        <Stack.Screen name="JournalEntries" component={JournalEntries} />
        <Stack.Screen name="JournalLogHome" component={JournalLogHome} />
        <Stack.Screen name="Workouts" component={Workouts} />
        <Stack.Screen name="WorkoutTimer" component={WorkoutTimer} />
        <Stack.Screen name="WorkoutJournal" component={WorkoutJournal} />
        <Stack.Screen name="Timer" component={Timer} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Headache" component={HeadacheLog} />
        <Stack.Screen name="Headache Tracker" component={HeadacheTracker} />
        <Stack.Screen name="HeadacheInfo" component={HeadacheInfo} />
        <Stack.Screen name="WorkoutLogs" component={WorkoutLogs}/>
        <Stack.Screen name="WorkoutInfo" component={WorkoutInfo} />
        <Stack.Screen name="Todo" component={Todo} />
        <Stack.Screen name="Chatbot" component={ChatBot} />
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
      console.log(headacheFields)
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
 // if(signedIn) {
    return(
      <View style={{ flex:1, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#b4cebd' }}>
      <Text style={styles.text}>wellnesium</Text>
      {/* <Button title="Memories" color='#172c42' onPress={()=>navigation.navigate('Memories')}/> */}
      <TouchableOpacity onPress={()=>{navigation.navigate("Journal", {journalMorningFields: journalMorningFields, journalNightFields: journalNightFields})}} style={styles.button}>
        <Text style={styles.buttonText}>Journal</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Workouts', {workoutFields})} style={styles.button}>
        <Text style={styles.buttonText}>Workouts</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Headache Tracker', {headacheFields})} style={styles.button}>
        <Text style={styles.buttonText}>Headache Tracker</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Todo')} style={styles.button}>
        <Text style={styles.buttonText}>Todo</Text>
      </TouchableOpacity>
      {signedIn && 
      <TouchableOpacity onPress={()=>auth.signOut()} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>}
      {!signedIn &&  
          <>
          <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('Signup')} style={styles.button}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
          </>}
      </View>
    )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  text: {
    fontWeight: "400",
    fontSize: 40,
    marginBottom: 10,
},
  button: {
    backgroundColor: "#172c42",
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
