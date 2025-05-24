/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, ScrollView, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../../services/api";

export default function EditProfile() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        console.log("EditProfile - User token:", userToken); // Debug log

        if (!userToken) {
          Alert.alert("Error", "No user logged in");
          router.push("/contact-details/login");
          return;
        }

        const res = await api.get("/users");
        const users = res.data;
        const currentUser = users.find(
          (u) => u.email.toLowerCase() === userToken.toLowerCase()
        );

        if (currentUser) {
          setName(currentUser.name);
          setEmail(currentUser.email);
          setUserId(currentUser.id);
        } else {
          Alert.alert("Error", "User not found");
          router.push("/contact/settings");
        }
      } catch (err) {
        console.error("EditProfile - Failed to fetch user:", err.response ? err.response.data : err.message);
        Alert.alert("Error", "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert("Validation", "Name and email are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Validation", "Please enter a valid email address");
      return;
    }

    setSaving(true);
    try {
      const updatedUser = {
        name: name.trim(),
        email: email.trim(),
        // Preserve other fields by fetching the current user and merging
        avatar: `https://i.pravatar.cc/150?u=${name.trim()}`,
        createdAt: new Date().toISOString(),
      };

      // Update the user in MockAPI
      await api.put(`/users/${userId}`, updatedUser);
      console.log("EditProfile - User updated:", updatedUser); // Debug log

      // Update the userToken if email changed
      if (email.trim().toLowerCase() !== (await AsyncStorage.getItem("userToken")).toLowerCase()) {
        await AsyncStorage.setItem("userToken", email.trim());
      }

      Alert.alert("Success", "Profile updated successfully");
      router.push("/contact/settings");
    } catch (err) {
      console.error("EditProfile - Failed to update user:", err.response ? err.response.data : err.message);
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-10">
      <View className="flex-1 mb-5 mt-10">
        <Text className="text-lg font-bold text-black mb-4">Edit Profile</Text>
        <Text className="text-sm text-gray-600 mb-2">Name</Text>
        <TextInput
          className="border border-gray-300 rounded p-2 mb-4"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor="#9CA3AF"
        />
        <Text className="text-sm text-gray-600 mb-2">Email</Text>
        <TextInput
          className="border border-gray-300 rounded p-2 mb-4"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Enter your email"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
        />
        <Pressable
          className={`p-3 rounded-lg items-center ${saving ? "bg-blue-300" : "bg-blue-500"}`}
          onPress={handleSave}
          disabled={saving}
        >
          <Text className="text-white text-base">{saving ? "Saving..." : "Save"}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}