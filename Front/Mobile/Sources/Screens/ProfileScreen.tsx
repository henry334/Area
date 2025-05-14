import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    Dimensions, 
    ScrollView, 
    SafeAreaView, 
    Button,
    Alert,
    Modal,
} from 'react-native';
import NavBar from './../Components/Navbar';
import { NavigationProp } from '@react-navigation/native';
import { apiGET, apiPOST } from '../Components/apiHelper';

const { width } = Dimensions.get('window');

type ProfileProps = {
    navigation: NavigationProp<Record<string, object>>;
};

let id: string = "0";
let code: string = "0";

function ProfileScreen({ navigation }: ProfileProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState<any[]>([]);
    const [titleName, setTitleName] = useState('');

    const [customFields, setCustomFields] = useState<{ id: number; title: string; description: string }[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [activeFieldIndex, setActiveFieldIndex] = useState<number | null>(null);
  
    const addField = () => {
        setCustomFields([
          ...customFields,
          { id: customFields.length, title: '', tempTitle: '' },
        ]);
      };
    
      const updateField = (index: number, text: string) => {
        const updatedFields = customFields.map((field, idx) =>
          idx === index ? { ...field, description: text } : field
        );
        setCustomFields(updatedFields);
      };
    
      const handleTriggerPress = (index: number) => {
        setActiveFieldIndex(index);
        setModalVisible(true);
      };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiGET('/auth/me');
                setUser(data);
                console.log(user);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
    
        fetchData();
    }, []);

    const handleChangeTempTitle = (text: string) => {
        if (activeFieldIndex !== null) {
          const updatedFields = customFields.map((field, idx) =>
            idx === activeFieldIndex ? { ...field, tempTitle: text } : field
          );
          setCustomFields(updatedFields);
        }
      };
    
      const handleSubmitTitle = () => {
        if (activeFieldIndex !== null) {
          const updatedFields = customFields.map((field, idx) =>
            idx === activeFieldIndex ? { ...field, title: field.tempTitle, tempTitle: '' } : field
          );
          setCustomFields(updatedFields);
        }
        setModalVisible(false);
        setActiveFieldIndex(null);
      };
    

    return (
        <SafeAreaView style={styles.container}>
                {/* ...other components */}
                <ScrollView>
                    <Text style={styles.title}>Profile</Text>
                    <Text style={styles.label}>Username:</Text>
                    <TextInput 
                        style={styles.inputDef}
                        value={user.username}
                        onChangeText={setUsername}
                        placeholder="Enter your username"
                        placeholderTextColor="#666"
                    />

                    <Text style={styles.label}>Email Address:</Text>
                    <TextInput 
                        style={styles.inputDef}
                        value={user.email}
                        onChangeText={setEmail}
                        placeholder="Enter your email address"
                        keyboardType="email-address"
                        placeholderTextColor="#666"
                    />
                    {customFields.map((field, index) => (
                    <View key={field.id}>
                        <TouchableOpacity onPress={() => handleTriggerPress(index)}>
                        <Text style={styles.label}>{field.title || 'Choose Title'}:</Text>
                        </TouchableOpacity>
                        <TextInput
                        style={styles.input}
                        value={field.description}
                        onChangeText={(text) => updateField(index, text)}
                        placeholder="Enter field title"
                        placeholderTextColor="#666"
                        />
                    </View>
                    ))}
                    <TouchableOpacity style={styles.addFieldButton} onPress={addField}>
                    <Text style={styles.buttonText}> Add Field</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton} onPress={() => {}}>
                        <Text style={styles.buttonText}>Save Changes</Text>
                    </TouchableOpacity>
                </ScrollView>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Enter Field Title</Text>
                        <TextInput
                        style={styles.modalTextInput}
                        placeholder="Enter title name"
                        onChangeText={handleChangeTempTitle}
                        value={activeFieldIndex !== null ? customFields[activeFieldIndex].tempTitle : ''}
                        />
                        <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.modalButton} onPress={handleSubmitTitle}>
                            <Text>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                </Modal>
                <NavBar id={id} code={code} index={4} navigation={navigation} />
                </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a1a1a',  // Darker shade
        flex: 1,
    },
    textContainer: {
        paddingHorizontal: "10%",
    },
    contentBar: {
        flexGrow: 1,
        paddingBottom: 150,
        paddingTop: 10,   // Added a little padding at the top
    },
    title: {
        fontSize: 30,   // Slightly larger font size
        fontWeight: "bold",
        marginVertical: 25,   // A little more vertical margin
        color: '#f7f7f7',   // Off-white color for better readability
        textAlign: 'center',
    },
    label: {
        color: '#e0e0e0',  // Slightly brighter shade
        fontSize: 18,
        marginTop: 15,
        marginBottom: 5,  // Add spacing below the label for balanced spacing
    },
    input: {
        backgroundColor: '#f7f7f7',  // Off-white background
        padding: 12,   // Slightly more padding
        borderRadius: 7,   // Increased border-radius for modern look
        fontSize: 17,   // Slightly bigger font size
        elevation: 2,   // Add a bit of shadow for depth on Android
        shadowOffset: { width: 1, height: 1 },  // Shadow for iOS
        shadowOpacity: 0.3,  // Shadow opacity for iOS
        shadowRadius: 3,  // Shadow radius for iOS
    },
    inputDef: {
        backgroundColor: '#1a1a1a',  // Off-white background
        padding: 12,   // Slightly more padding
        color: '#f7f7f7',
        fontSize: 17,   // Slightly bigger font size
    },
    addFieldButton: {
        backgroundColor: '#555555',
        padding: 16,
        borderRadius: 7,
        alignItems: 'center',
        marginVertical: 25,
        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
    saveButton: {
        backgroundColor: 'rgb(29, 185, 84)',   // Slightly different shade of blue
        padding: 16,
        borderRadius: 7,
        alignItems: 'center',
        // marginVertical: 15,
        marginBottom: 65,
        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
    buttonText: {
        color: 'white',
        fontSize: 19,
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.4)',  // A semi-transparent background to provide a dimming effect outside the modal
    },
    modalView: {
        width: '80%', // Make the modal take 80% of the screen width
        backgroundColor: "white",
        borderRadius: 15,
        padding: 25,   // Provide more padding for better aesthetics
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalTextInput: {
        height: 50,
        width: '100%',  // Take the full width of the modal
        borderColor: '#e0e0e0',  // A soft gray color
        borderWidth: 1,
        borderRadius: 10,   // Provide a rounded border for the input
        marginBottom: 20,
        paddingHorizontal: 15,   // Padding for the text inside the input
        fontSize: 16,   // Slightly larger font size
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        width: '48%',  // Almost half the width, to allow two buttons side-by-side with some margin
        margin: 5,     // Margin to provide spacing between buttons
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#0077b6',  // A pleasant blue color
    },
    cancelButton: {
        width: '48%',
        margin: 5,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#b0b0b0',  // A neutral gray for the cancel button
    },

});

export default ProfileScreen;
