import { FlatList, KeyboardAvoidingView, ListRenderItem, Platform, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native"
import { Theme } from "../../core/config/theme"
import { useDispatch, useSelector } from "react-redux"
import { storeStateType } from "../../core/redux"
import { Contact } from "../../core/model/contact"
import { Message } from "../../core/model/message"
import MessageLabel from "./components/messageLabel"
import { useEffect, useRef, useState } from "react"
import SendButton from "./components/senfButton"

const labelWidth: number = 86
const buttonWidth: number = 100 - labelWidth

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboard: {
        flex: 1,
        backgroundColor: Theme.bg1,
    },
    list: {
        paddingTop: 3,
    },
    listFoot: {
        marginTop: 10,
    },
    inputContainer: {
        flexDirection: "row",
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        height: 50,
        alignItems: "center"
    },
    inputText: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderWidth: 1,
        height: "100%",
        width: `${labelWidth}%`,
        borderColor: "black",
        borderRadius: 15
    }
})

const Messages = ({ navigation }: any) => {
    const [message, setMessage] = useState("")

    // redux
    const stock = useSelector((state: storeStateType) => state.stock)
    const dispatch = useDispatch<any>()

    let contacts: Contact[] = stock.contacts
    let messages: Message[] = stock.messages
    let me = stock.me

    // send
    const sendMessage = () => {

    }

    // Render
    const renderMessages: ListRenderItem<Message> = ((list) => {
        let msg = list.item

        return <MessageLabel message={msg} me={me} />
    })

    // auto-scroll
    const listRef = useRef<FlatList>(null)

    const autoScroll = () => {
        listRef.current?.scrollToEnd({ animated: true })
    }

    useEffect(() => {
        autoScroll()
    }, [messages])

    return <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={0}
        >
            {/* List */}
            <FlatList
                style={styles.list}
                onLayout={() => { autoScroll() }}
                ref={listRef}
                data={messages}
                renderItem={renderMessages}
                ListFooterComponent={<View style={styles.listFoot} />}
                automaticallyAdjustKeyboardInsets={true}
            />
            {/* Bottom */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputText}
                    value={message}
                    onChangeText={setMessage}
                    multiline={true}
                    placeholder="message" />
                <SendButton width={`${buttonWidth}%`} onPress={() => { sendMessage() }} />
            </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
}

export default Messages
