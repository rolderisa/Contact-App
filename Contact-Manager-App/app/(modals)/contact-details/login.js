import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { api } from "../../../services/api";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Validation", "Email and password are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Validation", "Please enter a valid email address");
      return;
    }

    try {
      const res = await api.get("/users");
      const users = res.data;
      const user = users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password
      );

      if (user) {
        await AsyncStorage.setItem("userToken", email);
        console.log("Token set:", email);
        setTimeout(() => {
          router.replace("/contact");
        }, 500);
      } else {
        Alert.alert("Error", "Invalid email or password");
      }
    } catch (err) {
      console.error("Failed to login", err.response ? err.response.data : err.message);
      Alert.alert("Error", "Failed to login. Check your network or try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.circleTopLeft} />
      <View style={styles.circleBottomRight} />

      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.illustrationContainer}>
          <View style={styles.illustration}>
            <Ionicons name="person" size={40} color="#2563EB" />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={18} color="#2563EB" />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Username"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={18} color="#2563EB" />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
            />
            <Ionicons name="eye-outline" size={18} color="#9CA3AF" />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </Pressable>
        </View>

        <View style={styles.linkContainer}>
          <Pressable onPress={() => router.push("/contact-details/register")}>
            <Text style={styles.linkText}>
              No account? <Text style={styles.linkHighlight}>Sign up</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F0FF",
  },
  circleTopLeft: {
    position: "absolute",
    top: -60,
    left: -60,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(37, 99, 235, 0.1)", // light blue
  },
  circleBottomRight: {
    position: "absolute",
    bottom: -60,
    right: -60,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(37, 99, 235, 0.1)", // light blue
  },
  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 80,
    marginBottom: 40,
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 30,
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  illustration: {
    width: 80,
    height: 80,
    backgroundColor: "#F8F6FF",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  inputContainer: {
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    height: 55,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#1F2937",
    marginLeft: 10,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "100%",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  linkContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  linkText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  linkHighlight: {
    color: "#2563EB",
    fontWeight: "600",
  },
});
