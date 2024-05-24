import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {ConvertUrl} from "@tosspayments/widget-sdk-react-native/src/utils/convertUrl"
const HomeScreen = ({ navigation }) => {
  const [url, setUrl] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setUrl}
        value={url}
        placeholder="Enter a URL here..."
      />
      <Button
        title="Load WebView"
        onPress={() => url && navigation.navigate('WebViewScreen', { url })}
      />
    </View>
  );
};

const WebViewScreen = ({ route }) => {
  const { url } = route.params;
  console.log('URL >>:', url);

  const handleInvalidUrl = (invalidUrl) => {
    // 유효하지 않은 URL에 대한 처리
    Alert.alert('Invalid URL', `${invalidUrl} is not a valid URL. The URL does not start with http or https.`);
  };

  const handleShouldStartLoadWithRequest = (navState) => {
    const { url: newUrl } = navState;
    if (newUrl.startsWith('http://') || newUrl.startsWith('https://')) {
      console.log('URL starts with http or https:', newUrl);
      return true; // URL이 유효한 경우 true 반환
    }else if (newUrl.startsWith('intent://')) {
      console.log('Handling intent URL:', newUrl);
      urlConverter(newUrl)
      return false; // intent URL은 WebView에서 로드하지 않음
    } else {
      console.log('URL does not start with http or https:', newUrl);
      handleInvalidUrl(newUrl); // 유효하지 않은 URL에 대한 함수 호출
      return false;
    }
  };


  return (
    <WebView
      source={{ uri: url }}
      style={{ flex: 1 }}
      onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
      originWhitelist={["*"]}
    />
  );};

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="WebViewScreen" component={WebViewScreen} options={{ title: 'WebView' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const urlConverter = (url: string) => {
  const convertUrl = new ConvertUrl(url);
  if(convertUrl.isAppLink()){
    convertUrl.launchApp().then((isLaunch) => {
      if (isLaunch === false) { 
          // 앱 실행 실패시 처리 로직
      }
    });
  
  }else{
    return true;
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default App;
