import { FlatList, KeyboardAvoidingView, ListRenderItem, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { Message } from "../../core/model/message"
import { Theme } from "../../core/config/theme"
import { DefaultTextInput } from "../../core/components/textInput"
import { useEffect, useState } from "react"
import { DefaultButton } from "../../core/components/button"
import { initDB } from "../../core/config/database"
import { useDispatch, useSelector } from "react-redux"
import { storeStateType } from "../../core/redux"

const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.bg2,
        flex: 1
    },
    keybord: {
        flex: 1,
        alignItems: "center"
    },
    containerText: {
        width: "65%",
        marginTop: 30,
        marginBottom: 15,
        alignItems: "center",
    },
    textTitle: {
        color: Theme.fg2,
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10,
    },
    textBody: {
        color: Theme.fg2,
        fontSize: 18,
        textAlign: "center",
        fontWeight: "300",
    },
    image: {
        height: 190,
        width: 190,
        marginTop: 30,
        backgroundColor: Theme.bg1
    }
})

const Home = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [emailError, setEmailError] = useState(false)
    const [senhaError, setSenhaError] = useState(false)

    // redux
    const stock = useSelector((state: storeStateType) => state.stock)
    const dispatch = useDispatch<any>()

    const me = stock.me

    // init
    useEffect(() => {
        initDB()
    }, [])

    const init = async () => {
        await initDB()
    }

    // render
    const renderMessages: ListRenderItem<Message> = ((list) => {
        const message = list.item

        return <></>
    })

    // login
    const login = () => {
        let hasError = false

        setEmailError(false)
        setSenhaError(false)

        // validate
        if (email === "") {
            hasError = true
            setEmailError(true)
        }

        if (senha === "") {
            hasError = true
            setSenhaError(true)
        }

        // error?
        if (hasError) {
            console.log("Credenciais inválidas")
            return
        }

        // ok
        console.log(`Login ${email}, Senha: ${senha}`)
        navigation.navigate("/messages")
    }

    return <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keybord}
        >
            <View style={styles.image} />
            <View style={styles.containerText}>
                <Text style={styles.textTitle}>Acesso ao Chat</Text>
                <Text style={styles.textBody} >Use seu e-email e senha cadastrados para acessar o painel de conversas</Text>
            </View>

            <DefaultTextInput
                value={email}
                setValue={setEmail}
                hintText="E-mail"
                errorText="Email Invalido"
                hasError={emailError} />
            <DefaultTextInput
                value={senha}
                setValue={setSenha}
                hintText="Senha"
                errorText="Senha Invalida"
                hasError={senhaError}
                marginTop={10}
                marginBottom={20} />

            <DefaultButton onPress={() => { login() }} text="Login" type="claro" marginBottom={10} />
            <DefaultButton onPress={() => { }} text="Cadastrar" type="escuro" />
        </KeyboardAvoidingView>
    </SafeAreaView>
}

export default Home
