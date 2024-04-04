import { ScrollView, StyleSheet, Text, View } from "react-native"
import { Theme } from "../../core/config/theme"
import { SafeAreaView } from "react-native-safe-area-context"
import { createRef, useEffect, useState } from "react"
import { DefaultTextInput } from "../../core/components/textInput"
import DefaultErrorLabel from "../../core/components/error/DefaultErrorLabel"
import { DefaultButton } from "../../core/components/button"
import { dbCreateContact } from "../../core/config/database"
import { Contact } from "../../core/model/contact"
import { DefaultCheckBox } from "../../core/components/checkbox"
import { CheckBoxValue } from "../../core/model/checkbox"
import { getContacts } from "../../core/redux/redux.store"
import { useDispatch } from "react-redux"

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

const Create = ({ navigation }: any) => {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confSenha, setConfSenha] = useState("")

    // error
    const [emailError, setEmailError] = useState(false)
    const [senhaError, setSenhaError] = useState(false)
    const [confSenhaError, setConfSenhaError] = useState(false)

    //
    const dispatch = useDispatch<any>()

    // checkBox
    enum checkBoxType {
        ALUNO = "Aluno",
        PROFESSOR = "Professor"
    }

    const [checkBox, setCheckBox] = useState<CheckBoxValue[]>([
        { name: checkBoxType.ALUNO, active: true },
        { name: checkBoxType.PROFESSOR, active: false }
    ])

    // create
    const create = async () => {
        let hasError = false

        setEmailError(false)
        setSenhaError(false)
        setConfSenhaError(false)

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

        // confSenha
        if (confSenha != senha) {
            setConfSenhaError(true)
            return
        }

        // create
        const newContact: Contact = {
            name: email.toLocaleLowerCase(),
            password: senha,
            type: checkBox.filter((value) => {
                if (value.active == true) return value
            })[0].name == checkBoxType.ALUNO ? "aluno" : "professor"
        }

        console.log(`Create: ${newContact.name} - ${newContact.password} - ${newContact.type}`)

        await dbCreateContact(newContact)
        dispatch(getContacts())

        setEmail("")
        setSenha("")
        setConfSenha("")
    }

    // back
    const goBack = () => {
        navigation.navigate("/")
    }

    // autoScroll
    const listRef = createRef<ScrollView>()

    const autoScroll = () => {
        listRef.current?.scrollToEnd({ animated: true })
    }

    useEffect(() => {
        autoScroll()
    }, [confSenhaError, emailError, senhaError])

    return <SafeAreaView style={styles.container}>
        <ScrollView
            ref={listRef}
            onLayout={autoScroll}
            keyboardShouldPersistTaps={"always"}
        >
            <View style={styles.view}>
                <View style={styles.image} />

                <View style={styles.containerText}>
                    <Text style={styles.textTitle}>Cadastrar Usuário</Text>
                    <Text style={styles.textBody} >Use seu e-email institucional para realizar o cadastro</Text>
                </View>

                <DefaultTextInput
                    value={email}
                    setValue={setEmail}
                    hintText="E-mail"
                    type="normal" />
                <DefaultErrorLabel errorText="Email Inválido" hasError={emailError} marginTop={5} marginBottom={15} />

                <DefaultTextInput
                    value={senha}
                    setValue={setSenha}
                    hintText="Senha"
                    marginTop={10}
                    marginBottom={10}
                    type="normal" />
                <DefaultErrorLabel errorText="Senha Inválido" hasError={senhaError} marginTop={5} marginBottom={15} />

                <DefaultTextInput
                    value={confSenha}
                    setValue={setConfSenha}
                    hintText="Confirmar Senha"
                    marginBottom={(confSenhaError) ? 0 : 20}
                    type="normal" />
                <DefaultErrorLabel errorText="Senhas Diferentes" hasError={confSenhaError} marginTop={5} marginBottom={15} />

                <DefaultCheckBox options={checkBox} setOptions={setCheckBox} type="one" />

                <DefaultButton onPress={async () => { await create() }} text="Cadastrar" type="claro" marginBottom={10} width={"90%"} />
                <DefaultButton onPress={() => { goBack() }} text="Voltar" type="escuro" width={"90%"} marginBottom={20} />
            </View>
        </ScrollView>
    </SafeAreaView>
}

export default Create
