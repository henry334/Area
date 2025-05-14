import React,{ useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, TextInput, AppState } from 'react-native';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import NavBar from '../Components/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiGET, apiPOST } from '../Components/apiHelper';



let id: string = "0";
let code: string = "0";

type IfThisThenThatPageProps = {
    navigation: NavigationProp<Record<string, object>>;
    route: any;
};

function IfThisThenThatPage({ navigation, route }: IfThisThenThatPageProps) {

  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [selectedTriggerId, setSelectedTriggerId] = useState<string | null>(null);
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const [selectedTriggerName, setSelectedTriggerName] = useState<string | null>(null);
  const [selectedActionName, setSelectedActionName] = useState<string | null>(null);

  const [appletName, setAppletName] = useState<string | null>(null);

  const { Trigger, Action } = route.params;
  
  const handleContinue = async () => {
    console.log("appletName", appletName);
    console.log("selectedTriggerId", selectedTriggerId);
    console.log("selectedActionId", selectedActionId);
    console.log("selectedTrigger", selectedTrigger);
    console.log("selectedAction", selectedAction);

    try {
        const body = {
            name: appletName,
            triggerid: selectedTriggerId,
            actionid: selectedActionId,
            triggerdata: selectedTrigger,
            actiondata: selectedAction
        };
  
        const response = await apiPOST('/task/new', body);
        console.log(response);
  
    } catch (error) {
        console.error('Error posting data:', error);
    }
  };

  useEffect(() => {
      const fetchData = async () => {
        try {
          const storedTrigger = JSON.parse(await AsyncStorage.getItem('selectedTrigger') || 'null');
          const storedAction = JSON.parse(await AsyncStorage.getItem('selectedAction') || 'null');
          const storedTriggerId = await AsyncStorage.getItem('selectedTriggerId') || null;
          const storedActionId = await AsyncStorage.getItem('selectedActionId') || null;
          const storedTriggerName = await AsyncStorage.getItem('selectedTriggerName') || null;
          const storedActionName = await AsyncStorage.getItem('selectedActionName') || null;
          
          setSelectedTrigger(storedTrigger);
          setSelectedAction(storedAction);
          setSelectedTriggerId(storedTriggerId);
          setSelectedActionId(storedActionId);
          setSelectedTriggerName(storedTriggerName);
          setSelectedActionName(storedActionName);
        } catch (error) {
          console.error("Error loading values from AsyncStorage:", error);
        }
      };
    
      fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const loadSelectedValues = async () => {
        try {
          const storedTriggerValue = JSON.parse(await AsyncStorage.getItem("selectedTrigger") || "null");
          const storedActionValue = JSON.parse(await AsyncStorage.getItem("selectedAction") || "null");
          const storedActionIdValue = await AsyncStorage.getItem("selectedActionId") || null;
          const storedTriggerIdValue = await AsyncStorage.getItem("selectedTriggerId") || null;
          const storedTriggerNameValue = await AsyncStorage.getItem("selectedTriggerName") || null;
          const storedActionNameValue = await AsyncStorage.getItem("selectedActionName") || null;

          setSelectedTrigger(storedTriggerValue);
          setSelectedAction(storedActionValue);
          setSelectedTriggerId(storedTriggerIdValue);
          setSelectedActionId(storedActionIdValue);
          setSelectedTriggerName(storedTriggerNameValue);
          setSelectedActionName(storedActionNameValue);
        } catch (error) {
          console.error("Error loading values from AsyncStorage:", error);
        }
      };

      loadSelectedValues();

      return () => {}; 
    }, [])
  );

  useEffect(() => {
    const appStateListener = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        clearAsyncStorage();
      }
    });
  
    return () => {
      appStateListener.remove();
    };
  }, []);
  
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem('selectedTrigger');
      await AsyncStorage.removeItem('selectedAction');
      await AsyncStorage.removeItem('selectedTriggerId');
      await AsyncStorage.removeItem('selectedActionId');
      await AsyncStorage.removeItem('selectedTriggerName');
      await AsyncStorage.removeItem('selectedActionName');
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };

    return (
        <View style={styles.container}>
          <TextInput 
              style={styles.textInput} 
              placeholder={"Enter a name for your applet"} 
              placeholderTextColor="white"
              value={appletName || ""}
              onChangeText={text => setAppletName(text)}
            />
            <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('ChooseService', {IFTTT: "Trigger"})}>
                <Text style={styles.text}>If</Text>
                {
                  (selectedTriggerName ?? '').length > 0 ? (
                    <Text style={styles.smallText}>{selectedTriggerName}</Text>
                  ) : (
                    <Text style={styles.smallText}>Trigger</Text>
                  )
                }
            </TouchableOpacity>
            
            <View style={styles.line} />

            <TouchableOpacity style={styles.boxThen} onPress={() => navigation.navigate('ChooseService', {IFTTT: "Action"})}>
                <Text style={styles.text}>Then</Text>
                {
                  (selectedTriggerName ?? '').length > 0 ? (
                    <Text style={styles.smallText}>{selectedActionName}</Text>
                  ) : (
                    <Text style={styles.smallText}>Action</Text>
                  )
                }
            </TouchableOpacity>

        <TouchableOpacity 
          style={styles.continueButton} 
          onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
            <NavBar id={id} code={code} index={3} navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  box: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 20,
    height: 100,
    width: '80%', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -1,
    backgroundColor: '#222222',
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  boxThen: {
    borderWidth: 1,
    borderColor: '#a3a3a3',
    padding: 20,
    height: 100,
    width: '80%', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -1,
    backgroundColor: '#a3a3a3',
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white'
  },
  line: {
    height: '5%',
    width: 2,
    backgroundColor: 'black',
    marginBottom: -1,
  },
  smallText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 3,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
  },
  continueButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#222222',
    borderRadius: 50,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: '80%',
    height: 60,
  },
  continueButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  textInput: {
    backgroundColor: '#222222',
    borderColor: '#ddd',
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
    marginBottom: 15,
    width: "80%",
    color: 'white',
},
});

export default IfThisThenThatPage;
