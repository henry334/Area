import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert, Image, Animated, Easing, ScrollView } from 'react-native';
import NavBar from './../Components/Navbar';
import { NavigationProp } from '@react-navigation/native';
import { apiGET, apiPOST, apiPOSTDelete } from '../Components/apiHelper';

const { width } = Dimensions.get('window');

type ActivitiesProps = {
    navigation: NavigationProp<Record<string, object>>;
};

let id: string = "0";
let code: string = "0";

function ActivitiesScreen({ navigation }: ActivitiesProps) {

    const [activities, setActivities] = useState<string[]>([]);

    const rotateValue = useState(new Animated.Value(0))[0];

    const shouldRotateRef = useRef(false);

    const spin = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const data = await apiGET('/task/mytasks');
                setActivities(data); // Assuming the response is an array of strings.
            } catch (error) {
                console.error("Error fetching activities:", error);
            }
        };

        fetchActivities();
    }, []);

    const startRotation = () => {
        shouldRotateRef.current = true;
        rotateValue.setValue(0);  // Reset rotation value to 0
    
        Animated.timing(rotateValue, {
            toValue: 1,
            duration: 1000,  // Complete rotation in 1 second
            useNativeDriver: true
        }).start(() => {
            if (shouldRotateRef.current) {
                startRotation();  // Only continue if shouldRotate is true
            }
        });
    };
    
    
    const stopRotation = () => {
        shouldRotateRef.current = false;   // Set the flag to false to stop the recursive loop
        rotateValue.stopAnimation(); // Stop the animation
    };
    
    

    const ActivitiesPress = async (activity: {name: string}) => {
        startRotation(); // Start the rotation
    
        Alert.alert(
            "Do you want to delete " + activity.name + "?",
            "This action will delete " + activity.name + " permanantly.",
            [
                { text: "Delete", onPress: () => { stopRotation(); deleteActivity(activity); } },
                { text: "Cancel", onPress: () => { stopRotation(); console.log("Cancelled"); } },
            ],
            { cancelable: false, onDismiss: () => stopRotation() }
        );
    };
    

    const deleteActivity = async (activity) => {
        try {
            
            console.log("activity", activity.id);
            const response = await apiPOSTDelete('/task/delete/' + activity.id);
            console.log(response); // To see the response data, you can remove it if you don't need it

            const fetchActivities = async () => {
                try {
                    const data = await apiGET('/task/mytasks');
                    setActivities(data); // Assuming the response is an array of strings.
                } catch (error) {
                    console.error("Error fetching activities:", error);
                }
            };

            fetchActivities();

        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    return (
        <View style={styles.container}>
        <ScrollView style={styles.scroll}>
            <Text style={styles.title}>Activities</Text>

            {activities.map((activity, index) => (
                <View key={index} style={styles.box}>
                    <View style={styles.contentWrapper}>
                        <View style={styles.activityDetails}>
                            <Text style={styles.boxText}>Activities name: {activity.name}</Text>
                            <Text style={styles.boxText}>ID of the trigger: {activity.triggerName}</Text>
                            <Text style={styles.boxText}>ID of the action: {activity.actionName}</Text>
                        </View>
                        <TouchableOpacity onPress={() => ActivitiesPress(activity)} style={styles.iconContainer}>
                            <Animated.Image 
                                    source={require('./../../assets/trash.png')} 
                                    style={[styles.icon, { transform: [{ rotate: spin }] }]} 
                                />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
            </ScrollView>



            <NavBar id={id} code={code} index={4} navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222222',
        flex: 1,
    },
    scroll: {
        marginBottom : "20%",
    },
    title: {
        fontSize: 24,   
        fontWeight: "700",
        marginVertical: 10,
        color: 'white',
        margin: "5%",
    },
    box: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    contentWrapper: {
        flexDirection: 'row',
        alignItems: 'stretch',  // This makes the children stretch vertically
        justifyContent: 'space-between'
    },
    activityDetails: {
        flex: 1,   // This makes the activityDetails take up all available space
    },
    boxText: {
        color: 'black',
        fontSize: 16,
    },
    iconContainer: {
        alignSelf: 'flex-end',  // This aligns the trash icon to the bottom
        marginLeft: 10  // Add some left margin to space it away from the text
    },
    icon: {
        width: 25,
        height: 25,
    },
});

export default ActivitiesScreen;
