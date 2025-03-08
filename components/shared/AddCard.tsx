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

const API_URL = Constants.expoConfig?.extra?.API_URL;

export default function AddCard() {
  const [code, setCode] = useState<string>("");
  const [cardType, setCardType] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);

  const inputRef = useRef<TextInput>(null);
  const handleFocusAndClear = () => {
    setCode("");
    setCardType("");
    inputRef.current?.focus();
  };

  const handleAddCard = async () => {
    const api = await SecureStore.getItemAsync("API-KEY");
    if (!api) {
      Alert.alert("Error", "API key not found. Please log in again.");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/cards?apiKey=${api}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, cardType }),
      });

      const result = await response.json();

      if (!response.ok) {
        Alert.alert("Error:", result.message);
        return;
      }
      Alert.alert("Success", "Card added successfully!");
    } catch (error: any) {
      console.log("Fetch Error:", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.addIcon}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Ionicons name="add" size={24} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.addModalContent}>
          <View style={styles.addModalBox}>
            <Text style={styles.addModalText}>Add a new Card</Text>
            <TextInput
              ref={inputRef}
              placeholder="Enter the Code"
              style={styles.addModalTextInput}
              value={code}
              onChangeText={setCode}
            />
            <TextInput
              placeholder="Enter Card Type"
              style={styles.addModalTextInput}
              value={cardType}
              onChangeText={setCardType}
            />
            <TouchableOpacity
              onPress={async () => {
                await handleAddCard();
                handleFocusAndClear();
                setModalVisible(false);
              }}
              style={styles.addModalButton}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleFocusAndClear();
                setModalVisible(false);
              }}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Cancel</Text>
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
    backgroundColor: "red",
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
    backgroundColor: "#A1FAFF",
    borderRadius: 12,
    alignItems: "center",
  },
  addModalText: {
    fontSize: 18,
    marginBottom: 10,
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
  submitText: { color: "white", fontWeight: "bold" },
  cancelText: { color: "white", fontWeight: "bold" },
});
