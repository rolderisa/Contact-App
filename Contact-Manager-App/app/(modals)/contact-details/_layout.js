import { Stack } from "expo-router";

export default function ContactDetailsLayout() {
  console.log("ContactDetailsLayout rendered"); // Debug log

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="logout" />
      <Stack.Screen name="[id]" /> {/* For contact details */}
    </Stack>
  );
}