import React from 'react';
import { auth } from './firebase';
import { db } from './firebase';
import { TextInput, Text, TouchableOpacity, StyleSheet, View, Alert, FlatList, ScrollView } from 'react-native';
import { NavigationScreenProp, NavigationParams } from "react-navigation";
import { NavigationState, RouteProp } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from 'react';
import { doc, addDoc, setDoc } from "firebase/firestore"; 
import { getDocs, getFirestore } from "firebase/firestore";
import axios from 'axios';


export default function ChatBot({navigation}) {
    const [data, setData] = useState([]);
    const apiKey = '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'
    const apiUrl = "https://api.openai.com/v1/engines/text-davinci-002/completions"
    const [textInput, setTextInput] = useState('')

    const handleSend = async () => {
        const prompt = textInput
        const response = await axios.post(apiUrl, {
            prompt: prompt,
            max_tokens: 1024,
            temperature: 0.5,
        }, {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${apiKey}`
            }
        })
        const text = response.data.choices[0].text;
        console.log(response.data.choices)
        setData([... data, {type: 'user', 'text': textInput}, {type: 'bot', 'text': text}])
        setTextInput('')
    }
    return(
        <View style={styles.container}>
 
          <Text style={styles.text}> Health Bot </Text>
          <FlatList 
            data={data}
            keyExtractor={(item, index) => index.toString()}
            style={styles.body}
            renderItem={({item}) => {
        {      console.log(item) }
                <View style={{flexDirection: 'row', padding: 10}}>
                    <Text style={{fontWeight:'bold', color: item.type === 'user' ? 'black': 'red'}}>
                        {item.type==='user' ? 'You: ': 'Bot: '}
                    </Text>
                    <Text style={styles.bot}>
                        {item.text}
                    </Text>
                </View>
            }}
          />
          <TextInput 
            placeholder="Ask me anything"
            value={textInput}
            onChangeText={(text) => setTextInput(text)}
            style={styles.input}
          />
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSend} style={styles.button}>
                <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
            </View>
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
    input: {
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
      width: "80%",
    },
    text: {
        fontWeight: "800",
        fontSize: 24,
    },
    buttonContainer: {
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
    button: {
      backgroundColor: "#172c42",
      width: "100%",
      padding: 15,
      borderRadius: 10,
      marginBottom: 30,
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
    body: {
        backgroundColor:"#b4cebd",
        width: '100%',
        margin: 10,
    },
    bot: {
        fontSize: 16,
    }
  });