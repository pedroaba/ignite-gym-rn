import { ScrollView, TouchableOpacity } from "react-native";

import { ScreenHeader } from "@components/screen-header";
import { Center, Heading, Text, useToast, VStack } from "@gluestack-ui/themed";
import { UserPhoto } from "@components/user-photo";
import { Input } from "@components/input";
import { Button } from "@components/button";

import * as ExpoImagePicker from "expo-image-picker";
import * as ExpoFileSystem from "expo-file-system";
import { useState } from "react";
import { ToastMessage } from "@components/toast-message";

export function Profile() {
  const [userPhoto, setUserPhoto] = useState("https://github.com/pedroaba.png")
  const toast = useToast()

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      })
  
      if (photoSelected.canceled) {
        return
      }
  
      const photoURI = photoSelected.assets[0].uri
      if (photoURI) {
        const photoInfo = (await ExpoFileSystem.getInfoAsync(photoURI)) as {
          size: number
        }
  
        if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
          return toast.show({
            placement: "top",
            render: ({ id }) => (
              <ToastMessage
                id={id}
                title="Imagem muito grande!"
                description="Essa imagem é muito grande. Escolha uma de até 5MB."
                action="error"
                onClose={() => toast.close(id)}
              />
            )
          })
        }
  
        setUserPhoto(photoURI)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center  mt="$6" px="$10">
          <UserPhoto 
            source={{
              uri: userPhoto
            }}

            alt="Foto do usuário"
            size="xl"
          />

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="$green500" fontFamily="$heading" fontSize="$md" mt="$2" mb="$8">
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Center w="$full" gap="$4">
            <Input placeholder="Nome" bg="$gray600" isReadOnly />
            <Input value="rodrigo@email.com" bg="$gray600" isReadOnly />
          </Center>

          <Heading alignSelf="flex-start" fontFamily="$heading" color="$gray200" fontSize="$md" mt="$12" mb="$2">
            Alterar Senha
          </Heading>

          <Center w="$full" gap="$4">
            <Input placeholder="Senha antiga" bg="$gray600" secureTextEntry />
            <Input placeholder="Nova senha" bg="$gray600" secureTextEntry />
            <Input placeholder="Confirme a nova senha" bg="$gray600" secureTextEntry />

            <Button title="Atualizar" />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  )
}