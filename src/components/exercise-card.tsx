import { Icon, Text } from "@gluestack-ui/themed";
import { Heading, HStack, Image, VStack } from "@gluestack-ui/themed";
import { ChevronRight } from "lucide-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps

export function ExerciseCard({ ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="$gray500" alignItems="center" p="$2" pr="$4" rounded="$md" mb="$3">
        <Image 
          source={{ uri: "https://github.com/pedroaba.png" }} 
          alt="Imagem do exercício" 
          w="$16" 
          h="$16"
          rounded="$md"
          mr="$4"
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading fontSize="$lg" color="$white" fontFamily="$heading">
            Puxada Frontal
          </Heading>

          <Text
            fontSize="$sm"
            color="$gray200"
            mt="$1"
            numberOfLines={2}
          >3 séries x 2 repetições</Text>
        </VStack>

        <Icon as={ChevronRight} color="$gray300" />
      </HStack>
    </TouchableOpacity>
  )
}