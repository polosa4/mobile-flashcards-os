import * as React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import {
    Paragraph,
    Switch,
    Colors,
    TouchableRipple,
    useTheme,
} from 'react-native-paper';

const SwitchExample = () => {
    const [valueNormal, setNormalValue] = React.useState(true);
    const [valueCustom, setCustomValue] = React.useState(true);

    const {
        colors: { background },
    } = useTheme();

    const switchValueNormalLabel = `switch ${
        valueNormal === true ? 'on' : 'off'
        }`;
    const switchValueCustomlLabel = `switch ${
        valueCustom === true ? 'on' : 'off'
        }`;

    return Platform.OS === 'android' ? (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: background,
                },
            ]}
        >
            <TouchableRipple onPress={() => setCustomValue(!valueCustom)}>
                <View style={styles.row}>
                    <Paragraph>Custom {switchValueCustomlLabel}</Paragraph>
                    <View pointerEvents="none">
                        <Switch value={valueCustom} color={Colors.blue500} />
                    </View>
                </View>
            </TouchableRipple>

        </View>
    ) : (
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: background,
                    },
                ]}
            >

                <View style={styles.row}>
                    <Paragraph>Custom {switchValueCustomlLabel}</Paragraph>
                    <Switch
                        value={valueCustom}
                        onValueChange={() => setCustomValue(!valueCustom)}
                        color={Colors.blue500}
                    />
                </View>

            </View>
        );
};

SwitchExample.title = 'Switch';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingVertical: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
});

export default SwitchExample;
