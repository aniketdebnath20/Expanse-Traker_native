<<<<<<< HEAD
import { Tabs } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const _layout = () => {
  return (
  <Tabs></Tabs>
)
}

export default _layout

const styles = StyleSheet.create({})
=======
import CustomTabs from '@/components/customTabs'
import { Tabs } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <Tabs
      tabBar={props => <CustomTabs {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="statistics" options={{ title: 'Statistics' }} />
      <Tabs.Screen name="wallet" options={{ title: 'Wallet' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  )
}

export default _layout
>>>>>>> bcd9552 (re add the git)
