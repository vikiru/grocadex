import { OverlayProvider } from '@gluestack-ui/overlay';
import { ToastProvider } from '@gluestack-ui/toast';
import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';
import { View, ViewProps } from 'react-native';

import { config } from './config';
import { ModeType } from './types';

export function GluestackUIProvider({
    mode = 'light',
    ...props
}: {
    mode?: ModeType;
    children?: React.ReactNode;
    style?: ViewProps['style'];
}) {
    const { colorScheme, setColorScheme } = useColorScheme();

    useEffect(() => {
        setColorScheme(mode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode]);

    return (
        <View
            style={[
                config[colorScheme!],
                { flex: 1, height: '100%', width: '100%' },
                props.style,
            ]}
        >
            <OverlayProvider>
                <ToastProvider>{props.children}</ToastProvider>
            </OverlayProvider>
        </View>
    );
}
