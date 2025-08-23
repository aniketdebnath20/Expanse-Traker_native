import Button from '@/components/button'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'

const Welcome = () => {

  const router = useRouter();

  return (
    <ScreenWrapper>
      <Animated.View
        entering={FadeInDown.duration(1000).springify().damping(12)}
      >
        <TouchableOpacity style={styles.logginButton} onPress={() => router.push('/(auth)/login')}>
          <Typo fontWeight={'500'}>Sign in</Typo>
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.container}>
        {/* logo */}
        <View>
          <Animated.Image
            entering={FadeIn.duration(1000)}
            source={require('../../assets/images/welcome.png')}
            style={styles.welcomeImage}
            resizeMode='contain'
          />
        </View>

        <View style={styles.footer}>
          <Animated.View
            entering={FadeInDown.duration(1000).springify().damping(12)}
            style={{ alignItems: 'center' }}>
            <Typo size={30} fontWeight={'800'}>Always take control</Typo>
            <Typo size={30} fontWeight={'800'}>of yours finances</Typo>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(1000).delay(100).springify().damping(12)}
            style={{ alignItems: 'center' }}
          >
            <Typo size={17} color={colors.textLight}>Finances must be arranged to set a better</Typo>
            <Typo size={17} color={colors.textLight}>lifestyle in future</Typo>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1000).delay(200).springify().damping(12)}
            style={styles.buttomContainer}>
            <Button onPress={() => router.push('/(auth)/register')}>
              <Typo size={22} color={colors.neutral900} fontWeight={'600'}>Get Started</Typo>
            </Button>
          </Animated.View>
        </View>

      </View>
    </ScreenWrapper>

  )
}

export default Welcome

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'space-evenly',
//     paddingTop: spacingY._7,
//     gap: 50
//   },
//   welcomeImage: {
//     width: "100%",
//     height: verticalScale(250), // slightly smaller
//     alignSelf: 'center',
//     marginVertical: spacingY._10, // balanced top & bottom spacing
//     flexShrink: 1, // prevents it from pushing footer too far
//   },
//   logginButton: {
//     alignSelf: 'flex-end',
//     marginRight: spacingX._20,
//     marginBottom: spacingY._10, // reduces gap under Sign in button
//   },
//   footer: {
//     backgroundColor: colors.neutral900,
//     alignItems: 'center',
//     paddingTop: verticalScale(20), // less padding on top
//     paddingBottom: verticalScale(35), // slightly smaller bottom space
//     gap: spacingY._15,
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,

//     // iOS shadow (appears above footer)
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -6 },
//     shadowOpacity: 0.12,
//     shadowRadius: 12,

//     // Android workaround (fake top shadow)
//     elevation: 0,
//     borderTopWidth: 3,
//     borderColor: 'rgba(0,0,0,0.1)',
//   },
//   buttomContainer: {
//     width: '100%',
//     paddingHorizontal: spacingX._25,
//   },
// })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingTop: spacingY._7,
    gap: 50,
  },
  welcomeImage: {
    width: "100%",
    height: verticalScale(250),
    alignSelf: 'center',
    marginVertical: spacingY._10,
    flexShrink: 1,
  },
  logginButton: {
    alignSelf: 'flex-end',
    marginRight: spacingX._20,
    marginBottom: spacingY._10,
  },
  footer: {
    backgroundColor: colors.neutral900,
    alignItems: 'center',
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(35),
    gap: spacingY._15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden', // <-- ensures child background respects radius

    // iOS shadow (above footer)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,

    // Android (fake top shadow)
    elevation: 0,
    borderTopWidth: 3,
    borderColor: 'rgba(138, 130, 130, 0.2)',
  },
  buttomContainer: {
    width: '100%',
    paddingHorizontal: spacingX._25,
  },
})
