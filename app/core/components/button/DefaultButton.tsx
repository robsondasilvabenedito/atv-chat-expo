import { DimensionValue, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Theme } from "../../config/theme"

interface PropsDefaultButton {
    onPress: () => void
    text: string
    type: "claro" | "escuro"
    width?: DimensionValue
    marginTop?: DimensionValue
    marginBottom?: DimensionValue
}

const DefaultButton = (props: PropsDefaultButton) => {
    const text = props.text

    const width = props.width

    const onPress = props.onPress

    const type = props.type

    const marginTop = props.marginTop
    const marginBottom = props.marginBottom

    const styles = StyleSheet.create({
        button: {
            width: width,
            height: 40,
            paddingHorizontal: 6,
            backgroundColor: type === "claro" ? Theme.button1 : Theme.button2,
            justifyContent: "center",
            marginTop: marginTop,
            marginBottom: marginBottom,
            borderRadius: 10,
        },
        text: {
            fontSize: 15,
            fontWeight: "bold",
            color: type === "claro" ? Theme.button2 : Theme.button1,
            textAlign: "center",
        },
    })

    return <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
}

export default DefaultButton
