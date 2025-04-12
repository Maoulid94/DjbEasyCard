import { Ionicons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import DropDownPicker from "react-native-dropdown-picker";
import { useTheme } from "./ThemeContext";
import Loading from "./Loading";
import { API_URL } from "@/constants/variables";
import verifyApiKey from "@/constants/Valid_API_KEY";
import { useRouter } from "expo-router";

export default function AddCard() {
  const router = useRouter();
  const { colors } = useTheme();
  const [code, setCode] = useState<string>("");
  const [cardType, setCardType] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState<string>("");

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "500 FDJ", value: "500" },
    { label: "1000 FDJ", value: "1000" },
    { label: "2000 FDJ", value: "2000" },
    { label: "5000 FDJ", value: "5000" },
    { label: "10000 FDJ", value: "10000" },
  ]);

  const inputRef = useRef<TextInput>(null);
  const handleClear = () => {
    setCode("");
    setCardType("");
  };

  const handleAddCard = async () => {
    const apiKey = await SecureStore.getItemAsync("API-KEY");
    if (!apiKey) {
      Alert.alert("Error", "API key not found. Please log in again.");
      return;
    }
    // const isValidKey = await verifyApiKey(apiKey);
    // if (!isValidKey) {
    //   Alert.alert("Invalid API Key", " Please log in again.");
    //   await SecureStore.deleteItemAsync("API-KEY");
    //   router.replace("/(auth)/Login");
    //   return;
    // }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/cards?apiKey=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, cardType }),
      });

      const result = await response.json();

      if (!response.ok) {
        Alert.alert("Error:", result.message);
        console.log("Error:", result.message);

        return;
      }
      Alert.alert("Success", "Card added successfully!");
    } catch (error: any) {
      console.log("Fetch Error:", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.addIcon, { backgroundColor: colors.BG_TINT }]}
        onPress={() => {
          setModalVisible(true);
          setTimeout(() => inputRef.current?.focus(), 300);
        }}
      >
        <Ionicons name="add" size={24} color={colors.TEXT} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={[
            styles.addModalContent,
            { backgroundColor: colors.BG_CONTENT },
          ]}
        >
          <View
            style={[styles.addModalBox, { backgroundColor: colors.BG_CARD }]}
          >
            <Text style={[styles.addModalText, { color: colors.TEXT }]}>
              Add a new Card
            </Text>
            {error ? (
              <Text style={{ color: "red", marginTop: 5 }}>{error}</Text>
            ) : null}
            <TextInput
              ref={inputRef}
              placeholder="Enter the Code"
              style={[
                styles.addModalTextInput,
                {
                  color: colors.TEXT,
                  backgroundColor: colors.BG_CONTENT,
                  borderColor: error ? colors.ERROR_MESSAGE : colors.TEXT_GRAY,
                },
              ]}
              value={code}
              onChangeText={(text) => {
                if (text.length === 0) setError("Value is required ");
                else if (text.length !== 12)
                  setError("Code is Invalid, must be 12 characters");
                else setError("");
                setCode(text);
              }}
            />
            <DropDownPicker
              open={open}
              value={cardType}
              items={items}
              setOpen={setOpen}
              setValue={setCardType}
              setItems={setItems}
              placeholder="Select Card Type"
              containerStyle={{ width: "100%", marginBottom: 15 }}
              style={{
                backgroundColor: colors.BG_CONTENT,
                borderColor: colors.TEXT_GRAY,
              }}
              dropDownContainerStyle={{
                backgroundColor: colors.BG_CONTENT,
                borderColor: colors.TEXT_GRAY,
              }}
              textStyle={{ color: colors.TEXT }}
            />
            <Loading visible={loading} />
            <TouchableOpacity
              onPress={async () => {
                await handleAddCard();
                handleClear();
                setModalVisible(false);
              }}
              style={[
                styles.addModalButton,
                { backgroundColor: colors.BG_TINT },
              ]}
            >
              <Text style={[styles.submitText, { color: colors.TEXT }]}>
                Submit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleClear();
                setModalVisible(false);
              }}
              style={[styles.cancelButton, { backgroundColor: colors.BG_TINT }]}
            >
              <Text style={[styles.cancelText, { color: colors.TEXT }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  addIcon: {
    width: 45,
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 15,
    bottom: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  addModalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  addModalBox: {
    width: 300,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  addModalText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  addModalTextInput: {
    width: "100%",
    borderWidth: 1,
    padding: 8,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  addModalButton: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#158BBF",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  cancelButton: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#FF3B30",
    alignItems: "center",
    width: "100%",
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    overflow: "hidden",
  },
  submitText: { fontSize: 18, fontWeight: "bold" },
  cancelText: { fontSize: 18, fontWeight: "bold" },
});
