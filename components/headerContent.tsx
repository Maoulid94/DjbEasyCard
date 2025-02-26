import { Text, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
interface HeaderContentType{
  title:string,
}

export default function HeaderContent({title=''}:HeaderContentType) {
  return (
    <View>
    <View>
      <Ionicons name='laptop' size={20}/>
      <Text>{title}</Text>
    </View>
    <Ionicons name='ellipsis-vertical-outline'/>
    </View>
  );
};

