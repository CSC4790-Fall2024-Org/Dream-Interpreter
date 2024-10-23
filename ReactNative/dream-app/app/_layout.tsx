import { Stack } from "expo-router";

export default function RootLayout() {
  return (
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="gemini" options={{ title: "Gemini Interpretation" }} />
        <Stack.Screen name="gooey" options={{ title: "Gooey Animation" }} />
      </Stack>
  );
}
