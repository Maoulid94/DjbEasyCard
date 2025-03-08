import StatisticsBox from "@/components/shared/StatisticsBox";
import React, { useCallback, useMemo, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, StyleSheet, Alert, ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { BarChart, PieChart, PieChartPro } from "react-native-gifted-charts";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

interface DataTypes {
  publicId: string;
  code: string;
  cardType: string;
  isValid: boolean;
  createdAt: string;
}

const API_URL = Constants.expoConfig?.extra?.API_URL;

export default function Dashboard() {
  const [data, setData] = useState<DataTypes[]>([]);
  const [loading, setLoading] = useState(false);

  const getTodayDate = new Date().toISOString().split("T")[0];
  const getWeekDays = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(getTodayDate);
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    });
  };
  const days = getWeekDays();
  const weekDays = days
    .map((day) => ({
      label: day,
      value: data.filter((Item) => Item.createdAt.startsWith(day)).length,
    }))
    .filter((Item) => Item.value > 0);

  // Memoized statistics calculations
  const { totalCards, newCardsToday, validCards, invalidCards, pieChartData } =
    useMemo(() => {
      const totalCards = data.length;
      const newCardsToday = data.filter((item) =>
        item.createdAt.startsWith(getTodayDate)
      ).length;
      const validCards = data.filter((item) => item.isValid).length;
      const invalidCards = totalCards - validCards;
      const cardTypes = ["500", "1000", "2000", "5000", "10000"];
      const pieChartData = totalCards
        ? cardTypes
            .map((type) => ({
              value: data.filter((item) => item.cardType === type).length,
              text: `${(
                (data.filter((item) => item.cardType === type).length /
                  totalCards) *
                100
              ).toFixed(1)}%`,
            }))
            .filter((item) => item.value > 0)
        : [];

      return {
        totalCards,
        newCardsToday,
        validCards,
        invalidCards,
        pieChartData,
      };
    }, [data, getTodayDate]);

  const DataVisualization = async () => {
    const apiKey = await SecureStore.getItemAsync("API-KEY");
    if (!apiKey) {
      Alert.alert("Error", "API key not found. Please log in again.");
      console.log("api:", apiKey);

      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/cards?apiKey=${apiKey}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      if (Array.isArray(result)) {
        setData(result);
      } else {
        console.log("Unexpected data format");
        setData([]);
      }
    } catch (error: any) {
      console.log("error catch dashboard", error.message);
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      DataVisualization();
    }, [data])
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>General Statistics</Text>

        <View style={styles.statisticsContent}>
          <StatisticsBox value={totalCards} text="Total cards" />
          <StatisticsBox value={newCardsToday} text="New cards" />
        </View>

        <View style={styles.statisticsContent}>
          <StatisticsBox value={validCards} text="Valid cards" />
          <StatisticsBox value={invalidCards} text="Invalid cards" />
        </View>

        {pieChartData.length > 0 && (
          <View style={styles.pieChartContent}>
            <Text style={styles.text}>Percentage of cards by type</Text>
            <PieChartPro
              data={pieChartData}
              textSize={14}
              textColor="black"
              donut
              shadow
              showText
              radius={110}
              animationDuration={1000}
              showExternalLabels={true}
              showValuesAsLabels={true}
              labelsPosition="outward"
              // isAnimated
            />
          </View>
        )}

        <View style={styles.barChartContent}>
          <Text style={styles.text}>Number of cards created this week</Text>
          <BarChart
            data={weekDays}
            barWidth={80}
            xAxisThickness={0}
            yAxisThickness={0}
            showValuesAsTopLabel
            width={290}
            height={250}
            spacing={25}
            barBorderRadius={4}
            dashWidth={0}
            isAnimated
            animationDuration={500}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statisticsContent: {
    flexDirection: "row",
    marginHorizontal: 45,
    marginVertical: 12,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    marginTop: 15,
  },
  barChartContent: {
    height: 400,
    backgroundColor: "blue",
    marginVertical: 15,
    marginHorizontal: 15,
  },
  pieChartContent: {
    height: 380,
    backgroundColor: "yellow",
    marginVertical: 15,
    marginHorizontal: 15,
    alignItems: "center",
  },
  text: { fontSize: 18, textAlign: "center", marginBottom: 35, marginTop: 15 },
});
