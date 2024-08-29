import { Input as GlueStackInput, InputField, FormControl, FormControlErrorText, FormControlError } from "@gluestack-ui/themed"
import type { ComponentProps } from "react"

type Props = ComponentProps<typeof InputField> & {
  isReadOnly?: boolean
  errorMessage?: string | null
  isInvalid?: boolean
}

export function Input({ isReadOnly = false, errorMessage = '', isInvalid = false, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} mb="$4" w="$full" >
      <GlueStackInput 
        h="$14"
        isInvalid={invalid}
        borderWidth="$0" 
        borderRadius="$md"
        $focus={{
          borderWidth: 1,
          borderColor: invalid ? "$red500" : "$green500"
        }}
        $invalid={{
          borderWidth: 1,
          borderColor: "$red500"
        }}
        isReadOnly={isReadOnly}
        opacity={isReadOnly ? 0.5 : 1}
      >
        <InputField 
          px="$4" 
          bg="$gray700" 
          color="$white"
          fontFamily="$body"
          placeholderTextColor="$gray300"
          {...rest} 
        />
      </GlueStackInput>

      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}