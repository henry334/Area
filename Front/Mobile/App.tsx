import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Sources/Screens/HomeScreen';
import ResearchScreen from './Sources/Screens/ResearchScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack'

// import {Dashboard} from './pages/Dashboard'
// import {Services} from './pages/Services'
// import {Service} from './pages/Service'
import ActivitiesScreen from './Sources/Screens/ActivitiesScreen';
import ProfileScreen from './Sources/Screens/ProfileScreen';
import LoginScreen from './Sources/Screens/LoginScreen';
import IfThisThenThatPage from './Sources/Screens/IfThisThenThatPage';
import DetailApplet from './Sources/Screens/AppletScreen/DetailApplet';
import ChooseServiceData from './Sources/Screens/ChooseServiceData';
import ChooseService from './Sources/Screens/ChooseService';
import RegisterScreen from './Sources/Screens/RegisterScreen';
import { Text } from 'react-native';
import Temp from './temp';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="IfThisThenThatPage" component={IfThisThenThatPage} />
      <Stack.Screen name="Research" component={ResearchScreen} />
      <Stack.Screen name="Activities" component={ActivitiesScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ChooseService" component={ChooseService} />
      <Stack.Screen name="ChooseServiceData" component={ChooseServiceData} />
      <Stack.Screen name="DetailApplet" component={DetailApplet} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
