import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { LanguageProvider } from '../src/context/LanguageContext';
// Import i18n configuration
import { ShopProvider } from '@/src/context/ShopContext';
import '../src/config/i18n';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ShopProvider>
            <LanguageProvider>
                <Stack screenOptions={{headerShown: false}}>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="signin" options={{ presentation: 'modal' }} />
                    <Stack.Screen name="signup" options={{ presentation: 'modal' }} />
                </Stack>
            </LanguageProvider>
        </ShopProvider>
    );
}
