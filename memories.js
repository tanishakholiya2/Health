import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TextInput } from 'react-native-web';
import { useState } from 'react';


export default function Memories() {
    const [selectedImage, setSelectedImage] = React.useState(null);

    let openImagePickerAsync = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
          }
          setSelectedImage({ localUri: pickerResult.uri });
      }
    if (selectedImage !== null) {
        return (
          <View style={styles.container}>
            <Image
              source={{ uri: selectedImage.localUri }}
              style={styles.thumbnail}
            />
            <Text>
                What do you want to remember about this?
            </Text>
          </View>
        );
    }
    return(
        <View>
        <TouchableOpacity
            onPress={openImagePickerAsync}
            style={{ backgroundColor: 'blue' }}>
            <Text style={{ fontSize: 20, color: '#fff' }}>Pick a photo</Text>
        </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    thumbnail: {
      width: 300,
      height: 300,
      resizeMode: "contain"
    }
  });