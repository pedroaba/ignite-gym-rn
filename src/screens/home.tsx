import { ExerciseCard } from "@components/exercise-card";
import { Group } from "@components/group";
import { HomeHeader } from "@components/home-header";
import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import type { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useState } from "react";
import { FlatList } from "react-native";

export function Home() {
  const [exercises, setExercises] = useState([
    "Puxada Frontal",
    "Remada curvada",
    "Remada unilateral",
    "Levantamento terra",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ])
  const [groups, setGroups] = useState(
    ["Costas", "Bíceps", "Tríceps", "Ombro"]
  )
  const [groupSelected, setGroupSelected] = useState(groups[0])

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetail() {
    navigation.navigate("exercise")
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 32
        }}
        style={{
          marginVertical: 40,
          maxHeight: 44,
          minHeight: 44
        }}
        renderItem={({ item }) => (
          <Group 
            key={item}
            name={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
      />

      <VStack px="$8" flex={1}>
        <HStack justifyContent="space-between" mb="$5" alignItems="center">
          <Heading color="$gray200" fontSize="$md" fontFamily="$heading">Exercícios</Heading>
          <Text color="$gray200" fontSize="$sm" fontFamily="$body">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList 
          data={exercises}
          keyExtractor={item => item}
          renderItem={() => <ExerciseCard onPress={handleOpenExerciseDetail} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20
          }}
        />
      </VStack>
    </VStack>
  )
}