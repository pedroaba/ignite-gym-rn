import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";

import { useForm, Controller } from "react-hook-form";

import BackgroundImg from "@assets/background.png";
import Logo from "@assets/logo.svg";

import { Input } from "@components/input";
import { Button } from "@components/button";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
  password_confirm: yup.string().required('Confirme a sua senha.').oneOf([yup.ref("password"), ""], "A confirmação da senha não confere."),
})

type FormDataProps = {
  name: string
  email: string
  password: string
  password_confirm: string
}

export function SignUp() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  })

  const navigator = useNavigation<AuthNavigatorRoutesProps>()

  function handleGoBack() {
    navigator.goBack()
  }

  function handleSignUp({
    email,
    name,
    password,
    password_confirm,
  }: FormDataProps) {
    console.log({
      email,
      name,
      password,
      password_confirm,
    })
  }
  
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1}>
        <Image 
          w="$full"
          h={624}
          defaultSource={BackgroundImg}
          source={BackgroundImg} 
          alt="Pessoas Treinando" 
          position="absolute"
        />

        <VStack flex={1} px="$10" pb="$16">
          <Center my="$24">
            <Logo />

            <Text color="$gray100" fontSize="$sm">
              Treine sua mente e o seu corpo.
            </Text>
          </Center>

          <Center gap="$2" flex={1}>
            <Heading color="$gray100">Crie sua conta</Heading>

            <Controller 
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input 
                  value={value}
                  placeholder="Nome"
                  onChangeText={onChange}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller 
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input 
                  value={value}
                  placeholder="E-mail" 
                  keyboardType="email-address" 
                  autoCapitalize="none"
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller 
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input 
                  value={value}
                  placeholder="Senha" 
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller 
              control={control}
              name="password_confirm"
              render={({ field: { onChange, value } }) => (
                <Input 
                  value={value}
                  placeholder="Confirme a Senha" 
                  secureTextEntry
                  onChangeText={onChange}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  errorMessage={errors.password_confirm?.message}
                  returnKeyType="send"
                />
              )}
            />

            <Button title="Criar e acessar" onPress={handleSubmit(handleSignUp)} />
          </Center>

          <Button title="Voltar para o login" variant="outline" mt="$12" onPress={handleGoBack} />
        </VStack>
      </VStack>
    </ScrollView>
  )
}