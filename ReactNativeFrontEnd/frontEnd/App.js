import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import FormData from 'form-data';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
// import RNFetchBlob from 'rn-fetch-blob'

export default function App() {
  const [result, setResult] = useState(null);
  const [image, setImage] = useState(null);

  async function uploadImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }


  async function fetchData() {
    try {
      const data = new FormData();
      data.append('image',
        {
          uri: image,
          name: 'image.jpg',
          type: 'image/jpg'
        });

      console.log(image)

      const res = await axios.post('http://92.168.1.201:80/uploadImage', data, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }
      })
      setResult(res.data.diseased)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={uploadImage}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Upload</Text>
        </View>
      </TouchableOpacity>

      <View style={{ alignItems: 'center' }}>

        {/* {image != null ?
          (<>
            <Image source={require('file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FfrontEnd-462de508-19e3-4d90-965a-ba812dccd721/ImagePicker/3eee3fae-8ad1-4420-8b62-5ff2c178758e.jpeg')} style={{ height: 20, width: 20 }} />
            <Text>HELLO</Text>
          </>)
          : (<></>)} */}

        {/* <AntDesign name="upload" size={52} color="white" onPress={uploadImage} /> */}
        <TouchableOpacity onPress={fetchData}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Detect</Text>
          </View>
        </TouchableOpacity>
      </View>

      {result != null ?

        (<>
          {
            result == true ? (<Text style={styles.result}>
              Diseased
            </Text>)
              : (<Text style={styles.result}>
                Healthy
              </Text>)
          }
        </>)
        : (<></>)}


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 10,
    borderColor: '#0D4C92',
    borderWidth: 3,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    // alignSelf: 'flex-end'
  },
  buttonText: {
    color: '#bbbbbb',
    fontSize: 26,
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  result: {
    color: 'white'
  }
});
