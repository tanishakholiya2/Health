import { db } from "../../firebase";
import { useState, useEffect } from 'react';
import { Button, TextInput, StyleSheet, View, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { doc, collection, addDoc, setDoc, getDoc } from "firebase/firestore"; 
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

export default function Journal({route, navigation}) {
    const [journalMorningFields, setJournalMFields] = useState(route.params.journalMorningFields);
    const [journalNightFields, setJournalNFields] = useState(route.params.journalNightFields);
    const [responses, setResponses] = useState([]);
    const [mode, setMode] = useState('day');
    let fieldsM = route.params.journalMorningFields; 
    let fieldsN = route.params.journalNightFields;
    const [id, setId] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [signedIn, setSignedIn] = useState(false);

    const clearData = () => {
        setResponses([]);
        setJournalMFields(route.params.journalMorningFields)
        setJournalNFields(route.params.journalMorningFields)
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setId(uid);
            setSignedIn(true);
        }
      });

    const handleChange = (index, event, index2) => {
        if(mode === 'day') {
            let temp = [...journalMorningFields];
            let initial = temp[index];
            if(initial.name != undefined) {
                initial = [];
                initial[index2] = event;
            }
            else {
                initial[index2] = event;
            }
            temp[index] = initial;
            setJournalMFields(temp);
            setResponses(temp);
            isDisabled(temp);
        }
        if(mode === 'night') {
            let temp = [...journalNightFields];
            let initial = temp[index];
            if(initial.name != undefined) {
                initial = [event];
            }
            else {
                initial[index2] = event;
            }
            temp[index] = initial;
            setJournalNFields(temp);
            setResponses(temp);
            isDisabled(temp);
        }
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

    const addJournal = () => {
        const temp = [];
        if(mode === "day") {
            try{
                const data = {
                    gratefulFor: journalMorningFields[0],
                    lookingForwardTo: journalMorningFields[1],
                    positiveAffs: journalMorningFields[2],
                    goals: journalMorningFields[3],
                    type: "morning",
                    date: new Date().toDateString(),
                }
                const docRef = addDoc(collection(db, "users", id, "journals"), {
                data })
            clearData()
            Alert.alert('successfully added!')
            }    
            catch(e) {
                console.error(e);
            }
        }
        else if(mode === "night") {
            try{
                const data = {
                    goodThings: journalNightFields[0],
                    goals: journalNightFields[1],
                    better: journalNightFields[2],
                    selfCare: journalNightFields[3],
                    type: "night",
                    date: new Date().toDateString(),
                }
                const docRef = addDoc(collection(db, "users", id, "journals"), {
                data })
            clearData()
            Alert.alert('successfully added!')
            }    
            catch(e) {
                console.error(e);
            }
        }
        
    }

    return(
        <>
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{
                    display: "flex",
                    flexDirection: "column",
                }}
                keyboardDismissMode="on-drag"
                automaticallyAdjustKeyboardInsets={true}
            >
            <View style={styles.buttons}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={()=>{
                    setMode('day')
                    clearData()
            }} style={styles.button}>
                    <Text style={styles.buttonText}>Day</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={()=>{    
                    setMode('night')
                    clearData()
            }} style={styles.button}>
                <Text style={styles.buttonText}>Night</Text>
            </TouchableOpacity>
            </View>
            </View>
            {mode === 'day' ? <View style={styles.container}>
            {fieldsM.map((field, index) => {
                let x = (responses[index] != undefined ? true : false)
                let x1 = false;
                let x2 = false;
                if(x) {
                    x1 = responses[index][0] != undefined ? true : false
                    if(x1) {
                        x1 = responses[index][0] != ""
                    }
                    x2 = responses[index][1] != undefined ? true : false
                    if(x2) {
                        x2 = responses[index][1] != ""
                    }
                }
                if(field['type']=='textInput3') return(
                    <View key={index}>
                    <Text style = {{color: '#083316', fontSize: 20, marginBottom: 8}}> {field['name']}</Text>
                    <TextInput
                    placeholder="Enter here" 
                    onChangeText={(text)=>handleChange(index, text, 0)}
                    style={{borderWidth:2, borderColor:'skyBlue', marginTop:5}}
                    value={responses[index] != undefined ? responses[index][0] : ""}
                    />
                    <TextInput
                    placeholder="Enter here" 
                    onChangeText={(text)=>handleChange(index, text, 1)}
                    style={{borderWidth:2, borderColor:'skyBlue', marginTop:5}}
                    value={responses[index] != undefined ? responses[index][1] : ""}
                    editable={x1}
                    />
                    <TextInput
                    placeholder="Enter here" 
                    onChangeText={(text)=>handleChange(index, text, 2)}
                    style={{borderWidth:2, borderColor:'skyBlue', marginTop:5}}
                    value={responses[index] != undefined ? responses[index][2] : ""}
                    editable={x2}
                    />
                    </View>
                )
                if(field['type']=='textInput5'){ 
                    let x3 = false;
                    let x4 = false;
                    if(x) {
                        x3 = responses[index][2] != undefined ? true : false
                        x4 = responses[index][3] != undefined ? true : false
                    }
                    return(
                    <View key={index}>
                    <Text style = {{color: '#083316', fontSize: 20, marginBottom: 8}}> {field['name']}</Text>
                    <TextInput
                    placeholder="Enter here" 
                    onChangeText={(text)=>handleChange(index, text, 0)}
                    style={{borderWidth:2, borderColor:'skyBlue', marginTop:5}}
                    value={responses[index] != undefined ? responses[index][0] : ""}
                    />
                    <TextInput
                    placeholder="Enter here" 
                    onChangeText={(text)=>handleChange(index, text, 1)}
                    style={{borderWidth:2, borderColor:'skyBlue', marginTop:5, }}
                    value={responses[index] != undefined ? responses[index][1] : ""}
                    editable={x1}
                    />
                    <TextInput
                    placeholder="Enter here" 
                    onChangeText={(text)=>handleChange(index, text, 2)}
                    style={{borderWidth:2, borderColor:'skyBlue', marginTop:5, }}
                    value={responses[index] != undefined ? responses[index][2] : ""}
                    editable={x2}
                    />
                    <TextInput
                    placeholder="Enter here" 
                    onChangeText={(text)=>handleChange(index, text, 3)}
                    style={{borderWidth:2, borderColor:'skyBlue', marginTop:5, }}
                    value={responses[index] != undefined ? responses[index][3] : ""}
                    editable={x3}
                    />
                    <TextInput
                    placeholder="Enter here" 
                    onChangeText={(text)=>handleChange(index, text, 4)}
                    style={{borderWidth:2, borderColor:'skyBlue', marginTop:5, }}
                    value={responses[index] != undefined ? responses[index][4] : ""}
                    editable={x4}
                    />
                    </View>
                )}
            })}
            </View>:<View style={styles.container}>
            {fieldsN.map((field, index) => {
                let x = (responses[index] != undefined ? true : false)
                let x1 = false;
                let x2 = false;
                if(x) {
                    x1 = responses[index][0] != undefined ? true : false
                    if(x1) {
                        x1 = responses[index][0] != ""
                    }
                    x2 = responses[index][1] != undefined ? true : false
                    if(x2) {
                        x2 = responses[index][1] != ""
                    }
                }
                if(field['type']=='textInput3') return(
                    <View key={index}>
                    <Text style = {{color: '#083316', fontSize: 20, marginBottom: 8}}> {field['name']}</Text>
                    <TextInput
                    placeholder="Enter here" 
                    onChangeText={(text)=>handleChange(index, text, 0)}
                    style={{borderWidth:2, borderColor:'skyBlue', marginTop:5}}
                    value={responses[index] != undefined ? responses[index][0] : ""}
                    />
                    <TextInput
                    placeholder="Enter here" 
                    onChangeText={(text)=>handleChange(index, text, 1)}
                    style={{borderWidth:2, borderColor:'skyBlue', marginTop:5}}
                    value={responses[index] != undefined ? responses[index][1] : ""}
                    editable={x1}
                    />
                    <TextInput
                    placeholder="Enter here" 
                    onChangeText={(text)=>handleChange(index, text, 2)}
                    style={{borderWidth:2, borderColor:'skyBlue', marginTop:5}}
                    value={responses[index] != undefined ? responses[index][2] : ""}
                    editable={x2}
                    />
                    </View>
                )
            })}</View>}
            <View style={styles.container}>
            <View style={styles.buttonContainer}>
            {!signedIn && 
            <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={styles.button}>
                <Text style={styles.buttonText}>Login to save</Text>
            </TouchableOpacity>
            }
            {signedIn && <><View>
                                <TouchableOpacity onPress={() => { addJournal(); } } style={styles.button} disabled={disabled}>
                                    <Text style={styles.buttonText}>Enter</Text>
                                </TouchableOpacity>
                            </View><View style={styles.buttonContainer}>
                                    <TouchableOpacity onPress={() => { navigation.navigate("JournalLogHome"); } } style={styles.button}>
                                        <Text style={styles.buttonText}>See previous Entries</Text>
                                    </TouchableOpacity>
                                </View></>}
            
            </View>
            </View>
            </ScrollView>
        </View>
        </>
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
    buttons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 5,
        display: "block",
        marginBottom: 10,
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
  });

