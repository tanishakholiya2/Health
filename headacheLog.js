import { db } from "./firebase";
import { doc, collection, addDoc, setDoc } from "firebase/firestore"; 
import { useState } from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import TimePicker from 'react-time-picker'
import RadioGroup from 'react-native-radio-buttons-group'; 
import MultiSelect from 'react-native-multiple-select';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import { format } from 'date-fns'
import Select from 'react-select'
import { onSelectionChange } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";



export default function HeadacheLog({route, navigation}) {
    const [headacheFields, setHeadacheFields] = useState(route.params.headacheFields);
    const [id, setId] = useState("");
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setId(uid);
            console.log(id);
        }
      });
    console.log(headacheFields);
    const radioButtonsData = [{id: '1', label: 'sinus', value: 'sinus'}, 
    {  id: '2', label: 'tmj', value: 'tmj' }, {  id: '3', label: 'cluster', value: 'cluster' }, 
    {  id: '4', label: 'tension', value: 'tension' }, {  id: '5', label: 'neck', value: 'neck' },
    {  id: '6', label: 'migraine', value: 'migraine' } ];
    const triggers = [{value: 'exercise', label: 'exercise'},{value: 'sun', label: 'sun'}, 
     { value: 'lack of sleep', label: 'lack of sleep'}, { value: 'stress', label: 'stress'}, 
      { value: 'meds', label: 'medication'}, 
      {value: 'food', label: 'food' }, {value: 'skip', label: 'skipped meals'}, 
      {value: 'smells', label: 'smells'}, { value: 'loud', label: 'loud noises' }]
      const reliefs = [{value: 'medications', label: 'medications'},{value: 'water', lable: 'water'}, 
      { value: 'sleep', label: 'sleep'}, { value: 'exercise', label: 'exercise'}, 
       { value: 'hot compress', label: 'hot compress'}, 
       {value: 'water', label: 'water' }, {value: 'cold pack', label: 'cold pack'},]
    const [radioButtons, setRadioButtons] = useState(radioButtonsData);
    const [selectedTriggers, setSelectedTriggers] = useState([]);
    const [selectedReliefs, setSelectedReliefs] = useState([]);
    
    function onSelectionsChange(selectedFruits) {
        setSelectedTriggers(selectedFruits);
        const temp = [...headacheFields];
        temp[2] = selectedFruits;
        setHeadacheFields(temp);
    }
    function onSelectionsReliefsChange(selectedFruits) {
        setSelectedReliefs(selectedFruits);
        const temp = [...headacheFields];
        temp[3] = selectedFruits;
        setHeadacheFields(temp);
    }

    function onPressRadioButton(radioButtonsArray, index) {
        setRadioButtons(radioButtonsArray);
        console.log(radioButtonsArray);
        var name = radioButtonsArray.find(({selected})=>selected===true).label;
        const temp = [...headacheFields];
        temp[index] = name;
        setHeadacheFields(temp);
        console.log(temp);
    }

    let fields = route.params.headacheFields;
    const handleChange = (index, event) => {
        if(index == 1 && headacheFields.find(({name})=>name==='Start Time')==undefined) {}
        if(index == 0 && headacheFields.find(({name})=>name==='End Time')==undefined) {}
        const temp = [...headacheFields];
        temp[index] = event;
        setHeadacheFields(temp);
    }

    const addHeadache = () => {
        try{
            const docRef = addDoc(collection(db, "logs"), {
                date: format(new Date(), 'MM/dd/yyyy'),
                id: id,
                startTime: headacheFields[0],
                endTime: headacheFields[1],
                triggers: headacheFields[2],
                reliefs: headacheFields[3],
                position: headacheFields[4],
        })
    }
        catch(e) {
            console.error(e);
        }
    }
    
    return(
        <View style={styles.container}>
        {fields.map((field, index) => {
            if(field['type']=='time') return(
                <View style={styles.container}> <Text style={styles.text}> {field['name']} </Text> 
                <TimePicker disableClock={true} onChange={(event)=>{handleChange(index, event)}}/> 
                </View>
            )
            else if(field['type'] == 'radioButton') {
              //  if(field['name' == 'Position']) {
                return(
                    <View style={styles.container}><Text style={styles.text}> {field['name']} </Text>
                 <RadioGroup 
                radioButtons={radioButtons} 
                onPress={(radioButtonsArray)=>{onPressRadioButton(radioButtonsArray, index)}} 
                layout="row"
                /> </View>
            )}
            else if(field['type'] == 'multiselect') {
                if(field['name'] == 'Triggers') {
                return(
                
                <View style={styles.container}> <Text style={styles.text}> {field['name']} </Text> 
                <Select
                    defaultValue={[]}
                    isMulti
                    name="Triggers"
                    options={triggers}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={onSelectionsChange}
                />
                
                </View>
            )
            }
            else if(field['name'] == 'Relief Measures') {
                return(
                
                <View style={styles.container}> <Text style={styles.text}> {field['name']} </Text> 
                <Select
                    defaultValue={[]}
                    isMulti
                    name="Relief Measures"
                    options={reliefs}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={onSelectionsReliefsChange}
                    style={styles.select}
                />
                
                </View>
            )
            }
            }
        })}
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={()=>{addHeadache()}} style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        </View>
        {console.log(headacheFields)}
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
      select: {
        height: '100',
      }
  });