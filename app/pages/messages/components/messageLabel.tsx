import { StyleSheet, Text, View } from "react-native"
import { Message } from "../../../core/model/message"
import { Contact } from "../../../core/model/contact"
import { Theme } from "../../../core/config/theme"

interface MessageLabelProps {
    message: Message
    me: Contact
}

const MessageLabel = (props: MessageLabelProps) => {
    const message = props.message
    const me = props.me

    const styles = StyleSheet.create({
        label: {
            minHeight: 40,
            marginTop: 1,
            paddingVertical: 3,
            paddingLeft: 30,
            paddingRight: 3,
            alignItems: message.id == me.id ? "flex-end" : "flex-start"
        },
        message: {
            minWidth: 220,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 15,
            paddingHorizontal: 5,
            paddingVertical: 8,
            backgroundColor: message.id == me.id ? Theme.bg2 : Theme.bg1
        },
    })

    return <View style={styles.label}>
        <View style={styles.message}>
            <Text style={{ textAlign: "left" }}>{message.text}</Text>
        </View>
    </View>
}

export default MessageLabel
