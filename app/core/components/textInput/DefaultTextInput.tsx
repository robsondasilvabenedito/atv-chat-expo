import { DimensionValue, StyleSheet, Text, TextInput, View } from "react-native"
import { Theme } from "../../config/theme"

interface PropsDefaultTextInput {
    value: string
    hintText?: string
    setValue: (value: string) => void
    type: "normal" | "senha"
    marginTop?: DimensionValue
    marginBottom?: DimensionValue
}

const DefaultTextInput = (props: PropsDefaultTextInput) => {
    const value = props.value
    const hintText = props.hintText
    const setValue = props.setValue

    const type = props.type

    const marginTop = props.marginTop
    const marginBottom = props.marginBottom

    const styles = StyleSheet.create({
        container: {
            width: "90%",
            marginTop: marginTop,
            marginBottom: marginBottom
        },
        inputContainer: {
            height: 55,
            backgroundColor: Theme.bg1,
            padding: 6,
            borderRadius: 10,
        },
        input: {
            height: "100%"
        },
    })

    return <View style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={setValue}
                placeholder={hintText}
                secureTextEntry={type == "senha" ? true : false} />
        </View>
    </View>
}

export default DefaultTextInput
