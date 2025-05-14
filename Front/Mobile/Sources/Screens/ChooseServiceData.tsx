import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, ScrollView, SafeAreaView, TextInput, Image, Alert} from 'react-native';
import NavBar from '../Components/Navbar';
import { NavigationProp } from '@react-navigation/native';
import { apiGET, apiPOST } from '../Components/apiHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';
import Config from 'react-native-config';


const getBearerToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('authorization');
};

const { width, height } = Dimensions.get('window');
const ChooseServiceData: React.FC = ({ route, navigation }: any) => {

  const { title, color, description, oauth2url, IFTTT, logo } = route.params;
  const [selectedTemp, setSelectedTemp] = useState<number>(0);
  const [showWebView, setShowWebView] = React.useState(false);
  const [selectedTrigger, setSelectedTrigger] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [serviceData, setserviceData] = useState<any[]>([]); // added type any[] to the useState hook
  const [bearerToken, setBearerToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getBearerToken();
      setBearerToken(token);
    };
    fetchToken();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
        try {
            if (IFTTT === "Trigger") {
                const data = await apiGET('/actrig/gettriggers/' + title);
                setserviceData(data);
                setSelectedTemp(2);
            } else {
                const data = await apiGET('/actrig/getactions/' + title);
                setserviceData(data);
                setSelectedTemp(1);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("updated trigger", selectedTrigger);
  }, [selectedTrigger]);

  useEffect(() => {
    console.log("updated action", selectedAction);
  }, [selectedAction]);


  const handleTriggerPress = async (data) => {
    if (IFTTT === "Trigger") {
      await AsyncStorage.setItem('selectedTriggerId', data.id);
      setSelectedTrigger(data);
    } else {
      await AsyncStorage.setItem('selectedActionId', data.id);
      setSelectedAction(data);
    }
    if (oauth2url.length > 0) {
        Alert.alert(
            "Connect to " + title,
            "Do you want to connect to " + title + "?",
            [
                { text: "Connect", onPress: () => setShowWebView(true) },
                { text: "Cancel", onPress: () => navigation.navigate('DetailApplet', { title, color, description, logo, data: data, temp: selectedTemp }) },
            ],
            { cancelable: false }
        );
    } else {
        if (IFTTT === "Trigger") {
          navigation.navigate('DetailApplet', { title, color, description, logo, data: data, temp: 2 });
        } else {
          navigation.navigate('DetailApplet', { title, color, description, logo, data: data, temp: 1 });
        }
    }
  }

  if (showWebView) {
    const modifiedOauth2Url = oauth2url.replace("localhost", "10.0.2.2");
    return (
        <WebView 
            source={{ 
                uri: modifiedOauth2Url,   // Using the modified URL
                headers: {'Authorization': bearerToken }
            }}
            onNavigationStateChange={(navState) => {
                if (navState.url.includes("?code")) {
                    setShowWebView(false);
                    if (IFTTT === "Trigger") {
                      navigation.navigate('DetailApplet', { title, color, description, logo, data: selectedTrigger, temp: 2 });
                    } else {
                      navigation.navigate('DetailApplet', { title, color, description, logo, data: selectedAction, temp: 1});
                    }
                }
            }}
        />
    );
  }




  return (
      <View style={styles.container}>
          <View style={[styles.header, { backgroundColor: color }]}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image source={require('./../../assets/backArrow.png')} style={styles.arrow} />
              </TouchableOpacity>
              <Text style={styles.trigger}>Select the Applet</Text>
          </View>

          <View style={[styles.mainContainer, { backgroundColor: color }]}>
            <Image source={{ uri: logo }} style={styles.icon} />
              <Text style={styles.name}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
          </View>

          {/* Map over the triggers associated with the given service and display each */}
          {serviceData.map((data, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.triggerChoice, { backgroundColor: color }]} 
            onPress={ () => { 
            console.log("ID", data.id);
            handleTriggerPress(data)}}
          >
            <Text style={styles.textContainer}>{data.description}</Text>
          </TouchableOpacity>
        ))}

          <TouchableOpacity style={styles.triggerIdea}>
              <Text style={styles.textTrggierIdea}>Give Service Idea</Text>
          </TouchableOpacity>
      </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: 0.075 * height,
  },
  arrow: {
      tintColor: 'white',
      width: 30,
      height: 25,
      marginLeft: 20,
  },
  trigger: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 30,
  },
  icon: {
    width: 80,
    height: 81,
  },
  mainContainer: {
    width: '100%',
    height: '50%',
    alignItems: 'center', // centers children horizontally
  },
  name: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  description: {
    color: 'white',
    fontSize: 16.5,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  textContainer: {
    width: "90%",
    height: "100%",
    alignItems: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  triggerChoice: {
      width: "90%",
      height: 50,
      borderRadius: 5,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#000000",
      justifyContent: "center",
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 3,
      marginLeft: "5%",
      marginTop: 20,
  },
  triggerIdea: {
    width: "90%",
    height: 50,
    borderRadius: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    marginLeft: "5%",
    marginTop: 20,
  },
  textTrggierIdea: {
    width: "90%",
    height: "100%",
    marginLeft: "5%",
    alignItems: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
  },

});

export default ChooseServiceData;