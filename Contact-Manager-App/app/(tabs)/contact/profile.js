import { View, Text, Image } from 'react-native';

export default function Profile() {
  return (
    <View className="flex-1 bg-white justify-center items-center px-6">
      <Image
        source={{ uri: 'https://via.placeholder.com/100' }}
        className="w-24 h-24 rounded-full mb-4"
      />
      <Text className="text-xl font-bold text-gray-900">Irisa Shimirwa Rolande</Text>
      <Text className="text-base text-gray-600">Full-stack Developer</Text>
      <Text className="text-sm text-gray-500 mt-2">irisa@example.com</Text>
    </View>
  );
}
