import React from "react";
import {  Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function Language() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white p-10">
      <Text className="text-lg font-bold text-black mb-4">Language</Text>
      <Text className="text-base text-gray-600 mb-4">Coming Soon</Text>
      <Pressable
        className="bg-blue-500 p-3 rounded-lg items-center"
        onPress={() => router.push("/contact/settings")}
      >
        <Text className="text-white text-base">Back</Text>
      </Pressable>
    </ScrollView>
  );
}