// import React from 'react';
// import {Stylesheet, Text, View, TextInput, ViewStyle, 
//     TextStyle, TextInputProps, Button, Image} from 'react-native';

// export default function Journal() {
//     const [mode, setMode] = React.useState('day');
//     if(mode === 'day') {
//     return(
//         <View style={{alignItems: 'center', backgroundColor: '#b4cebd'}}>
//         <Button title="Night" onPress={()=>setMode('night')} />
//         <Text style = {{color: '#083316', fontSize: 20, marginBottom: 8}}> 3 things you're grateful for</Text>
//         <TextInput
//         placeholder="Enter here" 
//         onChangeText={(text)=>handleChange(index, text)}
//         style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5}}
//         />
//         <TextInput
//         placeholder="Enter here" 
//         onChangeText={(text)=>handleChange(index, text)}
//         style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//         />
//         <TextInput
//         placeholder="Enter here" 
//         onChangeText={(text)=>handleChange(index, text)}
//         style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//         />

//         <Text style = {{color: '#083316', fontSize: 20, marginBottom: 8}}> 3 things you're looking forward to</Text>
//         <TextInput
//         placeholder="Enter here" 
//         onChangeText={(text)=>handleChange(index, text)}
//         style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//         />
//         <TextInput
//         placeholder="Enter here" 
//         onChangeText={(text)=>handleChange(index, text)}
//         style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//         />
//         <TextInput
//         placeholder="Enter here" 
//         onChangeText={(text)=>handleChange(index, text)}
//         style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//         />

