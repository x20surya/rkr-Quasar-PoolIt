
import { Stack } from "expo-router"


export default function AuthLayout (){
    return(
        <Stack>
            <Stack.Screen name="signIn" options={{ headerShown: true }} />
            <Stack.Screen name="signUp" options={{ headerShown: true }} />
        </Stack>
    )
}