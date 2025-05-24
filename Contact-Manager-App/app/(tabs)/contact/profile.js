import { View, Text, Image, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get the user token (email) from AsyncStorage
        const userToken = await AsyncStorage.getItem("userToken");
        console.log("Profile - User token:", userToken); // Debug log

        if (!userToken) {
          setError("No user logged in");
          setLoading(false);
          return;
        }

        // Fetch users from MockAPI
        const res = await api.get("/users");
        const users = res.data;

        // Find the user with the matching email
        const currentUser = users.find(
          (u) => u.email.toLowerCase() === userToken.toLowerCase()
        );

        if (currentUser) {
          setUser(currentUser);
        } else {
          setError("User not found");
        }
      } catch (err) {
        console.error("Profile - Failed to fetch user:", err.response ? err.response.data : err.message);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

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
    <View className="flex-1 bg-white justify-center items-center px-6">
      <Image
        source={{ uri: user.avatar || "https://i.pravatar.cc/150?img=1" }}
        className="w-24 h-24 rounded-full mb-4"
      />
      <Text className="text-xl font-bold text-gray-900">{user.name}</Text>
      <Text className="text-base text-gray-600">Full-stack Developer</Text>
      <Text className="text-sm text-gray-500 mt-2">{user.email}</Text>
    </View>
  );
}