import BackButton from '@/components/backButton'
import Button from '@/components/button'
import Header from '@/components/header'
import Input from '@/components/input'
import ModalWrapper from '@/components/modalWrapper'
import Typo from '@/components/typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { getProfileImage } from '@/services/getProfileImage'
import { UserDataType } from '@/types'
import { scale, verticalScale } from '@/utils/styling'
import { Image } from 'expo-image'
import { Pencil } from 'phosphor-react-native'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

const ProfileModal = () => {

    const [loading, setLaoding] = useState(false)
    const [userData, setUserData] = useState<UserDataType>({
        name: '',
        image: null
    })


    const onsubmit = () => {

    }

    return (
        <ModalWrapper>
            <View style={styles.container}>
                <Header
                    title='Update Profile'
                    leftIcon={<BackButton />}
                    style={{ marginBottom: spacingY._10 }}
                />

                <ScrollView contentContainerStyle={styles.form}>
                    <View style={styles.avatarContainer}>
                        <Image style={styles.avatar} source={getProfileImage(userData?.image)} contentFit='cover' transition={100} />

                        <TouchableOpacity style={styles.editIcon}>
                            <Pencil size={verticalScale(20)} color={colors.neutral800} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <Typo color={colors.neutral200}>Name</Typo>
                        <Input placeholder='Name' value={userData.name} onChangeText={(values) => setUserData({ ...userData, name: values })} />
                    </View>
                </ScrollView>
            </View>

            <View style={styles.footer}>
                <Button onPress={onsubmit} loading={loading} style={{ flex: 1 }}>
                    <Typo fontWeight={'700'} color={colors.black}>Update</Typo>
                </Button>

            </View>
        </ModalWrapper>
    )
}

export default ProfileModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: spacingY._20
    },
    footer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: spacingX._20,
        gap: scale(12),
        paddingTop: spacingY._15,
        borderTopColor: colors.neutral700,
        marginBottom: spacingY._15,
        borderTopWidth: 1,
    },
    form: {
        gap: spacingY._30,
        marginTop: spacingX._15,
    },
    avatarContainer: {
        position: 'relative',
        alignSelf: 'center'
    },
    avatar: {
        alignSelf: 'center',
        backgroundColor: colors.neutral300,
        height: verticalScale(135),
        width: verticalScale(135),
        borderRadius: 200,
        borderWidth: 1,
        borderColor: colors.neutral500,
    },
    editIcon: {
        position: 'absolute',
        bottom: spacingY._5,
        right: spacingY._7,
        borderRadius: 100,
        backgroundColor: colors.neutral100,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 4,
        padding: spacingY._7
    },
    inputContainer: {
        gap: spacingY._10,
    }
})