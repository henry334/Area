import React, { useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import CollapsibleView from '@eliav2/react-native-collapsible-view';
import { apiPOST, apiPOSTLogin } from '../Components/apiHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen: React.FC = () => {

    const navigation = useNavigation();
    const windowWidth = Dimensions.get('window').width;
    const styles = getStyles(windowWidth);
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleRegister = async () => {
        try {
            console.log('Attempting to register:', username, firstname, lastname, email);
            if (password !== confirmPassword) {
                Alert.alert('Error', 'Passwords do not match!');
                return;
            }
    
            const body = { email, password, username, firstname, lastname };
            const response = await apiPOSTLogin('/auth/register', body);
    
            // Assuming the token is returned in the body as `Bearer`
            if (response.Bearer) {
                await AsyncStorage.setItem('authorization', `Bearer ${response.Bearer}`);
                navigation.navigate('Home', { apiData: response });
            } else {
                console.error('Bearer token is missing in the API response.');
                Alert.alert('Error', 'Authentication failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };

    const [isPersonalInfoVisible, setPersonalInfoVisible] = useState(true);
    const [isAccountDetailsVisible, setAccountDetailsVisible] = useState(false);

    const togglePersonalInfo = () => {
        setPersonalInfoVisible(!isPersonalInfoVisible);
        if (isAccountDetailsVisible) setAccountDetailsVisible(false);
    };

    const toggleAccountDetails = () => {
        setAccountDetailsVisible(!isAccountDetailsVisible);
        if (isPersonalInfoVisible) setPersonalInfoVisible(false);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <LinearGradient
                style={styles.container}
                colors={['#06B6D4', '#2C5282']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                <Text style={styles.title}>Register</Text>

                <CollapsibleView
                title="Personal Information"
                arrowStyling={{ color: 'white' }}            
                style={styles.collapsibleSection}
                >
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="#FFF"
                    onChangeText={setFirstname}
                    value={firstname}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="#FFF"
                    onChangeText={setLastname}
                    value={lastname}
                />
                </CollapsibleView>

                <CollapsibleView
                title="Account Details"
                arrowStyling={{ color: 'white' }}
                style={styles.collapsibleSection}
                >
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#FFF"
                    onChangeText={setUsername}
                    value={username}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#FFF"
                    keyboardType="email-address"
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
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#FFF"
                    secureTextEntry={true}
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                />
                </CollapsibleView>

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.backButton]}
                    onPress={() => navigation.goBack()}
                    >
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
            </LinearGradient>
        </ScrollView>
    );
};

const getStyles = (windowWidth: number) => StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        minHeight: Dimensions.get('window').height,
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
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
        alignSelf: 'center',
        marginTop: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    backButton: {
        backgroundColor: '#2C5282',
    },
    collapsibleSection: {
        backgroundColor: 'transparent',
        borderColor: '#FFF',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 8,
        width: '80%',
        alignSelf: 'center',
        
    },
  });
  
  
export default RegisterScreen;
