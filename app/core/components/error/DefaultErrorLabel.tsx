import { DimensionValue, StyleSheet, Text, View } from "react-native"

interface PropsDefaultErrorLabel {
    errorText: string
    hasError: boolean
    marginTop?: DimensionValue
    marginBottom?: DimensionValue
}

const DefaultErrorLabel = (props: PropsDefaultErrorLabel) => {
    const errorText = props.errorText
    const hasError = props.hasError ? props.hasError : false

    const marginTop = props.marginTop
    const marginBottom = props.marginBottom

    const styles = StyleSheet.create({
        errorLabel: {
            marginTop: marginTop,
            marginLeft: 6,
            marginBottom: marginBottom,
            width: "90%"
        },
        error: {
            color: "#aa0a0c"
        }
    })

    return <>
        {hasError ?
            <View style={styles.errorLabel}>
                <Text style={styles.error}>{errorText}</Text>
            </View>
            :
            <></>}
    </>
}

export default DefaultErrorLabel
