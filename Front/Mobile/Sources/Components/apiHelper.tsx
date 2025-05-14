import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APPS } from '@env';

const BASE_URL =  REACT_APPS;

// Function to get the stored bearer token
const getBearerToken = async (): Promise<string | null> => {
    return await AsyncStorage.getItem('authorization');
};

// Generic GET function
export const apiGET = async (endpoint: string) => {
    const bearerToken = await getBearerToken();
    console.log('Bearer token:', bearerToken);

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
            Authorization: `${bearerToken}`,
        },
    });

    if (!response.ok) throw new Error('Network response was not ok.');

    return await response.json();
};

// Generic POST function
export const apiPOST = async (endpoint: string, body: any) => {
    const bearerToken = await getBearerToken();

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${bearerToken}`,
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error('Network response was not ok.');

    return await response.json();
};

export const apiPOSTLogin = async (endpoint: any, body: any) => {
    console.log('Sending request to:', endpoint, 'with body:', body);
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        // Check if the HTTP response is okay
        if (!response.ok) {
            const errorBody = await response.text(); // or response.json() if the error response is also JSON
            throw new Error(`HTTP ${response.status}: ${errorBody}`);
        }

        const data = await response.json();
        console.log('Response received:', data);
        return data;
    } catch (error) {
        console.error('API POST error:', error);
        throw error; // Re-throwing the error to be caught by the calling function
    }
};

export const apiPOSTDelete = async (endpoint: string) => {
    const bearerToken = await getBearerToken();

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
            Authorization: `${bearerToken}`,
        },
    });

    if (!response.ok) throw new Error('Network response was not ok.');

    return await response.json();
};
 