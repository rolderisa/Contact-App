import { Stack } from "expo-router";

export default function ContactDetailsLayout() {
  console.log("ContactDetailsLayout rendered");
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="logout" />
      <Stack.Screen name="[id]" />
      <Stack.Screen name="edit-profile" />
      <Stack.Screen name="change-password" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="regional" />
      <Stack.Screen name="language" />
    </Stack>
  );
}