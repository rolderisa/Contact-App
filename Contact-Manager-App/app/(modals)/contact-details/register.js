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

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Validation", "Name, email, and password are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Validation", "Please enter a valid email address");
      return;
    }

    const passwordRegex = /^(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert(
        "Validation",
        "Password must be at least 8 characters long and contain at least one special character"
      );
      return;
    }

    const newUser = {
      name,
      email,
      password,
      avatar: avatar || `https://i.pravatar.cc/150?u=${name}`,
      createdAt: new Date().toISOString(),
    };

    try {
      console.log("Attempting to register user:", newUser);
      const response = await api.post("/users", newUser);
      console.log("API Response:", response.status, response.data);
      if (response.status === 201) {
        Alert.alert("Success", "Registration successful! Please login.");
        router.push("/contact-details/login");
      } else {
        throw new Error(`Unexpected status: ${response.status}`);
      }
    } catch (err) {
      console.error("Registration Error:", err.response ? err.response.data : err.message);
      Alert.alert("Error", "Failed to register. Check the console for details.");
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
        <Text style={styles.title}>Register</Text>

        <View style={styles.illustrationContainer}>
          <View style={styles.illustration}>
            <Ionicons name="home-outline" size={35} color="#2563EB" />
            <View style={styles.personIcon}>
              <Ionicons name="person" size={20} color="#2563EB" />
            </View>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={18} color="#2563EB" />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Email"
              placeholderTextColor="#6B7280"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={18} color="#2563EB" />
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Username"
              placeholderTextColor="#6B7280"
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
              placeholderTextColor="#6B7280"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="image-outline" size={18} color="#2563EB" />
            <TextInput
              style={styles.input}
              value={avatar}
              onChangeText={setAvatar}
              placeholder="Avatar URL (Optional)"
              placeholderTextColor="#6B7280"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable onPress={handleRegister} style={styles.registerButton}>
            <Text style={styles.registerButtonText}>REGISTER</Text>
          </Pressable>
        </View>

        <View style={styles.linkContainer}>
          <Pressable onPress={() => router.push("/contact-details/login")}>
            <Text style={styles.linkText}>
              Already have an account?{" "}
              <Text style={styles.linkHighlight}>Login</Text>
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
    backgroundColor: "rgba(37, 99, 235, 0.1)",
  },
  circleBottomRight: {
    position: "absolute",
    bottom: -60,
    right: -60,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(37, 99, 235, 0.1)",
  },
  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 60,
    marginBottom: 40,
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
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
    marginBottom: 25,
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 25,
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
    position: "relative",
  },
  personIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    height: 50,
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
  registerButton: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "100%",
  },
  registerButtonText: {
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
