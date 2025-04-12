import StatisticsBox from "@/components/shared/StatisticsBox";
import React, { useCallback, useMemo, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Button,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { BarChart, PieChartPro } from "react-native-gifted-charts";
import LegndPieChart from "@/components/shared/Legend";
import { useTheme } from "@/components/shared/ThemeContext";
import Loading from "@/components/shared/Loading";
import { API_URL } from "@/constants/variables";
import verifyApiKey from "@/constants/Valid_API_KEY";
import { router } from "expo-router";

interface DataTypes {
  publicId: string;
  code: string;
  cardType: string;
  isValid: boolean;
  createdAt: string;
}

export default function Dashboard() {
  const [data, setData] = useState<DataTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

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
            .map((type, index) => ({
              value: data.filter((item) => item.cardType === type).length,
              text: `${(
                (data.filter((item) => item.cardType === type).length /
                  totalCards) *
                100
              ).toFixed(1)}%`,
              color: colors.bg_PIE[index % colors.bg_PIE.length],
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
      throw new Error("Missing API Key!");
    }
    // const isValidKey = await verifyApiKey(apiKey);
    // if (!isValidKey) {
    //   Alert.alert("Invalid API Key", " Please log in again.");
    //   await SecureStore.deleteItemAsync("API-KEY");
    //   router.replace("/(auth)/Login");
    //   return;
    // }
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
    }, [])
  );

  return (
    <>
      <Loading visible={loading} />
      <View style={[styles.container, { backgroundColor: colors.BG_CONTENT }]}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          style={{ marginVertical: 15, marginHorizontal: 10 }}
        >
          <View style={styles.statContainer}>
            <View style={styles.statisticContent}>
              <StatisticsBox value={totalCards} text="Total cards" />
              <StatisticsBox value={newCardsToday} text="New cards" />
            </View>

            <View style={styles.statisticContent}>
              <StatisticsBox value={validCards} text="Valid cards" />
              <StatisticsBox value={invalidCards} text="Invalid cards" />
            </View>
          </View>

          {pieChartData.length > 0 && (
            <View
              style={[
                styles.pieChartContent,
                { backgroundColor: colors.BG_CARD },
              ]}
            >
              <Text style={[styles.text, { color: colors.TEXT }]}>
                Percentage of cards by type
              </Text>
              <LegndPieChart />
              <PieChartPro
                data={pieChartData}
                textSize={14}
                textColor={colors.TEXT}
                donut
                shadow
                showText
                radius={120}
                animationDuration={1000}
                showExternalLabels={true}
                showValuesAsLabels={true}
                // isAnimated
              />
            </View>
          )}

          <View
            style={[
              styles.barChartContent,
              { backgroundColor: colors.BG_CARD },
            ]}
          >
            <Text style={[styles.text, { color: colors.TEXT }]}>
              Number of cards created this week
            </Text>
            <BarChart
              yAxisIndicesColor={colors.TEXT}
              xAxisIndicesColor={colors.TEXT}
              xAxisColor={colors.TEXT}
              yAxisColor={colors.TEXT}
              color={colors.TEXT}
              frontColor={colors.BG_TINT}
              xAxisLabelTextStyle={colors.TEXT}
              data={weekDays}
              barWidth={80}
              // xAxisThickness={0}
              // yAxisThickness={0}
              showValuesAsTopLabel
              width={290}
              height={250}
              spacing={25}
              barBorderRadius={4}
              dashWidth={0}
              isAnimated
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  statContainer: {
    gap: 12,
  },
  statisticContent: {
    gap: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  barChartContent: {
    height: 400,
    borderRadius: 10,
  },
  pieChartContent: {
    height: 350,
    alignItems: "center",
    borderRadius: 10,
  },
  text: { fontSize: 18, textAlign: "center", marginBottom: 15, marginTop: 15 },
});
