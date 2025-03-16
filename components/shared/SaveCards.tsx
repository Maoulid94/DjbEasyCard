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
import { useTheme } from "./ThemeContext";
import Loading from "./Loading";

const API_URL = Constants.expoConfig?.extra?.API_URL;

interface AddCardsProps {
  cardNumbers: number[];
}

interface CardData {
  code: string;
  cardType: string;
}

export default function AddAllCards({ cardNumbers }: AddCardsProps) {
  const { colors } = useTheme();
  const [cards, setCards] = useState<CardData[]>([]);
  const [indices, setIndices] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
      console.log(result);

      if (!response.ok) {
        Alert.alert(result.message);
        console.log("msg: ", result.message);

        return;
      }
      Alert.alert("Success", "Cards added successfully!");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
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
              keyExtractor={(card) => card.code}
              renderItem={({ item, index }) => (
                <View
                  style={[
                    styles.cardWrapper,
                    { backgroundColor: colors.BG_CARD },
                    dropdownOpenIndex === index
                      ? { zIndex: 100 }
                      : { zIndex: 1 },
                  ]}
                >
                  <View
                    style={[
                      styles.cardBox,
                      { backgroundColor: colors.BG_CARD },
                    ]}
                  >
                    <Text style={[styles.cardNbr, { color: colors.TEXT }]}>
                      {indices[index]}:
                    </Text>
                    <TextInput
                      style={[
                        styles.code,
                        {
                          backgroundColor: colors.BG_CONTENT,
                          color: colors.TEXT,
                        },
                      ]}
                      value={item.code.toString()}
                      onChangeText={(text) => {
                        // const newCode = text.replace(/\D/g, ""); // Remove non-numeric characters
                        setCards((prevCards) =>
                          prevCards.map((card, i) =>
                            i === index ? { ...card, code: text } : card
                          )
                        );
                      }}
                      // keyboardType="numeric"
                      editable={true}
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
                        style={[
                          styles.dropdown,
                          { backgroundColor: colors.BG_CONTENT },
                        ]}
                        dropDownContainerStyle={[
                          styles.dropdownContainer,
                          { backgroundColor: colors.BG_CONTENT },
                          dropdownOpenIndex === index
                            ? { zIndex: 100, elevation: 10 }
                            : {},
                        ]}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => handleDeleteCard(index)}
                      style={[
                        styles.deleteButton,
                        { backgroundColor: colors.BG_TINT },
                      ]}
                    >
                      <FontAwesome
                        name="remove"
                        size={24}
                        color={colors.TEXT}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
          <Loading visible={loading} />
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
    height: 260,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  cardWrapper: {
    zIndex: 1,
  },
  cardBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cardNbr: {
    fontSize: 15,
    fontWeight: "bold",
  },
  code: {
    flex: 2,
    borderRadius: 8,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#DDD",
    height: 48,
    paddingHorizontal: 10,
  },
  cardType: {
    flex: 1.5,
    // zIndex:102
    width: 120,
  },
  dropdownContainer: {
    // zIndex:102
    // flex:2,
    // width: 120,
  },
  dropdown: {
    borderWidth: 0.5,
    borderColor: "#CCC",
    zIndex: 102,
  },
  deleteButton: {
    height: 40,
    width: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
