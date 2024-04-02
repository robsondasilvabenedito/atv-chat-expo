import { DimensionValue, StyleSheet, Text, TextInput, View } from "react-native"
import { Theme } from "../../config/theme"

interface PropsDefaultTextInput {
    value: string
    hintText?: string
    setValue: (value: string) => void
    errorText?: string
    hasError?: boolean
    marginTop?: DimensionValue
    marginBottom?: DimensionValue
}

const DefaultTextInput = (props: PropsDefaultTextInput) => {
    const value = props.value
    const hintText = props.hintText
    const setValue = props.setValue

    const marginTop = props.marginTop
    const marginBottom = props.marginBottom

    const errorText = props.errorText
    const hasError = props.hasError ? props.hasError : false

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
        errorLabel: {
            marginTop: 5,
            marginLeft: 6
        },
        error: {
            color: "#aa0a0c"
        }
    })

    return <View style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={setValue}
                placeholder={hintText} />
        </View>
        {hasError ?
            <View style={styles.errorLabel}>
                <Text style={styles.error}>{errorText}</Text>
            </View>
            :
            <></>}
    </View>
}

export default DefaultTextInput
