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
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export default function UploadImageCard() {
  const [image, setImage] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const openMenu = () => setIsVisible(true);
  const closeMenu = () => setIsVisible(false);

  interface HandleImageUploadResponse {
    cardNumber: number;
    message?: string;
  }

  const getApiKey = async (): Promise<string | null> => {
    return await SecureStore.getItemAsync("API-KEY");
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

    const result = await (source === "camera"
      ? ImagePicker.launchCameraAsync({
          mediaTypes: "images",
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        })
      : ImagePicker.launchImageLibraryAsync({
          mediaTypes: "images",
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        }));

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleImageUpload = async () => {
    if (!image) {
      Alert.alert("Error", "No image selected.");
      return;
    }

    const apiKey = (await SecureStore.getItemAsync("API-KEY"));
    if (!apiKey) {
      Alert.alert("Error", "API key not found. Please log in again.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", {
        uri: image,
        type: "image/jpeg",
        name: "upload.jpg",
      } as any);
      const headers = {
        Accept: "application/json",
        "X-Fields": apiKey,
        "Content-Type": "multipart/form-data",
      };

      console.log("Uploading to API:", `${API_URL}/cards/extract`);
      console.log("Headers being sent:", headers);
      console.log("Image URI:", image);
      console.log("Image URI:", formData);

      const response = await fetch(
        `${API_URL}/cards/extract?apiKey=${apiKey}`,
        {
          method: "POST",
          // headers: {
          //   Accept: "application/json",
          //   "X-Fields": apiKey,
          //   "Content-Type": "multipart/form-data",
          // },
          headers: headers,
          body: formData,
        }
      );

      const text = await response.text();
      console.log("Raw API Response:", text);

      if (!response.ok) {
        Alert.alert(
          "Error",
          `Server responded with ${response.status}: ${text}`
        );
        console.log("Retrieved API Key:", apiKey);
        console.log("API Key Length:", apiKey.length);
        return;
      }

      const result: HandleImageUploadResponse = JSON.parse(text);
      setCardNumber(result.cardNumber);
      Alert.alert("Success", "Card number extracted!");
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

        {image && (
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
