import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, Text, HelperText } from "react-native-paper";
import PageLayout from "../../components/PageLayout";
import { loginUser, showToast, validateEmail } from "../../utils/auth";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../App";

interface SignupProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Signup'>;
}

function Signup({ navigation }: SignupProps): JSX.Element {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  const onSignupPress = () => {
    loginUser(email);
    if (navigation.canGoBack()) {
      navigation.popToTop();
    }
    navigation.replace("Panel");
    showToast(" 🎉 Signup successfull");
  }

  const onLoginPress = () => {
    navigation.navigate("Login");
  }

  const onEmailChange = (text: string) => {
    setIsEmailValid(validateEmail(text));
    setEmail(text);
  }

  return (
    <PageLayout>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>Welcome</Text>
        <Text variant="bodyMedium" style={styles.body}>Use your email address to make a beije account</Text>
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
        <Button mode="contained" onPress={onSignupPress} disabled={!isEmailValid || !email} style={{ marginBottom: 10 }}>
          Signup
        </Button>
        <Button mode="text" onPress={onLoginPress}>
          Login
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

export default Signup;
