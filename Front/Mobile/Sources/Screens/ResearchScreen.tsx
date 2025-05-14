import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import NavBar from '../Components/Navbar';
import { NavigationProp } from '@react-navigation/native';
// import CreateApplet from './CreateAppletScreen';


const { width } = Dimensions.get('window');

type ResearchProps = {
    navigation: NavigationProp<Record<string, object>>;
};

let id: string = "0";
let code: string = "0";

function ResearchScreen({ navigation }:ResearchProps) {
    const boxes = ['Automatically save public track by artist you follow', 'Automatically sync your Soundcloud likes to your Spotify', 'Automatically create a Disciver Weekly archive'];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Research</Text>
            <NavBar id={id} code={code} index={2} navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222222',
        flex: 1,
    },
    title: {
        fontSize: 24,   
        fontWeight: "700",
        marginVertical: 10,
        color: 'white',
        margin: "5%",
    },
});

export default ResearchScreen;