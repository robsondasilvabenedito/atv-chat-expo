import { StyleSheet, Text, View } from "react-native"
import { Message } from "../../../core/model/message"
import { Contact } from "../../../core/model/contact"
import { Theme } from "../../../core/config/theme"

interface MessageLabelProps {
    message: Message
    me: Contact
    contacts: Contact[]
}

const MessageLabel = (props: MessageLabelProps) => {
    const message = props.message
    const me = props.me
    const contacts = props.contacts

    const date = new Date(message.timestamp)
    const dateTxt = `${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`

    let contact: Contact | undefined

    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id != message.contactId) continue

        contact = contacts[i]
        break
    }

    const styles = StyleSheet.create({
        label: {
            minHeight: 40,
            marginTop: 1,
            paddingVertical: 3,
            paddingLeft: message.contactId == me.id ? 30 : 10,
            paddingRight: message.contactId == me.id ? 10 : 30,
            alignItems: message.contactId == me.id ? "flex-end" : "flex-start"
        },
        contact: {
            marginBottom: 6,
            fontWeight: "bold"
        },
        text: {
            textAlign: "left",
            marginBottom: 2
        },
        message: {
            minWidth: 220,
            borderTopLeftRadius: message.contactId == me.id ? 4 : 0,
            borderTopRightRadius: message.contactId == me.id ? 0 : 4,
            borderBottomLeftRadius: message.contactId == me.id ? 15 : 0,
            borderBottomRightRadius: message.contactId == me.id ? 0 : 15,
            paddingHorizontal: 5,
            paddingVertical: 8,
            backgroundColor: Theme.bg1
        },
        timestamp: {
            marginTop: 2,
            marginBottom: 5,
            fontWeight: "300",
            fontSize: 12,
            paddingHorizontal: 5
        }
    })

    return <View style={styles.label}>
        <View style={styles.message}>
            <Text style={styles.contact}>{message.contactId == me.id ? "Eu" : contact?.name} | {contact?.type}</Text>
            <Text style={styles.text}>{message.text}</Text>
        </View>
        <Text style={styles.timestamp}>{dateTxt}</Text>
    </View>
}

export default MessageLabel
