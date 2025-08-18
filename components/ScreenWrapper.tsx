import { colors } from '@/constants/theme';
import { ScreenWrapperProps } from '@/types';
import React from 'react';
import { Dimensions, Platform, StatusBar, View } from 'react-native';


const { height } = Dimensions.get('window');

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
 const paddingTop = Platform.OS === 'android' ? height * 0.05 : height * 0.06;

    return (
        <View style={[{
            paddingTop,
            flex: 1,
            backgroundColor: colors.neutral900
        }, style
        ]}>
            <StatusBar barStyle="light-content" />
            {children}
        </View>
    )
}

export default ScreenWrapper
