import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { NavigationProp } from '@react-navigation/native';

interface NavbarProps {
    navigation: NavigationProp<any>;
    id: string;
    code: string;
    index: number;
    apiData?: any;
}

export default class Navbar extends React.Component<NavbarProps, {}> {
    render() {
        return (
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")} style={styles.navbaritem}>
                    <Svg width="25" height="25" viewBox="0 0 25 25" fill="white">
                        <Path d="M 12.481445 0.52734375 A 0.50005 0.50005 0 0 0 12.192383 0.63183594 L 0.69238281 9.6054688 A 0.50028295 0.50028295 0 0 0 1.3076172 10.394531 L 2 9.8544922 L 2 23 A 0.50005 0.50005 0 0 0 2.5 23.5 L 9.4160156 23.5 A 0.50005 0.50005 0 0 0 9.5791016 23.5 L 15.416016 23.5 A 0.50005 0.50005 0 0 0 15.579102 23.5 L 22.5 23.5 A 0.50005 0.50005 0 0 0 23 23 L 23 9.8544922 L 23.692383 10.394531 A 0.50028285 0.50028285 0 1 0 24.307617 9.6054688 L 20.5 6.6347656 L 20.5 3 L 17.5 3 L 17.5 4.2929688 L 12.807617 0.63183594 A 0.50005 0.50005 0 0 0 12.481445 0.52734375 z M 12.5 1.6611328 L 22 9.0742188 L 22 22.5 L 16 22.5 L 16 13 L 9 13 L 9 22.5 L 3 22.5 L 3 9.0742188 L 12.5 1.6611328 z M 18.5 4 L 19.5 4 L 19.5 5.8544922 L 18.5 5.0732422 L 18.5 4 z M 10 14 L 15 14 L 15 22.5 L 10 22.5 L 10 14 z" />
                    </Svg>
                    <Text style={styles.txtnavbar}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("IfThisThenThatPage", {apiData: this.props.apiData})} style={styles.navbaritem}>
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                        <Path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                    </Svg>
                    <Text style={styles.txtnavbar}>Create</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Activities")} style={styles.navbaritem}>
                    <Svg width="20" height="25" viewBox="0 0 25 25" fill="white">
                        <Path d="M1.679,24.75 L1.679,2.225 L19.527,13.487 L1.679,24.75 L1.679,24.75 Z M20.9,12.039 L2.09,-0.218 C0.974,-0.825 0,-0.554 0,1.42 L0,25.555 C0,27.515 1.371,27.864 2.09,27.192 L20.9,14.936 C21.984,14.168 21.954,12.745 20.9,12.039 L20.9,12.039 Z" />
                    </Svg>
                    <Text style={styles.txtnavbar}>Activities</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")} style={styles.navbaritem}>
                    <Svg width="26" height="26  " viewBox="0 0 24 15" fill="white">
                        <Path d="M10.562548,16.99998 L7.4381713,16.99998 C6.7317804,16.99998 6.2101535,16.30298 6.4765813,15.66198 C7.7127655,12.69798 10.6169306,10.99998 13.9998492,10.99998 C17.3837885,10.99998 20.287954,12.69798 21.524138,15.66198 C21.790566,16.30298 21.268939,16.99998 20.562548,16.99998 M9.9166645,4.99998 C9.9166645,2.79398 11.7489936,0.99998 13.9998492,0.99998 C16.2517256,0.99998 18.0830339,2.79398 18.0830339,4.99998 C18.0830339,7.20598 16.2517256,8.99998 13.9998492,8.99998 C11.7489936,8.99998 9.9166645,7.20598 9.9166645,4.99998 M23.955674,16.63598 C23.213556,13.27698 20.892265,10.79798 17.837022,9.67298 C19.4560048,8.39598 20.400241,6.33098 20.053171,4.06998 C19.6509769,1.44698 17.4235996,-0.65202 14.7348224,-0.95802 C11.0232075,-1.38102 7.8750721,1.44898 7.8750721,4.99998 C7.8750721,6.88998 8.7692896,8.57398 10.1636971,9.67298 C7.1074334,10.79798 4.7871636,13.27698 4.044024,16.63598 C3.7745338,17.85698 4.7789973,18.99998 6.0539717,18.99998 L21.945727,18.99998 C23.221722,18.99998 24.226185,17.85698 23.955674,16.63598" />
                    </Svg>
                    <Text style={styles.txtnavbar}>Profile</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navbar: {
        width: "100%",
        height: "8%",
        backgroundColor: "#222222",
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderWidth: 1,
    },
    navbaritem: {
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    txtnavbar: {
        marginTop: 5,
        fontSize: 12,
        fontWeight: "bold",
        color: "white"
    },
});
