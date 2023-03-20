import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastAndroid} from 'react-native';

export const loginUser = async (value: string) => {
  try {
    await AsyncStorage.setItem('@Beije:user', value);
  } catch (error) {
    showToast(' ❌ Login failed');
  }
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem('@Beije:user');
  } catch (error) {
    showToast(' ❌ Logout failed');
  }
};

export const showToast = (text: string) => {
  ToastAndroid.show(text, ToastAndroid.SHORT);
};

export const validateEmail = (email: string) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(email) === false) {
    return false;
  } else {
    return true;
  }
};
