import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from "../../config/theme";
import { CheckBoxValue } from "../../model/checkbox";

interface PropsDefaultCheckBox {
    options: CheckBoxValue[]
    setOptions: (value: React.SetStateAction<CheckBoxValue[]>) => void
    type: "one" | "multiple"
}

const DefaultCheckBox = (props: PropsDefaultCheckBox) => {
    const options = props.options
    const setOptions = props.setOptions
    const type = props.type

    const styles = StyleSheet.create({
        container: {
            width: "90%",
            flexDirection: "row",
            marginBottom: 20,
            justifyContent: "space-evenly"
        },
        checkBox: {
            flexDirection: "row",
            alignItems: "center",
        },
        checkBoxIcon: {
            width: 25,
            height: 25,
            backgroundColor: Theme.bg1
        },
        checkBoxText: {
            color: Theme.fg2,
            marginLeft: 8,
            fontSize: 15,
            fontWeight: "300"
        }
    })


    const handleCheckBox = (index: number) => {
        let active = !options[index].active

        // change value
        options[index].active = active

        // one
        if (type == "one") {
            options.forEach((value, i) => {
                if (i == index) return

                if (value.active == true) {
                    value.active = false
                }
            })
        }

        // update
        setOptions([...options])
    }

    return <View style={styles.container}>
        {options.map((value, index) => {
            const name = value.name
            const active = value.active

            return <View key={index}>
                <TouchableOpacity
                    style={styles.checkBox}
                    onPress={() => { handleCheckBox(index) }}
                    activeOpacity={1}
                >
                    <View style={styles.checkBoxIcon}>
                        {active ?
                            <MaterialCommunityIcons name="check-bold" size={24} color={Theme.button2} /> :
                            <></>}
                    </View>
                    <Text style={styles.checkBoxText}>{name}</Text>
                </TouchableOpacity>
            </View>
        })}
    </View>
}

export default DefaultCheckBox
