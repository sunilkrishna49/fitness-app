import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { fetchExercisesByBodyPart } from "../api/exerciseDB";
import { useState } from "react";
import { demoExercises } from "../constants";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import ExercisesList from "../components/ExercisesList";
import { ScrollView } from "react-native-virtualized-view";

export default function exercises() {
  const router = useRouter();
  const item = useLocalSearchParams();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (item) getExercises(item.name);
  }, [item]);

  const getExercises = async (bodyPart) => {
    let data = await fetchExercisesByBodyPart(bodyPart);

    setExercises(data);
  };
  return (
    <ScrollView>
      <StatusBar style="light" />
      <Image
        source={item.image}
        style={{ height: hp(45), width: wp(100) }}
        className="rounded-b-[40px]"
      />
      <TouchableOpacity
        onPress={() => router.back()}
        className="rounded-full bg-rose-500 mx-4 absolute flex justify-center items-center pr-1"
        style={{ height: hp(5.5), width: hp(5.5), marginTop: hp(7) }}
      >
        <Ionicons name="caret-back-outline" size={hp(4)} color="white" />
      </TouchableOpacity>
      {/* exercises */}
      <View className="mx-4 space-y-3 mt-4">
        <Text
          className="font-semibold text-neutral-700"
          style={{ fontSize: hp(3) }}
        >
          {item.name} exercises
        </Text>

        <View className="mb-10">
          <ExercisesList data={exercises} />
        </View>
      </View>
    </ScrollView>
  );
}
