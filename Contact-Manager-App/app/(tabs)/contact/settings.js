import { useState, useEffect } from "react";
import { View, Text, Image, Switch, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../../services/api";

export default function Settings() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        console.log("Settings - User token:", userToken); // Debug log

        if (!userToken) {
          setError("No user logged in");
          setLoading(false);
          return;
        }

        const res = await api.get("/users");
        const users = res.data;
        const currentUser = users.find(
          (u) => u.email.toLowerCase() === userToken.toLowerCase()
        );

        if (currentUser) {
          setUser(currentUser);
        } else {
          setError("User not found");
        }
      } catch (err) {
        console.error("Settings - Failed to fetch user:", err.response ? err.response.data : err.message);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const settingsOptions = [
    { title: "Edit Profile", icon: "person", screen: "/contact-details/edit-profile" },
    { title: "Change Password", icon: "lock-closed", screen: "/contact-details/change-password" },
    { title: "Notifications", icon: "notifications", screen: "/contact-details/notifications" },
    { title: "Regional", icon: "globe", screen: "/contact-details/regional" },
    { title: "Language", icon: "language", screen: "/contact-details/language" },
    { title: "Logout", icon: "log-out", screen: "/contact-details/logout" },
  ];

  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-white justify-center items-center px-6">
        <Text className="text-lg text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-6">
      {/* User Profile Section */}
      <View className="flex-row items-center mb-5 mt-10">
        <Image
          source={{ uri: user.avatar || "https://i.pravatar.cc/150?img=1" }}
          className="w-10 h-10 rounded-full mr-2.5"
        />
        <View className="flex-1">
          <Text className="text-lg font-bold text-black">{user.name}</Text>
          <Pressable onPress={() => router.push("/contact-details/edit-profile")}>
            <Text className="text-blue-500 text-sm">Edit personal details</Text>
          </Pressable>
        </View>
      </View>

      {/* Dark Mode Toggle */}
      <View className="flex-row justify-between items-center py-3 border-b border-gray-200">
        <View className="flex-row items-center">
          <Ionicons name="moon" size={20} color="#000" />
          <Text className="text-base text-black ml-2.5">Dark Mode</Text>
        </View>
        <Switch
          onValueChange={toggleDarkMode}
          value={isDarkMode}
          trackColor={{ false: "#d3d3d3", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#f4f3f4" : "#f4f3f4"}
        />
      </View>

      {/* Other Settings Options */}
      {settingsOptions.map((option, index) => (
        <Pressable
          key={index}
          className="flex-row justify-between items-center py-5 border-b border-gray-200"
          onPress={() => router.push(option.screen)}
        >
          <View className="flex-row items-center">
            <Ionicons name={option.icon} size={20} color="#000" />
            <Text className="text-base text-black ml-2.5">{option.title}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#000" />
        </Pressable>
      ))}

      {/* App Version */}
      <Text className="text-center text-gray-500 mt-5 text-xs">App ver 2.0.1</Text>
    </ScrollView>
  );
}