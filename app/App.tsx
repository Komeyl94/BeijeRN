import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Provider as PaperProvider } from 'react-native-paper';
import { Stack } from "./pages/NavigationStack";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Panel from "./pages/Panel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutUser } from "./utils/auth";

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Panel: undefined;
};

function App(): JSX.Element {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>();

  const getIsSignedIn = async () => {
    try {
      const value = await AsyncStorage.getItem('@Beije:user');
      console.log(value);
      if (value !== null) setIsSignedIn(true);
      else setIsSignedIn(false);
    } catch (error) {
      return setIsSignedIn(false);
    }
  };

  useEffect(() => {
    getIsSignedIn();
  }, []);

  if (isSignedIn !== null) {
    return (
      <NavigationContainer>
        <PaperProvider>
          <Stack.Navigator initialRouteName={isSignedIn ? "Panel" : "Login"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Panel" component={Panel} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    );
  } else {
    return (
      <ActivityIndicator animating={true} />
    )
  }
}

export default App;
