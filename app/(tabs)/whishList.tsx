import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const WhishListScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>WhishList Screen</Text>
    </View>
  )
}

export default WhishListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})