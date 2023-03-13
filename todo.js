import { db } from "./firebase";
import { doc, addDoc, setDoc, getDoc, getDocs, collection } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import TimePicker from 'react-time-picker'
import RadioGroup from 'react-native-radio-buttons-group'; 
import MultiSelect from 'react-native-multiple-select';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import { CheckBox } from 'react-native-elements'



export default function Todo({route, navigation}) {
    const [todos, setToDos] = useState([])
    const [id, setId] = useState("");
    const [add, setAdd] = useState("");
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setId(uid);
        }
      });
    const createTodo = () => {
        const todo = {
            title: add,
            completed: false,
            id: id,
        };
        todos.push(todo);
        addInfo();
    }
    const addInfo = () => {
        try{
            const docRef = setDoc(doc(db, "todos", id), {
                todos
        })
    }
        catch(e) {
            console.error(e);
        }
    }
    const handleChange = (index) => {
        let temp = [...todos];
        temp[index].completed = !temp[index].completed;
        setToDos(temp);
        addInfo(); 
    }

    useEffect(()=>{
        async function fetchData() {
            const querySnapshot = await getDocs(collection(db, "todos"));
            let temp = [];
            querySnapshot.forEach((doc) => {
                if(doc.data().todos[0].id === id){
                    temp = doc.data().todos;
                    setToDos(temp);
                }
            });
        }
            fetchData();
    }, [id])
    
    return(
        <View style={styles.container}>
        <View style={styles.buttonContainer}>
        </View>
        
        {todos && todos.map((todo, index) =>
        {
            console.log(todo);
            return(
            <CheckBox
                title={todo.title}
                checked={todo.completed}
                onPress={()=>{
                    handleChange(index);
                }}
            />
        )}
            )
        }
        <div className='form'>
            <TextInput variant='standard' label='Add Todo' type='text' value={add} onChangeText={setAdd} className='textfield' size='medium' style={{borderWidth:'2'}}
            />
            <TouchableOpacity onPress={createTodo} disabled={add.length===0}>
                <Text style={styles.buttonText}>add</Text>
            </TouchableOpacity>
        </div>
        
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
    textInput: {
        
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
  });