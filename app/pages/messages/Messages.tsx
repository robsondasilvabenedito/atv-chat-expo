import { FlatList, ListRenderItem, SafeAreaView, StyleSheet, TextInput, View } from "react-native"
import { Theme } from "../../core/config/theme"
import { useDispatch, useSelector } from "react-redux"
import { storeStateType } from "../../core/redux"
import { Contact } from "../../core/model/contact"
import { Message } from "../../core/model/message"
import MessageLabel from "./components/messageLabel"
import { useEffect, useRef, useState } from "react"
import SendButton from "./components/sendButton"
import { getMessages } from "../../core/redux/redux.store"
import { dbCreateMessage } from "../../core/config/database"
import { DefaultButton } from "../../core/components/button"

const labelWidth: number = 86
const buttonWidth: number = 100 - labelWidth

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        padding: 8,
        justifyContent: "space-between"
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

type FilterType = "todos" | "alunos" | "professores"

const Messages = ({ navigation }: any) => {
    const [message, setMessage] = useState("")
    const [filter, setFilter] = useState<FilterType>("todos")

    // redux
    const stock = useSelector((state: storeStateType) => state.stock)
    const dispatch = useDispatch<any>()

    let contacts: Contact[] = stock.contacts
    let msgAll: Message[] = stock.msgAll
    let msgAlunos: Message[] = stock.msgAlunos
    let msgProfessor: Message[] = stock.msgProfessor
    let me = stock.me

    // send
    const sendMessage = async () => {
        if (message == "") return

        // Messsage
        const newMessage: Message = {
            contactId: me.id!,
            text: message,
            timestamp: new Date().toString()
        }

        // send
        await dbCreateMessage(newMessage)
        dispatch(getMessages())
        console.log(`Send: ${newMessage.text}`)

        setMessage("")
    }

    // Render
    const renderMessages: ListRenderItem<Message> = ((list) => {
        let msg = list.item

        return <MessageLabel message={msg} me={me} contacts={contacts} />
    })

    // Set filter
    const changeFilter = (newFilter: FilterType) => {
        // validate
        if (filter == newFilter) {
            return
        }

        // useState
        setFilter(newFilter)
    }

    // auto-scroll
    const listRef = useRef<FlatList>(null)

    const autoScroll = () => {
        listRef.current?.scrollToEnd({ animated: true })
    }

    useEffect(() => {
        autoScroll()
    }, [msgAll, msgAlunos, msgProfessor, filter])

    return <SafeAreaView style={styles.container}>
        {/* Filter */}
        <View style={styles.header}>
            <DefaultButton
                onPress={
                    filter === "todos" ?
                        () => { } :
                        () => { changeFilter("todos") }}
                text="Todos" type={filter === "todos" ? "escuro" : "claro"}
                width={"32%"} />
            <DefaultButton
                onPress={
                    filter === "alunos" ?
                        () => { } :
                        () => { changeFilter("alunos") }}
                text="Alunos"
                type={filter === "alunos" ? "escuro" : "claro"}
                width={"32%"} />
            <DefaultButton
                onPress={
                    filter === "professores" ?
                        () => { } :
                        () => { changeFilter("professores") }}
                text="Professores"
                type={filter === "professores" ? "escuro" : "claro"}
                width={"32%"} />
        </View>
        {/* List */}
        <FlatList
            style={styles.list}
            onLayout={() => { autoScroll() }}
            ref={listRef}
            data={filter == "todos" ? msgAll : (filter == "alunos" ? msgAlunos : msgProfessor)}
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
            <SendButton width={`${buttonWidth}%`} onPress={async () => { sendMessage() }} />
        </View>
    </SafeAreaView>
}

export default Messages
