import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Menu, Provider as PaperProvider } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CustomIcon from "./Icon";
import { useTheme } from "./ThemeContext";

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
  const { colors } = useTheme();
  return (
    <PaperProvider>
      <View style={[styles.container, { backgroundColor: colors.BG_CARD }]}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity
              style={[styles.imageCard, { backgroundColor: colors.BG_CONTENT }]}
              onPress={openMenu}
            >
              {!image ? (
                <View style={styles.infos}>
                  <MaterialCommunityIcons
                    name="image-plus"
                    size={26}
                    color={colors.TEXT}
                  />
                  <Text
                    style={[
                      styles.title,
                      { color: colors.TEXT, marginTop: 10 },
                    ]}
                  >
                    Scan or Upload Image
                  </Text>
                </View>
              ) : (
                <Image source={{ uri: image }} style={styles.image} />
              )}
            </TouchableOpacity>
          }
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
            <View style={styles.extractContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.BG_TINT }]}
                onPress={() => {
                  handleImageUpload();
                }}
              >
                <CustomIcon size={24} color={colors.WHITE} />
                <Text style={[styles.buttonText, { color: colors.WHITE }]}>
                  Extract Code
                </Text>
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
    height: 305,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    padding: 10,
  },
  title: {
    fontSize: 18,
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
  imageCard: { height: 230, borderRadius: 15, marginBottom: 10 },
  infos: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
});
