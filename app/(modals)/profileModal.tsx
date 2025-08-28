import BackButton from '@/components/backButton'
import Button from '@/components/button'
import Header from '@/components/header'
import Input from '@/components/input'
import ModalWrapper from '@/components/modalWrapper'
import Typo from '@/components/typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import { getProfileImage } from '@/services/getProfileImage'
import { updateUser } from '@/services/userServices'
import { UserDataType } from '@/types'
import { scale, verticalScale } from '@/utils/styling'
import { Image } from 'expo-image'
import * as ImagePicker from "expo-image-picker"
import { useRouter } from 'expo-router'
import { Pencil } from 'phosphor-react-native'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'


const ProfileModal = () => {

    const router = useRouter()
    const { user, updateUserData } = useAuth();
    const [loading, setLaoding] = useState(false)
    const [userData, setUserData] = useState<UserDataType>({
        name: '',
        image: null
    })

    useEffect(() => {
        setUserData({
            name: user?.name || '',
            image: user?.image || null
        })
    }, [user])


    const onsubmit = async () => {
        let { name, image } = userData;
        if (!name.trim()) {
            Alert.alert("User", "Please fill all the fields");
            return;
        }

        const res = await updateUser(user?.uid as string, userData)
        if (res.success) {
            updateUserData(user?.uid as string)
            router.back()
        }
        else Alert.alert("user", res.msg)
    }
    const onPickImage = async () => {
        // 1. Ask for permission
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert("Permission required", "You need to allow access to your gallery");
            return;
        }

        // 2. Launch the image picker
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ correct way
            allowsEditing: false, // crop UI
            aspect: [4, 3],      // crop ratio
            quality: 0.5,        // compression (0-1)
        });

        // 3. Handle cancellation
        if (!result.canceled) {
            const pickedUri = result.assets[0];
            console.log("Picked image:", pickedUri);

            // Example: update local state for your avatar
            setUserData({ ...userData, image: pickedUri });
        }
    };



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

                        <TouchableOpacity style={styles.editIcon} onPress={onPickImage}>
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