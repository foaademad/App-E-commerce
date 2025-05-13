import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

type Props = {};

const WelcomeScreen = (props: Props) => {
    return (
        <View style={styles.container}>
            <Text>Welcome Screen</Text>
            <Link href="/signin" style={styles.link}>
                <Text>Go to SignIn Screen</Text>
            </Link>
            <Link href="/signup" style={styles.link}>
                <Text>Go to SignUp Screen</Text>
            </Link>
        </View>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    link: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: "#007AFF",
        borderRadius: 5,
    },
});