//         <Text style = {{color: '#083316', fontSize: 20}}> Goals for today</Text>
//         <TextInput
//         placeholder="Enter here" 
//         onChangeText={(text)=>handleChange(index, text)}
//         style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//         />
//         <TextInput
//         placeholder="Enter here" 
//         onChangeText={(text)=>handleChange(index, text)}
//         style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//         />
//         <TextInput
//         placeholder="Enter here" 
//         onChangeText={(text)=>handleChange(index, text)}
//         style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//         />
//         </View>
//     )
//     }
//     if(mode === 'night') {
//         return(
//             <View style={{alignItems: 'center', backgroundColor: '#b4cebd'}}>
//             <Button title="Day" onPress={()=>setMode('day')} />
//             <Text style = {{color: '#083316', fontSize: 20, marginBottom: 8}}> 3 things that went well today</Text>
//             <TextInput
//             placeholder="Enter here" 
//             onChangeText={(text)=>handleChange(index, text)}
//             style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5}}
//             />
//             <TextInput
//             placeholder="Enter here" 
//             onChangeText={(text)=>handleChange(index, text)}
//             style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//             />
//             <TextInput
//             placeholder="Enter here" 
//             onChangeText={(text)=>handleChange(index, text)}
//             style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//             />
    
//             <Text style = {{color: '#083316', fontSize: 20, marginBottom: 8}}> 3 things that could have gone better today </Text>
//             <TextInput
//             placeholder="Enter here" 
//             onChangeText={(text)=>handleChange(index, text)}
//             style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//             />
//             <TextInput
//             placeholder="Enter here" 
//             onChangeText={(text)=>handleChange(index, text)}
//             style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//             />
//             <TextInput
//             placeholder="Enter here" 
//             onChangeText={(text)=>handleChange(index, text)}
//             style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//             />
    
//             <Text style = {{color: '#083316', fontSize: 20}}> Positive affirmations </Text>
//             <TextInput
//             placeholder="Enter here" 
//             onChangeText={(text)=>handleChange(index, text)}
//             style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//             />
//             <TextInput
//             placeholder="Enter here" 
//             onChangeText={(text)=>handleChange(index, text)}
//             style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//             />
//             <TextInput
//             placeholder="Enter here" 
//             onChangeText={(text)=>handleChange(index, text)}
//             style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//             />
//             </View>
//         )
//         }
//     }