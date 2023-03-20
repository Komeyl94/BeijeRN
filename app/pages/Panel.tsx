import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import PageLayout from "../components/PageLayout";
import { logoutUser, showToast } from "../utils/auth";
import { Button } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

interface PanelProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Panel'>;
}

function Panel({ navigation }: PanelProps): JSX.Element {
    const [user, setUser] = useState<string | null>();

    const getUser = async () => {
        try {
            const value = await AsyncStorage.getItem('@Beije:user');
            if (value === null) {
                onLogoutPress();
            } else {
                setUser(value);
            }
        } catch (e) {
            showToast(" ❌ Login failed");
        }
    }

    const onLogoutPress = () => {
        logoutUser();
        navigation.replace("Login");
        showToast(" 🎉 Logout successfull");
    }

    useEffect(() => {
        getUser();
    }, [navigation])

    return (
        <PageLayout>
            <View>
                <Text style={{ marginBottom: 10 }}>User logged in: {user}</Text>
                <Button mode="contained" onPress={onLogoutPress}>Logout</Button>
            </View>
        </PageLayout>
    )
}

export default Panel;