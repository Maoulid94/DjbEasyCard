import { StyleSheet, Alert, View } from "react-native";
import { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import ImageUploadAndExtractCode from "@/components/shared/ImageContainer";
import AddAllCards from "@/components/shared/SaveCards";
import { useTheme } from "@/components/shared/ThemeContext";
import Loading from "@/components/shared/Loading";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export default function UploadImageCard() {
  const { colors } = useTheme();
  const [image, setImage] = useState<string>("");
  const [cardNumbers, setCardNumbers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const openMenu = () => setIsVisible(true);
  const closeMenu = () => setIsVisible(false);

  interface HandleImageUploadResponse {
    cardNumbers: number[];
    message?: string;
  }

  const HandleDeleteImage = () => {
    setImage("");
    setCardNumbers([]);
  };

  const openImagePicker = async (source: "camera" | "gallery") => {
    const permission =
      source === "camera"
        ? await Camera.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.status !== "granted") {
      Alert.alert("Permission denied", `${source} access is required.`);
      return;
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

    const apiKey = await SecureStore.getItemAsync("API-KEY");
    if (!apiKey) {
      Alert.alert("Error", "API key not found. Please log in again.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: image,
        type: "image/jpeg",
        name: "upload.jpg",
      } as unknown as Blob);

      const response = await fetch(
        `${API_URL}/cards/extract?apiKey=${apiKey}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        }
      );

      const text = await response.text();
      if (!response.ok) {
        Alert.alert(
          "Error",
          `Server responded with ${response.status}: ${text}`
        );
        return;
      }

      const result: HandleImageUploadResponse = JSON.parse(text);
      const extractNumber = result.cardNumbers?.map(Number) || [];
      setCardNumbers(extractNumber);
    } catch (error) {
      Alert.alert("Error", "An error occurred.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {}, [cardNumbers]);

  return (
    <View style={[styles.container, { backgroundColor: colors.BG_CONTENT }]}>
      <Loading visible={loading} />
      <ImageUploadAndExtractCode
        visible={isVisible}
        openMenu={openMenu}
        closeMenu={closeMenu}
        openImagePicker={openImagePicker}
        image={image}
        handleImageUpload={handleImageUpload}
        handleDeleteImage={HandleDeleteImage}
      />
      <AddAllCards cardNumbers={cardNumbers} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
});
