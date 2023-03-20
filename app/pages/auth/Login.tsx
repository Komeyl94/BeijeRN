import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, Text, HelperText } from "react-native-paper";
import PageLayout from "../../components/PageLayout";
import { loginUser, showToast, validateEmail } from "../../utils/auth";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../App";
import { ToastAndroid } from "react-native/Libraries/Components/ToastAndroid/ToastAndroid";

interface LoginProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
}

function Login({ navigation }: LoginProps): JSX.Element {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  const onLoginPress = () => {
    loginUser(email);
    if (navigation.canGoBack()) {
      navigation.popToTop();
    }
    navigation.replace("Panel");
    showToast(" 🎉 Login successfull");
  }

  const onSignupPress = () => {
    navigation.navigate("Signup");
  }

  const onEmailChange = (text: string) => {
    setIsEmailValid(validateEmail(text));
    setEmail(text);
  }

  return (
    <PageLayout>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>Welcome</Text>
        <Text variant="bodyMedium" style={styles.body}>Use your email address to login to your beije account</Text>
        <TextInput
          mode="outlined"
          onChangeText={onEmailChange}
          value={email}
          keyboardType="email-address"
          inputMode="email"
          label="Email"
          placeholder="Enter your email address"
          error={!isEmailValid}
        />
        <HelperText type="error" visible={!isEmailValid} style={styles.input}>
          Email address is invalid!
        </HelperText>
        <Button mode="contained" onPress={onLoginPress} disabled={!isEmailValid || !email} style={{ marginBottom: 10 }}>
          Login
        </Button>
        <Button mode="text" onPress={onSignupPress}>
          Signup
        </Button>
      </View>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  body: {
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 20
  },
});

export default Login;
