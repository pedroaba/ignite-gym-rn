import { HistoryCard } from "@components/history-card";
import { ScreenHeader } from "@components/screen-header";
import { Heading, Text, VStack } from "@gluestack-ui/themed";
import { useState } from "react";
import { SectionList } from "react-native";

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: "22.07.24",
      data: [
        "Puxada Frontal",
        "Remada Unilateral"
      ]
    },
    {
      title: "23.07.24",
      data: [
        "Puxada Frontal"
      ]
    },
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico" />

      <SectionList
        sections={exercises}
        keyExtractor={item => item}
        renderItem={() => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading color="$gray200" fontSize="$md" mt="$10" mb="$3">
            {section.title}
          </Heading>
        )}
        style={{
          paddingHorizontal: 32
        }}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: 'center' }
        }
        ListEmptyComponent={() => {
          return (
            <Text color="$gray100" textAlign="center">
              Não há exercícios registrados ainda. {"\n"}
              Vamos fazer exercícios hoje?
            </Text>
          )
        }}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  )
}