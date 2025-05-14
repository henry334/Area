import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, ScrollView, SafeAreaView, Image } from 'react-native';
import NavBar from './../Components/Navbar';
import { NavigationProp } from '@react-navigation/native';
import { apiGET } from '../Components/apiHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const t = process.env.REACT_APP;

// import CreateApplet from './CreateAppletScreen';

const { width } = Dimensions.get('window');

type HomeScreenProps = {
    navigation: NavigationProp<Record<string, object>>;
    route: any;  // Add this
  };
  
let id: string = "0";
let code: string = "0";

function HomeScreen({ navigation, route }: HomeScreenProps) {
    const apiData = route.params?.apiData;
    const boxes = ['Automatically save public track by artist you follow', 'Automatically sync your Soundcloud likes to your Spotify', 'Automatically create a Disciver Weekly archive'];

    const [services, setServices] = useState<any[]>([]);
    const [selectedTriggerService, setSelectedTriggerService] = useState<any[]>([]);
    const [selectedActionService, setSelectedActionService] = useState<any[]>([]);
    const [selectedName, setSelectedName] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [selectedLogo, setSelectedLogo] = useState<string>('');
    const [selectedOauth2url, setSelectedOauth2url] = useState<string>('');

    useEffect(() => {
        const getBearerToken = async () => {
            const data =  await AsyncStorage.getItem('authorization');
            console.log(data);

        };
        getBearerToken();
    }, []);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiGET('/actrig/getservices');
                setServices(data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
    
        fetchData();
    }, []);

    const handleService = async (service: any) => {
        try {
            console.log("env ", t);
            setSelectedColor(service.color);
            setSelectedLogo(service.logo);
            setSelectedName(service.name);
            setSelectedOauth2url(service.oauth2url);
            const dataTrigger = await apiGET('/actrig/gettriggers/' + service.name);
            setSelectedTriggerService(dataTrigger);
            const dataAction = await apiGET('/actrig/getactions/' + service.name);
            setSelectedActionService(dataAction);
        } catch (error) {
            console.error('Error selecting service:', error);
        }
    };

    const handleNavigationService = (service: any, IFTTT: string) => {
        navigation.navigate("ChooseServiceData",
        {title: selectedName, color: selectedColor, description: service.description, oauth2url:  selectedOauth2url, IFTTT: IFTTT, logo: selectedLogo});
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.title}>Let's start </Text>
    
                <View style={styles.servicesContainer}>
                    <Text style={styles.sectionHeader}>Services</Text>
                    <ScrollView 
                        horizontal={true} 
                        showsHorizontalScrollIndicator={false} 
                    >
                        {services.map((serviceBox, index) => (
                            <TouchableOpacity key={index} onPress={() => handleService(serviceBox)}>
                                <View style={[styles.box, {backgroundColor: serviceBox.color}]}>
                                    <Image source={{ uri: serviceBox.logo }} style={styles.icon} />
                                    <Text style={styles.text}></Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                
                {selectedTriggerService.length > 0 || selectedActionService.length > 0 ? (
                    <View style={styles.selectedServiceContainer}>
                        <Text style={styles.sectionHeader}>Selected Trigger</Text>
                        {selectedTriggerService.length > 0 ? (
                        selectedTriggerService.map((selectedServiceBox, index) => (
                            <TouchableOpacity key={index} onPress={() => handleNavigationService(selectedServiceBox, "Trigger")}>
                            <View style={[styles.boxServices, {backgroundColor: selectedColor}]}>
                                <Image source={{ uri: selectedLogo }} style={styles.iconServices} />
                                <Text style={styles.titleServices}>{selectedServiceBox.name}</Text>
                                <Text style={styles.descriptionServices}>{selectedServiceBox.description}</Text>
                            </View>
                            </TouchableOpacity>
                        ))
                        ) : (
                        <Text style={styles.descriptionServices}>No trigger available</Text>
                        )}
                        <Text style={styles.sectionHeader}>Selected Action</Text>
                        {selectedActionService.length > 0 ? (
                        selectedActionService.map((selectedServiceBox, index) => (
                            <TouchableOpacity key={index} onPress={() => handleNavigationService(selectedServiceBox, "Action")}>
                            <View style={[styles.boxServices, {backgroundColor: selectedColor}]}>
                                <Image source={{ uri: selectedLogo }} style={styles.iconServices} />
                                <Text style={styles.titleServices}>{selectedServiceBox.name}</Text>
                                <Text style={styles.descriptionServices}>{selectedServiceBox.description}</Text>
                            </View>
                            </TouchableOpacity>
                        ))
                        ) : (
                        <Text style={styles.descriptionServices}>No action available</Text>
                        )}

                    </View>
                ) : (
                    <Text style={styles.noServiceText}>Select a service</Text>
                )}
    
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("IfThisThenThatPage", {})}>
                    <Text style={styles.applets}>Create yours Applets</Text>
                </TouchableOpacity>
            </ScrollView>
    
            <NavBar id={id} code={code} index={1} navigation={navigation} apiData={apiData} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222222',
        flex: 1,
    },

    scrollContainer: {
    },
    title: {
        fontSize: 24,   
        fontWeight: "700",
        marginVertical: 10,
        color: 'white',
        margin: "5%",
    },
    boxText: {
        fontSize: 24,   
        fontWeight: "700",
        marginVertical: 10,
        color: 'white'
    },
    description: {
        fontSize: 16,
        marginVertical: 10,
        color: 'white',
        margin: "5%",
    },
    box: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        borderWidth: 3,
        borderRadius: 10,
        // margin: "5%",
    },
    icon: {
        marginTop: "40%",
        width: 50,
        height: 50,
    },
    iconServices: {
        margin: "5%",
        width: 30,
        height: 30,
    },
    button: {
        backgroundColor: '#2b2727',
        width: width * 0.9,
        height: 75,
        alignItems: 'center',
        borderRadius: 50,
        marginVertical: 20,
        marginBottom: 75,
        margin: "5%",
    },
    applets: {

        fontSize: 24,
        marginVertical: "6%",
        color: 'white',
    },

    text: {
        fontSize: 18,   
        fontWeight: "700",
        marginVertical: 10,
        color: 'white',
        margin: "5%",
    },
    boxContainer: {
        width: "90%",
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 15,
        marginHorizontal: "5%",
        // marginBottom: 10,
    },
    boxServices: {
        width: "90%",
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
        marginHorizontal: "5%",
        // marginBottom: 10,
    },
    servicesContainer: {
        marginVertical: 10,
    },

    selectedServiceContainer: {
        marginVertical: 10,
    },

    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: "5%",
        marginBottom: 10,
    },
    titleServices: {
        fontSize: 24,   
        fontWeight: "700",
        justifyContent: 'center',
        marginVertical: 10,
        color: 'white',
        margin: "10%",
    },
    descriptionServices: {
        fontSize: 16,   
        fontWeight: "700",
        marginVertical: 10,
        color: 'white',
        margin: "10%",
    },
    noServiceText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: "25%",
        margin: "5%",
    },
});

export default HomeScreen;
