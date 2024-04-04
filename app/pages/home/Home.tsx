import { ListRenderItem, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { Message } from "../../core/model/message"
import { Theme } from "../../core/config/theme"
import { DefaultTextInput } from "../../core/components/textInput"
import { createRef, useEffect, useRef, useState } from "react"
import { DefaultButton } from "../../core/components/button"
import { dbLogin, initDB } from "../../core/config/database"
import { useDispatch, useSelector } from "react-redux"
import { storeStateType } from "../../core/redux"
import { getContacts, getMessages, setLogin } from "../../core/redux/redux.store"
import DefaultErrorLabel from "../../core/components/error/DefaultErrorLabel"

const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.bg2,
        height: "100%",
    },
    view: {
        width: "100%",
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
        marginBottom: 10
    },
    image: {
        height: 190,
        width: 190,
        marginTop: 40,
        backgroundColor: Theme.bg1
    }
})

const Home = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [emailError, setEmailError] = useState(false)
    const [senhaError, setSenhaError] = useState(false)

    const [loginError, setLoginError] = useState(false)

    // redux
    const stock = useSelector((state: storeStateType) => state.stock)
    const dispatch = useDispatch<any>()

    const me = stock.me

    // init
    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        await initDB()

        dispatch(getContacts())
        dispatch(getMessages())
    }

    // render
    const renderMessages: ListRenderItem<Message> = ((list) => {
        const message = list.item

        return <></>
    })

    // login
    const login = async () => {
        let hasError = false

        setEmailError(false)
        setSenhaError(false)
        setLoginError(false)

        // validate
        let regex: RegExp = /^\S+@\S*ifpr\S*/

        if (email === "" || !regex.test(email)) {
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
        let login = await dbLogin(email.toLocaleLowerCase(), senha)

        if (login.id == 0) {
            setLoginError(true)
            return
        } else {
            console.log(`Login: ${login.name} - ${login.type}`)
            dispatch(setLogin(login))
            navigation.navigate("/messages")
        }
    }

    // create
    const create = () => {
        navigation.navigate("/create")
    }

    // autoScroll
    const listRef = createRef<ScrollView>()

    const autoScroll = () => {
        listRef.current?.scrollToEnd({ animated: true })
    }

    useEffect(() => {
        autoScroll()
    }, [loginError, emailError, senhaError])

    return <SafeAreaView style={styles.container}>
        <ScrollView
            ref={listRef}
            onLayout={autoScroll}
            keyboardShouldPersistTaps={"always"}
        >
            <View style={styles.view}>
                <View style={styles.image} />
                <View style={styles.containerText}>
                    <Text style={styles.textTitle}>Acesso ao Chat</Text>
                    <Text style={styles.textBody} >Use seu e-email e senha cadastrados para acessar o painel de conversas</Text>
                </View>

                <DefaultTextInput
                    value={email}
                    setValue={setEmail}
                    hintText="E-mail" />
                <DefaultErrorLabel errorText="Email Inválido" hasError={emailError} marginTop={5} marginBottom={15} />

                <DefaultTextInput
                    value={senha}
                    setValue={setSenha}
                    hintText="Senha"
                    marginTop={10}
                    marginBottom={(loginError || senhaError) ? 0 : 20} />
                <DefaultErrorLabel errorText="Senha Inválida" hasError={senhaError} marginTop={5} marginBottom={15} />
                <DefaultErrorLabel errorText="Login Inválido" hasError={loginError} marginTop={5} marginBottom={15} />

                <DefaultButton onPress={() => { login() }} text="Login" type="claro" marginBottom={10} width={"90%"} />
                <DefaultButton onPress={() => { create() }} text="Cadastrar" type="escuro" width={"90%"} marginBottom={20} />
            </View>
        </ScrollView>
    </SafeAreaView>
}

export default Home
