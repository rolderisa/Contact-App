import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
return(
    <Tabs>
        <Tabs.Screen 
        name="contact/index"
        options={{
            title: "Contacts",
            tabBarIcon: ({ color,size }) => <Ionicons name="people" size={size} color={color} />,
            headerShown: false,
        }}
        
        
        />
        <Tabs.Screen
        name="contact/add"
        options={{
            title: "Add",
            tabBarIcon: ({ color,size }) => <Ionicons name="add-circle" size={size} color={color} />,
            headerShown: false,
        }}
          />
          <Tabs.Screen
        name="contact/profile"
        options={{
            title: "Profile",
            tabBarIcon: ({ color,size }) => <Ionicons name="person" size={size} color={color} />,
            headerShown: false,
        }}
          />
            <Tabs.Screen
        name="contact/settings"
        options={{
            title: "Settings",
            tabBarIcon: ({ color,size }) => <Ionicons name="settings" size={size} color={color} />,
            headerShown: false,
        }}
          />
          
    </Tabs>
)

}