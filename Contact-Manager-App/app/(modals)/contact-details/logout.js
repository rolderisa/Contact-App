import React from "react";
import { Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      console.log("Token cleared on logout"); // Debug log
      router.replace("/contact-details/login");
    } catch (err) {
      console.error("Failed to logout", err);
      router.replace("/contact-details/login");
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-lg font-bold text-black mb-4">Logout</Text>
      <Text className="text-base text-gray-600 mb-4">Are you sure you want to logout?</Text>
      <Pressable
        className="bg-red-500 p-3 rounded-lg items-center mb-2"
        onPress={handleLogout}
      >
        <Text className="text-white text-base">Yes, Logout</Text>
      </Pressable>
      <Pressable
        className="bg-gray-500 p-3 rounded-lg items-center"
        onPress={() => router.push("/contact/settings")}
      >
        <Text className="text-white text-base">Cancel</Text>
      </Pressable>
    </ScrollView>
  );
}