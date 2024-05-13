import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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
  return <WebView source={{ uri: url }} style={{ flex: 1 }} />;
};

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
