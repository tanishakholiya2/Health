import { db } from "./firebase";
import { doc, addDoc, setDoc, getDoc, getDocs, collection } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


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
            priority: false,
        };
        let temp = [...todos]
        temp.push(todo);
        setToDos(temp);
        addInfo();
        setAdd("");
    }
    const addInfo = () => {
        if(add !== "") {
        try{
            const data = {
                title: add,
                completed: false,
                priority: false,
            } 
            const docRef = addDoc(collection(db, "users", id, "todos"), {
                data
        })
        fetchData();
    }
        catch(e) {
            console.error(e);
        }
    }
    }
    const handleChange = (index) => {
        let temp = [...todos];
        temp[index].completed = !temp[index].completed;
        setToDos(temp);
        updateInfo(index); 
    }
    const handlePriorityChange = (index) => {
        let temp = [...todos];
        temp[index].priority = !temp[index].priority;
        setToDos(temp);
        updateInfo(index); 
    }
    const updateInfo = (index) => {
    //    Alert.alert(JSON.stringify(todos[index]))
        const data = {
            title: todos[index].title,
            completed: todos[index].completed,
            priority: todos[index].priority,
        }
        const docRef = setDoc(doc(db, "users", id, "todos", todos[index].id), {
            data
        })
    }
    async function fetchData() {
        const querySnapshot = await getDocs(collection(db, "users", id, "todos"));
        const temp = [];
        querySnapshot.forEach((doc) => {
            temp.push({completed: doc.data().data.completed, title: doc.data().data.title, id: doc.id, priority: doc.data().data.priority});
        });
        setToDos(temp);   
    }
    useEffect(()=>{
            fetchData();
    }, [id])
    
    return(
        <View style={styles.container}>
        <ScrollView
            contentContainerStyle={{
                display: "flex",
                flexDirection: "column",
            }}
            keyboardDismissMode="on-drag"
        >
        <View style={styles.buttonContainer}>
        </View>
        
        {todos && todos.map((todo, index) =>
        {
            if(!todo.completed && todo.priority) {
            return(
            <View style={{display:"flex", flexDirection: "row", alignContent: "center", justifyContent: "center"}}>
            {todo.priority ? <Icon name={'star'} style={[styles.myStarStyle]} size={20} onPress={()=>{handlePriorityChange(index)}}/> : <Icon name={'star-outline'} size={20} style={[styles.myStarStyle, styles.myEmptyStarStyle]} onPress={()=>{handlePriorityChange(index)}}/> }
            <CheckBox
                title={todo.title}
                checked={todo.completed}
                onPress={()=>{
                    handleChange(index);
                }}
            />
            </View>
        )}})}
        {todos && todos.map((todo, index) =>
        {
            if(!todo.completed && !todo.priority) {
            return(
            <View style={{display:"flex", flexDirection: "row", alignContent: "center", justifyContent: "center"}}>
            {todo.priority ? <Icon name={'star'} style={[styles.myStarStyle]} size={20} onPress={()=>{handlePriorityChange(index)}}/> : <Icon name={'star-outline'} size={20} style={[styles.myStarStyle, styles.myEmptyStarStyle]} onPress={()=>{handlePriorityChange(index)}}/> }
            <CheckBox
                title={todo.title}
                checked={todo.completed}
                onPress={()=>{
                    handleChange(index);
                }}
            />
            </View>
        )}})}
        {todos && todos.map((todo, index) =>
        {
            if(todo.completed)
            return(
            <CheckBox
                key={index}
                title={todo.title}
                checked={todo.completed}
                onPress={()=>{
                    handleChange(index);
                }}
            />
        )}
            )
        }
            <TextInput variant='standard' label='Add Todo' type='text' value={add} placeholder="add a task" onChangeText={setAdd} className='textfield' size='medium' style={styles.textInput}
            />
            <View style={{justifyContent: "center", justifyText: "center"}}>
            <TouchableOpacity onPress={createTodo} disabled={add.length===0}>
                <Text style={styles.buttonText}>add</Text>
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
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10, 
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
        borderColor: "#172c42",
        borderWidth: 2,
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
      myStarStyle: {
        color: '#FDFD96',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
      },
      myEmptyStarStyle: {
        color: 'white',
      }
  });