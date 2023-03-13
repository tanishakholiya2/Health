import { db } from "./firebase";
import { useState } from 'react';


export default function Journal(fields) {
    const [mode, setMode] = React.useState('day');
    const [journalFields, setJournalFields] = useState([]);
    if(mode === 'day') {
        return(
            <>
            </>
        )
    }
}

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
//         onChangeText={(text)=>{this.setState({electricBill:text})}}
//         style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5}}
//         />
//         <TextInput
//         placeholder="Enter here" 
//         onChangeText={(text)=>{this.setState({electricBill:text})}}
//         style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//         />
//         <TextInput
//         placeholder="Enter here" 
//         onChangeText={(text)=>{this.setState({electricBill:text})}}
//         style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//         />

//         <Text style = {{color: '#083316', fontSize: 20, marginBottom: 8}}> 3 things you're looking forward to</Text>
//         <TextInput
//         placeholder="Enter here" 
//         onChangeText={(text)=>{this.setState({electricBill:text})}}
//         style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//         />
//         <TextInput
//         placeholder="Enter here" 
//         onChangeText={(text)=>{this.setState({electricBill:text})}}
//         style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//         />
//         <TextInput
//         placeholder="Enter here" 
//         onChangeText={(text)=>{this.setState({electricBill:text})}}
//         style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//         />

//         <Text style = {{color: '#083316', fontSize: 20}}> Goals for today</Text>
//         <TextInput
//         placeholder="Enter here" 
//         onChangeText={(text)=>{this.setState({electricBill:text})}}
//         style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//         />
//         <TextInput
//         placeholder="Enter here" 
//         onChangeText={(text)=>{this.setState({electricBill:text})}}
//         style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//         />
//         <TextInput
//         placeholder="Enter here" 
//         onChangeText={(text)=>{this.setState({electricBill:text})}}
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
//             onChangeText={(text)=>{this.setState({electricBill:text})}}
//             style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5}}
//             />
//             <TextInput
//             placeholder="Enter here" 
//             onChangeText={(text)=>{this.setState({electricBill:text})}}
//             style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//             />
//             <TextInput
//             placeholder="Enter here" 
//             onChangeText={(text)=>{this.setState({electricBill:text})}}
//             style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//             />
    
//             <Text style = {{color: '#083316', fontSize: 20, marginBottom: 8}}> 3 things that could have gone better today </Text>
//             <TextInput
//             placeholder="Enter here" 
//             onChangeText={(text)=>{this.setState({electricBill:text})}}
//             style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//             />
//             <TextInput
//             placeholder="Enter here" 
//             onChangeText={(text)=>{this.setState({electricBill:text})}}
//             style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//             />
//             <TextInput
//             placeholder="Enter here" 
//             onChangeText={(text)=>{this.setState({electricBill:text})}}
//             style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//             />
    
//             <Text style = {{color: '#083316', fontSize: 20}}> Positive affirmations </Text>
//             <TextInput
//             placeholder="Enter here" 
//             onChangeText={(text)=>{this.setState({electricBill:text})}}
//             style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//             />
//             <TextInput
//             placeholder="Enter here" 
//             onChangeText={(text)=>{this.setState({electricBill:text})}}
//             style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//             />
//             <TextInput
//             placeholder="Enter here" 
//             onChangeText={(text)=>{this.setState({electricBill:text})}}
//             style={{width:500, borderWidth:2, borderColor:'skyBlue', marginTop:5, marginBottom:5, marginHorizontal: 15}}
//             />
//             </View>
//         )
//         }
//     }