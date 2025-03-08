import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { Menu, Provider as PaperProvider } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CustomIcon from "../Icon";

interface DataTypes {
  visible: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  openImagePicker: (source: "camera" | "gallery") => void;
  image: string | null;
  handleImageUpload: () => void;
  handleDeleteImage: () => void;
}
export default function ImageUploadAndExtractCode({
  visible,
  openMenu,
  closeMenu,
  openImagePicker,
  image,
  handleImageUpload,
  handleDeleteImage,
}: DataTypes) {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Scan or Upload Image</Text>
        <Menu
          visible={visible}
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
        {image && (
          <>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.extractContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handleImageUpload();
                }}
              >
                <CustomIcon size={24} color="blue" />
                <Text style={styles.buttonText}>Extract Code</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  handleDeleteImage();
                }}
              >
                <MaterialCommunityIcons
                  name="image-remove"
                  size={26}
                  color="red"
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
    height: 350,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginVertical: 10,
  },
  extractContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "92%",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "65%",
    gap: 8,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: "yellow",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
