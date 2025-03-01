import {
  Text,
  View,
  Image,
  StyleSheet,
  Alert,
  Button,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Menu, Provider as PaperProvider } from "react-native-paper";
import * as SecureStore from "expo-secure-store";

export default function UploadImageCard() {
  const [image, setImage] = useState<string>("");
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const openMenu = () => setIsVisible(true);
  const closeMenu = () => setIsVisible(false);

  interface HandleImageUploadResponse {
    cardNumber: number;
    message?: string;
  }

  const getApiKey = async () => {
    return await SecureStore.getItemAsync("API_KEY");
  };

  const openImagePicker = async (source: "camera" | "gallery") => {
    if (source === "camera") {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Camera access is required.");
        return;
      }
    } else {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Gallery access is required.");
        return;
      }
    }

    const result: ImagePicker.ImagePickerResult = await (source === "camera"
      ? ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true,
        })
      : ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true,
        }));

    if (!result.canceled) {
      const asset = result.assets[0];
      setImage(asset.uri);
      setBase64Image(asset.base64 || null);
    }
  };

  const handleImageUpload = async () => {
    if (!base64Image) {
      Alert.alert("Error", "No image selected.");
      return;
    }

    const apiKey = await getApiKey();
    if (!apiKey) {
      Alert.alert("Error", "API key not found.");
      return;
    }

    try {
      const response = await fetch(`https://your-api.com/cards/extract`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ image: base64Image }),
      });

      const result: HandleImageUploadResponse = await response.json();
      if (response.ok) {
        setCardNumber(result.cardNumber);
        Alert.alert("Success", "Card number extracted!");
      } else {
        Alert.alert("Error", result.message || "Extraction failed.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred.");
      console.error(error);
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Scan or Upload Image</Text>
        <Menu
          visible={isVisible}
          onDismiss={closeMenu}
          anchor={<Button title="Select Image" onPress={openMenu} />}
        >
          <Menu.Item
            onPress={() => {
              closeMenu();
              openImagePicker("camera");
            }}
            title="Take Photo"
          />
          <Menu.Item
            onPress={() => {
              closeMenu();
              openImagePicker("gallery");
            }}
            title="Choose from Gallery"
          />
        </Menu>

        {image && <Image source={{ uri: image }} style={styles.image} />}
        {cardNumber !== null && (
          <Text style={styles.cardNumber}>Card Number: {cardNumber}</Text>
        )}

        {base64Image && (
          <TouchableOpacity style={styles.button} onPress={handleImageUpload}>
            <Text style={styles.buttonText}>Extract Code</Text>
          </TouchableOpacity>
        )}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  cardNumber: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
