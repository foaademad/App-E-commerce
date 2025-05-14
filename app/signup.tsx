import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const SignUpScreen = (props: Props) => {
    return (
        <View style={styles.container}>
            <Text>SignUp Screen</Text>
            <Text style={styles.title}>Sign Up</Text>
            
        </View>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center' 
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        letterSpacing: 1.5,
    }
})