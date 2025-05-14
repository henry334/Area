import React, { useState, useRef }from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, SafeAreaView, Button, PanResponder } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';


const { width, height } = Dimensions.get('window');

const SCREEN_WIDTH = Dimensions.get('window').width;
  
const CreateAppletScreen = ({ navigation }: any) => {

    const [circlePosX, setCirclePosX] = useState(10); // Start position
    const panResponder = useRef(
        PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            let newPosX = circlePosX + gestureState.dx;
            if (newPosX < 10) newPosX = 10;
            if (newPosX > SCREEN_WIDTH - 60) newPosX = SCREEN_WIDTH - 60;
            setCirclePosX(newPosX);
        },
        onPanResponderRelease: () => {
            // You can add logic for when the circle is released
        },
        })
    ).current;

    return (
        <LinearGradient colors={['#A6FFCB', '#12D8FA']} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('./../../assets/backArrow.png')} style={styles.icon} />
                </TouchableOpacity>
                <Image source={require('./../../assets/favicon.png')} style={styles.icon} />
            </View>
            
            <View style={styles.mainBox}>
                <Image 
                    source={require('./../../assets/favicon.png')} 
                    style={styles.iconExampleTop} 
                />
                <Text style={styles.mainText}>Your Text Here</Text>
                <Image 
                    source={require('./../../assets/favicon.png')} 
                    style={styles.iconExampleBottom} 
                />
            </View>


            <View style={styles.slider}>
                <Text style={styles.textLeft}>Start</Text>
                <View
                {...panResponder.panHandlers}
                style={[
                    styles.circle,
                    {
                    left: circlePosX,
                    },
                ]}
                />
                <Text style={styles.textRight}>End</Text>
            </View>

            <Text>Description about the box...</Text>
            <Text>More like that</Text>
            {/* {Array(4).fill(null).map((_, index) => (
                <View key={index} style={[styles.subBox, { backgroundColor: colors[index % colors.length] }]}>
                </View>
            ))} */}
        </LinearGradient>
    );
};

const colors = ['#FFA69E', '#FF66A5', '#FF4E78', '#FF3371'];

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 0.075 * height,
        backgroundColor: 'green',
    },
    icon: {
        tintColor: 'white',
        width: 30,
        height: 25,
        marginLeft: 20,
    },
    mainBox: {
        width: '100%',
        height: '50%',
        alignItems: 'center', // centers children horizontally
        justifyContent: 'center', // centers children vertically
        backgroundColor: 'green',  // Change this to your preferred color
    },
    iconExampleTop: {
        position: 'absolute',
        top: 10,   // Adjust as needed
        left: '50%',
        transform: [{ translateX: -50 }]  // Centers the image horizontally
    },
    mainText: {
        fontSize: 24,  // Adjust as needed
        color: 'white',
        textAlign: 'center'
    },
    iconExampleBottom: {
        position: 'absolute',
        bottom: 10,   // Adjust as needed
        left: '50%',
        transform: [{ translateX: -50 }]  // Centers the image horizontally
    },
    subBox: {
        width: 0.9 * width,
        height: 0.3 * height,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    slider: {
        width: SCREEN_WIDTH - 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        padding: 10,
      },
      circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'green',
        position: 'absolute',
      },
      textLeft: {
        position: 'absolute',
        left: 10,
      },
      textRight: {
        position: 'absolute',
        right: 10,
      },
});

export default CreateAppletScreen;
