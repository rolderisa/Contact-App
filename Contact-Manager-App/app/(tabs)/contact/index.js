import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
  TextInput,
  Text,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { api } from "../../../services/api";
import { Feather } from "@expo/vector-icons";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [search, contacts]);

  const fetchContacts = async () => {
    try {
      const res = await api.get("/contacts");
      setContacts(res.data);
      setFilteredContacts(res.data);
    } catch (err) {
      console.error("Failed to fetch contacts", err);
    } finally {
      setLoading(false);
    }
  };

  const userName = "Irisa Shimirwa Rolande";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase(); // -> "ISR"

    

  const renderContact = ({ item }) => (
    <Pressable
      className="flex-row items-center py-3 px-2 bg-white rounded-lg mb-2 shadow-sm"
      onPress={() => router.push(`/contact-details/${item.id}`)}
    >
      <Image
        source={{ uri: item.avatar || "https://via.placeholder.com/40" }}
        className="w-12 h-12 rounded-full mr-4"
      />
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-900">
          {item.name}
        </Text>
        <Text className="text-sm text-gray-600">
          {item.company || item.jobTitle}
        </Text>
      </View>
    </Pressable>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-100">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-100 pt-10 px-4 relative">
      {/* Custom Search Bar */}
      <View className="flex-row items-center bg-white p-3 rounded-full mb-4 shadow-sm">
        <Feather name="search" size={20} color="gray" className="mr-2" />
        <TextInput
          className="flex-1 text-base text-gray-800"
          placeholder="Search for people"
          value={search}
          onChangeText={setSearch}
        />
        <Pressable onPress={() => router.push("/contact/profile")}>
          <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center">
            <Text className="text-white text-sm font-semibold">{initials}</Text>
          </View>
        </Pressable>
      </View>

      {/* Contact List */}
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderContact}
      />

      {/* Floating Add Button */}
      <Pressable
        onPress={() => router.push("/contact/add")}
        className="absolute bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg"
      >
        <Feather name="plus" size={24} color="white" />
      </Pressable>
    </View>
  );
}