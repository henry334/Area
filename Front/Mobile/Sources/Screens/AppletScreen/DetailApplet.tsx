import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, ScrollView, SafeAreaView, TextInput, Image, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { apiGET, apiPOST } from '../../Components/apiHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Use } from 'react-native-svg';
import DateTimePicker from '@react-native-community/datetimepicker'; // Add this import for date/time pickers

const { width, height } = Dimensions.get('window');

const DetailApplet = ({ route,  navigation }: any) => {

    const { title, color, description, logo, data, temp } = route.params;

    const processData = (data) => {
        const dropdowns: any[] = [];  // Declare dropdowns as an array of any type
        const texts: string[] = [];
        const renderValue: string[] = [];
        const returnValue: string[] = [];
        const date: string[] = [];
        const time: string[] = [];
        
        data.toSend.forEach((item) => {
            if (item.dropdown) {
                dropdowns.push(item.dropdown);
                if (item.dropdown.render) {
                    renderValue.push(item.dropdown.render);
                }
                if (item.dropdown.return) {
                    returnValue.push(item.dropdown.return);
                }
            } else if (item.text) {
                texts.push(item.text);
            } else if (item.date) {
                date.push(item.date);
            } else if (item.time) {
                time.push(item.time);
            }
        });
        
        return { dropdowns, texts, renderValue, returnValue, date, time };
    };
    

    const result = processData(data);
    console.log(result.dropdowns); // Outputs all dropdown objects
    console.log(result.texts);     // Outputs all text objects
    console.log("render " + result.renderValue); // Outputs render value
    console.log("return " + result.returnValue); // Outputs return valueé
    console.log("date " + result.date); // Outputs return valueé
    console.log("time " + result.time); // Outputs return valueé

    const [selectedValues, setSelectedValues] = useState<(string | null)[]>(result.dropdowns.map(() => null));
    
    const [textInputs, setTextInputs] = useState<string[]>(result.texts.map(() => ''));

    const [placeHolder, setplaceHolder] = useState('');
    

    const handleContinue = async () => {
        let taskData = {};
    
        // Process dropdown selections
        result.dropdowns.forEach((dropdown, index) => {
            const keyName = result.returnValue[index];
            // task[jeyName] is equal to the selected value with the name result.return[index]
            taskData[keyName] = selectedValues[index];
        });
    
        // Process text input values
        result.texts.forEach((textItem, index) => {
            const keyName = textItem.return;
            taskData[keyName] = textInputs[index];
        });

        result.date.forEach((dateItem, index) => {
            const keyName = dateItem.return;
            const year = dates[index].year;
            taskData[keyName] = year + '-' + dates[index].month + '-' + dates[index].day;
        });

        result.time.forEach((timeItem, index) => {
            const keyName = timeItem.return;
            const hour = times[index].hour < 10 ? `0${times[index].hour}` : times[index].hour;
            taskData[keyName] = hour + ':' + times[index].minute;
        });
    
        console.log("taskData:", taskData);
        console.log("selectedValue", selectedValues);
        console.log("textInputs", textInputs);
        if (temp === 2) {
            await AsyncStorage.setItem('selectedTriggerName', data.name);
            await AsyncStorage.setItem('selectedTrigger', JSON.stringify(taskData));
            navigation.navigate('IfThisThenThatPage', { Trigger: data.name, Action: null });
        } else {
            await AsyncStorage.setItem('selectedActionName', data.name);
            await AsyncStorage.setItem('selectedAction', JSON.stringify(taskData));
            navigation.navigate('IfThisThenThatPage', { Trigger: null, Action: data.name });
        }
    }

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedDay, setSelectedDay] = useState(new Date().getDate());
    const [selectedHour, setSelectedHour] = useState(new Date().getHours());
    const [selectedMinute, setSelectedMinute] = useState(new Date().getMinutes());

  
    const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    const [dates, setDates] = useState(result.date.map(() => {
        return {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate()
        };
    }));

    const handleDateChange = (value, index, type) => {
        setDates(prevDates => {
            const newDates = [...prevDates];
            newDates[index] = { ...newDates[index], [type]: value };
            return newDates;
        });
    };

    const [times, setTimes] = useState(result.time.map(() => {
        return {
            hour: new Date().getHours(),
            minute: new Date().getMinutes()
        };
    }));

    const handleTimeChange = (value, index, type) => {
        setTimes(prevTimes => {
            const newTimes = [...prevTimes];
            newTimes[index] = { ...newTimes[index], [type]: value };
            return newTimes;
        });
    };
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
            <View style={[styles.header, { backgroundColor: color }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('./../../../assets/backArrow.png')} style={styles.arrow} />
                </TouchableOpacity>
            </View>
            <View style={[styles.mainContainer, { backgroundColor: color }]}>
            <Image source={{ uri: logo }} style={styles.icon} />
                <Text style={styles.name}>{title}</Text>
                <Text style={styles.description}>{data ? data.description : 'Default'}</Text>
            </View>
            {/* <ScrollView
            showsVerticalScrollIndicator={false }> */}
            { 
                    result.dropdowns.map((dropdown, dropdownIndex) => (
                        <View style={styles.pickerWrapper} key={dropdownIndex}>
                            <Picker 
                                style={styles.pickers}
                                selectedValue={selectedValues[dropdownIndex]}
                                onValueChange={(value) => {
                                    setSelectedValues(prev => {
                                        const newArr = [...prev];
                                        newArr[dropdownIndex] = value;
                                        return newArr;
                                    });
                                }}
                            >
                                <Picker.Item label="Choose a value" value={null} />
                                {dropdown.choices.map((choice, choiceIndex) => {
                                    return (
                                        <Picker.Item 
                                            key={choiceIndex} 
                                            label={choice.render}
                                            value={choice.return}
                                        />
                                    );
                                })}
                            </Picker>
                        </View>
                    ))
                }

                {
                    result.texts.map((textItem, textIndex) => (
                        <TextInput
                            key={textIndex}
                            style={styles.textInput}
                            placeholder={textItem.placeholder}
                            value={textInputs[textIndex]}
                            onChangeText={value => {
                                setTextInputs(prev => {
                                    const newArr = [...prev];
                                    newArr[textIndex] = value;
                                    return newArr;
                                });
                            }}
                        />
                    ))
                }
                {result.date.map((_, dateIndex) => (
                    <View key={dateIndex} style={styles.pickerContainer}>
                        <Picker
                            selectedValue={dates[dateIndex].year}
                            style={styles.picker}
                            onValueChange={(itemValue) => handleDateChange(itemValue, dateIndex, 'year')}
                        >
                            {years.map((year, index) => (
                                <Picker.Item key={index} label={`${year}`} value={year} />
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={dates[dateIndex].month}
                            style={styles.pickerMonth}
                            onValueChange={(itemValue) => handleDateChange(itemValue, dateIndex, 'month')}
                        >
                            {months.map((month, index) => (
                                <Picker.Item key={index} label={`${month}`} value={month} />
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={dates[dateIndex].day}
                            style={styles.pickerDay}
                            onValueChange={(itemValue) => handleDateChange(itemValue, dateIndex, 'day')}
                        >
                            {days.map((day, index) => (
                                <Picker.Item key={index} label={`${day}`} value={day} />
                            ))}
                        </Picker>
                    </View>
                ))}
                {result.time.map((_, timeIndex) => (
                <View key={timeIndex} style={styles.pickerContainer}>
                    <Picker
                        selectedValue={times[timeIndex].hour}
                        style={styles.picker}
                        onValueChange={(itemValue) => handleTimeChange(itemValue, timeIndex, 'hour')}
                    >
                        {hours.map((hour, index) => (
                            <Picker.Item key={index} label={`${hour}`} value={hour} />
                        ))}
                    </Picker>
                    <Picker
                        selectedValue={times[timeIndex].minute}
                        style={styles.picker}
                        onValueChange={(itemValue) => handleTimeChange(itemValue, timeIndex, 'minute')}
                    >
                        {minutes.map((minute, index) => (
                            <Picker.Item key={index} label={`${minute}`} value={minute} />
                        ))}
                    </Picker>
                </View>
            ))}
            <TouchableOpacity 
                style={styles.continueButton} 
                onPress={handleContinue}
                >
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
        {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    scrollContainer: {
        // flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
    },
    picker: {
        width: 120,
        marginHorizontal: 5,  // Add space between pickers
    },
    pickerDay: {
        width: 100,
        marginHorizontal: 5,  // Add space between pickers
    },
        pickerMonth: {
        width: 100,
        marginHorizontal: 5,  // Add space between pickers
    },
    textInput: {
        backgroundColor: 'white',
        borderColor: '#ddd',
        padding: 10,
        fontSize: 16,
        borderRadius: 10,
        marginBottom: 15,
        width: "80%",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
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
    width: 75,
    height: 75,
    },
    mainContainer: {
        width: '100%',
        height: '38%',
        alignItems: 'center', // centers children horizontally
    },
    mainBox: {
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
    continueButton: {
        marginTop: 30,
        padding: 15,
        backgroundColor: 'rgb(16 46 149)', // Green color
        borderRadius: 50,
        elevation: 3, // adds shadow on Android
        shadowOffset: { width: 1, height: 1 }, // adds shadow on iOS
        shadowOpacity: 0.3, // adds shadow on iOS
        shadowRadius: 2, // adds shadow on iOS
        width: '80%',
        height: 60,
      },
    continueButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
      },
      pickerWrapper: {
        width: '80%',
        // height: 50,
        borderRadius: 10,
        backgroundColor: 'white',
        overflow: 'hidden',  // this ensures the borderRadius is applied properly
        marginBottom: '5%',
    },
    
    pickers: {
        width: '100%',
    },
});

export default DetailApplet;
