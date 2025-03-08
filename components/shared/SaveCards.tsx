import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import DropDownPicker from "react-native-dropdown-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SubmitButton from "./ActionButtons";
import AddCard from "./AddCard";

const API_URL = Constants.expoConfig?.extra?.API_URL;

interface AddCardsProps {
  cardNumbers: number[];
}

interface CardData {
  code: string;
  cardType: string;
}

export default function AddAllCards({ cardNumbers }: AddCardsProps) {
  const [cards, setCards] = useState<CardData[]>([]);
  const [indices, setIndices] = useState<number[]>([]);
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState<number | null>(
    null
  );

  const [items, setItems] = useState([
    { label: "500 FDJ", value: "500" },
    { label: "1000 FDJ", value: "1000" },
    { label: "2000 FDJ", value: "2000" },
    { label: "5000 FDJ", value: "5000" },
    { label: "10000 FDJ", value: "10000" },
  ]);

  const handleDeleteCard = (index: number) => {
    setCards((prevCards) => prevCards.filter((_, i) => i !== index));
    setIndices((prevIndices) => prevIndices.filter((_, i) => i !== index));
  };

  // Log the cardNumbers when component mounts
  useEffect(() => {
    if (cardNumbers.length > 0) {
      setCards(
        cardNumbers.map((num) => ({
          code: String(num),
          cardType: "500",
        }))
      );
      setIndices(cardNumbers.map((_, index) => index + 1));
    }
  }, [cardNumbers]);

  const handleSaveCards = async () => {
    const apiKey = await SecureStore.getItemAsync("API-KEY");
    if (!apiKey) {
      Alert.alert("Error", "API key not found. Please log in again.");
      return;
    }
    try {
      const formattedCards = cards.map((card) => ({
        ...card,
        code: String(card.code),
      }));
      const response = await fetch(`${API_URL}/cards/all?apiKey=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cards }),
      });
      const result = await response.json();
      if (!response.ok) {
        Alert.alert(result.message);
        return;
      }
      Alert.alert("Success", "Cards added successfully!");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ position: "relative" }}>
      {cards.length > 0 && (
        <>
          <View
            style={[
              styles.listCardContainer,
              dropdownOpenIndex !== null && { zIndex: 1 },
            ]}
          >
            <FlatList
              data={cards}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View
                  style={[
                    styles.cardWrapper,
                    dropdownOpenIndex === index
                      ? { zIndex: 1000 }
                      : { zIndex: 1 },
                  ]}
                >
                  <View style={styles.cardBox}>
                    <Text style={styles.cardNbr}>Card: {indices[index]}</Text>
                    <TextInput
                      style={styles.code}
                      value={item.code.toString()}
                      onChangeText={(text) => {
                        const newCode = text.replace(/\D/g, ""); // Remove non-numeric characters
                        setCards((prevCards) =>
                          prevCards.map((card, i) =>
                            i === index ? { ...card, code: newCode } : card
                          )
                        );
                      }}
                      // keyboardType="numeric"
                    />
                    <View style={styles.cardType}>
                      <DropDownPicker
                        placeholder="Select"
                        open={dropdownOpenIndex === index}
                        value={item.cardType}
                        items={items}
                        setOpen={() =>
                          setDropdownOpenIndex(
                            dropdownOpenIndex === index ? null : index
                          )
                        }
                        setValue={(callback) => {
                          setCards((prevCards) =>
                            prevCards.map((card, i) =>
                              i === index
                                ? { ...card, cardType: callback(card.cardType) }
                                : card
                            )
                          );
                        }}
                        setItems={setItems}
                        style={styles.dropdown}
                        dropDownContainerStyle={[
                          styles.dropdownContainer,
                          dropdownOpenIndex === index
                            ? { zIndex: 1000, elevation: 10 }
                            : {},
                        ]}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => handleDeleteCard(index)}
                      style={styles.deleteButton}
                    >
                      <FontAwesome name="remove" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
          <SubmitButton
            onPressCancel={() => setCards([])}
            onPressSubmit={handleSaveCards}
          />
        </>
      )}
      <AddCard />
    </View>
  );
}

const styles = StyleSheet.create({
  listCardContainer: {
    height: 230,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  cardWrapper: {
    zIndex: 1,
  },
  cardBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFBABA",
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cardNbr: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  code: {
    backgroundColor: "#EDEDED",
    borderRadius: 8,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#DDD",
    height: 48,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  cardType: {
    width: 120,
  },
  dropdownContainer: {
    width: 120,
  },
  dropdown: {
    backgroundColor: "#EDEDED",
    borderWidth: 0.5,
    borderColor: "#CCC",
  },
  deleteButton: {
    height: 40,
    width: 40,
    backgroundColor: "#D9534F",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  fooContainer: {
    flexDirection: "row",
    gap: 15,
    marginHorizontal: 10,
    backgroundColor: "yellow",
    padding: 5,
    borderRadius: 10,
    marginBottom: 8,
  },
});
