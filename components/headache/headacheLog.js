import { db } from "../../firebase";
import { doc, collection, addDoc } from "firebase/firestore"; 
import { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import RadioGroup from 'react-native-radio-buttons-group'; 
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase';
import RNDateTimePicker from '@react-native-community/datetimepicker';
// import Select from 'react-select'

export default function HeadacheLog({route, navigation}) {
    const [headacheFields, setHeadacheFields] = useState(route.params.headacheFields);
    const [id, setId] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [date, setDate] = useState(new Date())
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setId(uid); 
        }
      });
    const radioButtonsData = [{id: '1', label: 'sinus', value: 'sinus'}, 
    {  id: '2', label: 'tmj', value: 'tmj' }, {  id: '3', label: 'cluster', value: 'cluster' }, 
    {  id: '4', label: 'tension', value: 'tension' }, {  id: '5', label: 'neck', value: 'neck' },
    {  id: '6', label: 'migraine', value: 'migraine' }, {id: '7', label: 'spinal', value: 'spinal'} ];
    const triggersData = [{id: '1', value: 'exercise', label: 'exercise'},{id: '2', value: 'sun', label: 'sun'}, 
     { id: '3', value: 'lack of sleep', label: 'lack of sleep'}, { id: '4', value: 'stress', label: 'stress'}, 
      { id: '5', value: 'meds', label: 'medication'}, 
      {id: '6',value: 'food', label: 'food' }, {id: '7', value: 'skip', label: 'skipped meals'}, 
      {id: '8', value: 'smells', label: 'smells'}, { id: '9', value: 'loud', label: 'loud noises' }]
      const reliefs = [{id: '1', value: 'medications', label: 'medications'},{id: '2', value: 'water', label: 'water'}, 
      { id: '3', value: 'sleep', label: 'sleep'}, { id: '4', value: 'exercise', label: 'exercise'}, 
       { id: '5', value: 'hot compress', label: 'hot compress'}, 
       { id: '6', value: 'food', label: 'food' }, { id: '7', value: 'cold pack', label: 'cold pack'},]
    const [radioButtons, setRadioButtons] = useState(radioButtonsData);
    const [selectedTriggers, setSelectedTriggers] = useState(triggersData);
    const [selectedReliefs, setSelectedReliefs] = useState(reliefs);
    
    function onPressTriggers(radioButtonsArray, index) {
        setSelectedTriggers(radioButtonsArray);
        var name = radioButtonsArray.find(({selected})=>selected===true).label;
        let temp = [...headacheFields];
        temp[index] = name;
        temp[0] = new Date();
        temp[1] = new Date();
        temp[5] = new Date();
        setHeadacheFields(temp);
        isDisabled(temp);
    }
    function onPressReliefs(radioButtonsArray, index) {
        setSelectedReliefs(radioButtonsArray);
        var name = radioButtonsArray.find(({selected})=>selected===true).label;
        let temp = [...headacheFields];
        temp[index] = name;
        setHeadacheFields(temp);
        isDisabled(temp);
    }
    function onPressRadioButton(radioButtonsArray, index) {
        setRadioButtons(radioButtonsArray);
        var name = radioButtonsArray.find(({selected})=>selected===true).label;
        let temp = [...headacheFields];
        temp[index] = name;
        setHeadacheFields(temp);
        isDisabled(temp);
    }

    let fields = route.params.headacheFields;
    const handleChange = (index, event) => {
        if(index == 1 && headacheFields.find(({name})=>name==='Start Time')==undefined) {}
        if(index == 0 && headacheFields.find(({name})=>name==='End Time')==undefined) {}
        let temp = [...headacheFields];
        temp[index] = event;
        setHeadacheFields(temp);
        isDisabled(temp);
    }

    const isDisabled = (temp) => {
        let dis = false;
        temp.map((val) => {
            if(val.name != undefined) {
                dis = true;
            }
        })
        setDisabled(dis);
    }

    const addHeadache = async () => {
        try{
            let time1 = headacheFields[0].toLocaleTimeString()
            time1 = time1.substring(0, time1.indexOf(':', 3)) + time1.substring(time1.indexOf(' '))
            let time2 = headacheFields[1].toLocaleTimeString()
            time2 = time2.substring(0, time2.indexOf(':', 3)) + time2.substring(time2.indexOf(' '))
            const data = {
                
                startTime: time1,
                endTime: time2,
                triggers: headacheFields[2],
                reliefs: headacheFields[3],
                position: headacheFields[4],
                date: headacheFields[5].toDateString().substring(headacheFields[5].toDateString().indexOf(' ')+1),
            }
            const docRef = await addDoc(collection(db, "users", id, "logs"), {
            data }).then(navigation.navigate("Headache Tracker", {headacheFields: fields}))
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
            if(field['type']=='time') {
                let date = new Date();
                if(headacheFields[index].name == undefined) {
                    date = (headacheFields[index])
                }
                return(
                <View style={styles.timeContainer} key={index}>
                    <Text style={styles.text}> {field['name']} </Text>
                    {/* <TextInput
                        placeholder="Enter here" 
                        onChangeText={(text)=>{handleChange(index, text)}}
                        style={{borderWidth:2, borderColor:'skyBlue', marginTop:5}}/> */}
                        
                    <RNDateTimePicker display="default" mode="time" value={date} onChange={(event, text)=>{
                        handleChange(index, text)
                        }}/>
                </View>
            )}
            else if(field['type']=='date'){
                let date = new Date();
                if(headacheFields[index].name == undefined) {
                    date = (headacheFields[index])
                }
                return(
                <View style={styles.timeContainer} key={index}>
                    <Text style={styles.text}> {field['name']} </Text>
                    {/* <TextInput
                        placeholder="Enter here" 
                        onChangeText={(text)=>{handleChange(index, text)}}
                        style={{borderWidth:2, borderColor:'skyBlue', marginTop:5}}/> */}
                    <RNDateTimePicker display="default" mode="date" value={date} onChange={(event, selectedDate)=>{handleChange(index, selectedDate)}} maximumDate={new Date()}/>
                </View>
            )}
            else if(field['type'] == 'radioButton') {
                return(
                    <View style={styles.inputContainer} key={index}>
                        <Text style={styles.text}> {field['name']} </Text>
                        <RadioGroup 
                        radioButtons={radioButtons} 
                        onPress={(radioButtonsArray)=>{onPressRadioButton(radioButtonsArray, index)}} 
                        containerStyle={styles.radioButtons}
                        />
                    </View>
            )}
            else if(field['type'] == 'multiselect') {
                if(field['name'] == 'Triggers') {
                return(
                    <View style={styles.inputContainer} key={index}>
                        <Text style={styles.text}> {field['name']} </Text>
                        <RadioGroup 
                        radioButtons={selectedTriggers} 
                        onPress={(radioButtonsArray)=>{onPressTriggers(radioButtonsArray, index)}} 
                        containerStyle={styles.radioButtons}
                        />
                    </View>
            )
            }
            else if(field['name'] == 'Relief Measures') {
                return(
                    <View style={styles.inputContainer} key={index}>
                        <Text style={styles.text}> {field['name']} </Text>
                        <RadioGroup 
                        radioButtons={selectedReliefs} 
                        onPress={(radioButtonsArray)=>{onPressReliefs(radioButtonsArray, index)}} 
                        containerStyle={styles.radioButtons}
                        />
                    </View>
            )
            }
            }
        })}
            <View>
            <TouchableOpacity onPress={()=>{addHeadache()}} style={styles.button} disabled={disabled}>
                <Text style={styles.buttonText}>Add</Text>
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
    text: {
        color: '#083316', fontSize: 20, marginBottom: 8
    },
    inputContainer: {
        marginBottom: 20,
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
      },
      button: {
        backgroundColor: "#172c42",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
      },
      radioButtons: {
        display:'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'space-evenly',
        marginHorizontal: 2,
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
      timeContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 4,
      }
  });