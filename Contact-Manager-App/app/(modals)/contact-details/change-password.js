import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function ChangePassword() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSave = () => {
    // Add save logic here
    router.push("/contact/settings");
  };

  return (
    <ScrollView className="flex-1 bg-white p-10">
        <View className="flex-1  mb-5 mt-10">
      <Text className="text-lg font-bold text-black mb-4">Change Password</Text>
      <Text className="text-sm text-gray-600 mb-2">Current Password</Text>
      <TextInput
        className="border border-gray-300 rounded p-2 mb-4"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
      />
      <Text className="text-sm text-gray-600 mb-2">New Password</Text>
      <TextInput
        className="border border-gray-300 rounded p-2 mb-4"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <Pressable
        className="bg-blue-500 p-3 rounded-lg items-center"
        onPress={handleSave}
      >
        <Text className="text-white text-base">Save</Text>
      </Pressable>
      </View>
    </ScrollView>
  );
}