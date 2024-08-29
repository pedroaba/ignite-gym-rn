import { Box, Heading, Image, Text } from "@gluestack-ui/themed";
import { HStack, Icon, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import type { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ArrowLeft } from "lucide-react-native";
import { ScrollView, TouchableOpacity } from "react-native";

import BodySvg from "@assets/body.svg"
import SeriesSvg from "@assets/series.svg"
import RepetitionSvg from "@assets/repetitions.svg"
import { Button } from "@components/button";

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <VStack flex={1}>
      <VStack px="$8" bg="$gray600" pt="$12">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} color="$green500" size="xl" />
        </TouchableOpacity>

        <HStack justifyContent="space-between" alignItems="center" mt="$4" pb="$8">
          <Heading color="$gray100" fontFamily="$heading" fontSize="$lg" flexShrink={1}>
            Puxada frontal
          </Heading>
          <HStack alignItems="center">
            <BodySvg />

            <Text color="$gray200" ml="$1" textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <VStack p="$8">
          <Image 
            source={{
              uri: "https://github.com/pedroaba.png"
            }} 
            mb="$3"
            resizeMode="cover"
            rounded="$lg"
            w="$full"
            h="$80"
            alt="Imagem do exercícios" 
          />

          <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
            <HStack alignItems="center" justifyContent="space-around" mb="$6" mt="$5">
              <HStack>
                <SeriesSvg />
                <Text color="$gray200" ml="$2">3 séries</Text>
              </HStack>
              <HStack>
                <RepetitionSvg />
                <Text color="$gray200" ml="$2">12 repetições</Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}