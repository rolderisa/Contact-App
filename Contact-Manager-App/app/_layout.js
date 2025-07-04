/* eslint-disable react-hooks/exhaustive-deps */
import { Stack, useRouter, useSegments } from "expo-router";
import "@/global.css";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const userToken = await AsyncStorage.getItem("userToken");
      console.log("User token:", userToken);
      setIsAuthenticated(!!userToken);
    } catch (err) {
      console.error("Failed to check auth", err);
    }
  };

  useEffect(() => {
    checkAuth().then(() => setIsMounted(true));
  }, []);

  useEffect(() => {
    if (isMounted) {
      checkAuth();
      console.log("Segments:", segments, "IsAuthenticated:", isAuthenticated);
      if (!isAuthenticated && !segments.some((seg) => seg.includes("login") || seg.includes("register"))) {
        router.replace("/contact-details/login");
      } else if (isAuthenticated && segments.some((seg) => seg.includes("login"))) {
        router.replace("/contact");
      }
    }
  }, [segments, isMounted]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(modals)/contact-details" />
    </Stack>
  );
}