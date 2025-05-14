import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, Dimensions, Button, Touchable, TouchableOpacity } from 'react-native';
import Logo from '../Components/Logo';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import this
import { apiPOSTLogin } from '../Components/apiHelper';
import { REACT_APPS } from '@env';
 
    const API_URL = REACT_APPS;

    const LoginScreen: React.FC = () => {
        const navigation = useNavigation();
        const windowWidth = Dimensions.get('window').width;
        const styles = getStyles(windowWidth);

        const [email, setEmail] = useState<string>('');
        const [password, setPassword] = useState<string>('');

        const handleLogin = async () => {
        try {

            const body = { email, password };
            const response = await fetch(`${API_URL}${"/auth/login"}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.Bearer) {
                  await AsyncStorage.setItem('authorization', 'Bearer ' + data.Bearer);
        
                  // Navigate to the HomeScreen with data after successful login
                  navigation.navigate('Home', { apiData: data });
                } else {
                    console.error('Bearer token is missing in the API response.');
                    Alert.alert('Error', 'Authentication failed. Please try again.');
                }
                
                console.log(data);
            } else {
                Alert.alert('Error', 'Incorrect email or password. Please try again.');
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };
        

    return (
        <LinearGradient 
            style={styles.container}
            colors={['#06B6D4', '#2C5282']}  // Approximate values for cyan-400 and blue-700
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <View style={styles.logoContainer} >
                <Logo color='#FFFFFF' />
            </View>
            {/* <Text style={styles.title}>TITS</Text> */}
            <Text style={styles.subtitle}>Task Integration & Technology System</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="UserName"
                    placeholderTextColor="#FFF"
                    onChangeText={setEmail}
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#FFF"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                />
                <TouchableOpacity style={styles.button}
                onPress={handleLogin}
                >
                    <Text style={styles.buttonText}> Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonRegister}
                    onPress={() => navigation.navigate("Register")} // Make sure 'Register' is the name of the route for your RegisterScreen
                    >
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient >
    );
};

const getStyles = (windowWidth: number) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,  // Assuming 1 unit in Tailwind corresponds to 4 points in React Native
        minHeight: Dimensions.get('window').height,
    },
    logoContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 22,
        marginBottom: 20,
        color: '#FFF',
        textAlign: 'center',
    },
    inputContainer: {
        alignSelf: 'center',
        width: windowWidth > 768 ? '20%' : '60%',
        textAlign: 'center',
    },   
    input: {
        height: 40,
        borderColor: '#FFF',
        borderBottomWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        color: '#FFF',
        textAlign: 'center',
    },
    button: {
        backgroundColor: 'rgb(29, 185, 84)',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        width: '50%',
        // flex: 1,
        alignSelf: 'center',
        marginTop: 10,
    },
    buttonRegister: {
        backgroundColor: '#2C5282',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        width: '75%',
        // flex: 1,
        marginTop: 20,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default LoginScreen;
    