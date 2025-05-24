import React, { useState } from "react";
import { View, Text, Switch, ScrollView,Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Notifications() {
  const router = useRouter();
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-lg font-bold text-black mb-4">Notifications</Text>
      <View className="flex-row justify-between items-center py-3 border-b border-gray-200">
        <Text className="text-base text-black">Enable Notifications</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={isEnabled}
          trackColor={{ false: "#d3d3d3", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
        />
      </View>
      <Pressable
        className="bg-blue-500 p-3 rounded-lg items-center mt-4"
        onPress={() => router.push("/contact/settings")}
      >
        <Text className="text-white text-base">Done</Text>
      </Pressable>
    </ScrollView>
  );
}