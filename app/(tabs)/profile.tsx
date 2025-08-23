import Header from '@/components/header'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/typo'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import { getProfileImage } from '@/services/getProfileImage'
import { accountOptionType } from '@/types'
import { verticalScale } from '@/utils/styling'
import { Image } from 'expo-image'
import Icons from 'phosphor-react-native'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

const Profile = () => {

  const { user } = useAuth();


  const accountOptions: accountOptionType[] = [
    {
      title: "Edit Profile",
      icon: (
        <Icons.User
          size={26}
          color={colors.white}
          weight="fill"
        />
      ),
      routeName: "/(modals)profileModal",
      bgColor: "#6366f1",
    },
    {
      title: "Setting",
      icon: (
        <Icons.GearSix
          size={26}
          color={colors.white}
          weight="fill"
        />
      ),
      // routeName: "/(modals)profileModal",
      bgColor: "#059669",
    },
    {
      title: "Privacy Ploicy",
      icon: (
        <Icons.Lock
          size={26}
          color={colors.white}
          weight="fill"
        />
      ),
      // routeName: "/(modals)profileModal",
      bgColor: colors.neutral600,
    },
    {
      title: "Logout",
      icon: (
        <Icons.Power
          size={26}
          color={colors.white}
          weight="fill"
        />
      ),
      // routeName: "/(modals)profileModal",
      bgColor: "#e11d48",
    },
  ]


  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title='Profile' style={{ marginVertical: spacingY._10 }} />

        <View>

          <View style={styles.userInfo}>
            <View>
              <Image source={getProfileImage(user?.image)} style={styles.avatar} contentFit='cover' transition={100} />
            </View>

            <View style={styles.nameContainer}>
              <Typo size={24} fontWeight={'600'} color={colors.neutral100}>{user?.name}</Typo>
              <Typo size={15} color={colors.neutral400}>{user?.email}</Typo>
            </View>
          </View>

        </View>


        <View style={styles.accountOption}>
          {accountOptions.map((item, index) => {
            return (
              <View key={index} style={styles.listItem}>
                <TouchableOpacity style={styles.flexRow}>
                  <View style={[styles.listIcon, { backgroundColor: item?.bgColor },]}>
                    {item.icon && item.icon}
                  </View>
                  <Typo size={16} style={{ flex: 1 }} fontWeight={'500'}>{item.title}</Typo>
                  <Icons.CaretRight
                    size={verticalScale(20)}
                    weight='bold'
                    color={colors.white}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

      </View>
    </ScreenWrapper>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: 'center',
    gap: spacingY._15,
  },
  avatarContainer: {
    position: 'relative',
    alignSelf: 'center',
  },
  avatar: {
    alignSelf: 'center',
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 8,
    borderRadius: 50,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: 5,
  },
  nameContainer: {
    gap: verticalScale(4),
    alignItems: 'center',
  },
  listIcon: {
    height: verticalScale(44),
    width: verticalScale(44),
    backgroundColor: colors.neutral500,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius._15,
    borderCurve: 'continuous',
  },
  listItem: {
    marginBottom: verticalScale(17),
  },
  accountOption: {
    marginTop: spacingY._35,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._20,
  },
})
