import React from 'react';
import { AsyncStorage } from 'react-native';

export const _storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.warn("saving error", error);
        // Error saving data
    }
};