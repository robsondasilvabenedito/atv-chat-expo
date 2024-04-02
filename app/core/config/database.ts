import SQLite from "react-native-sqlite-storage"
import { Contact } from "../model/contact"
import { Message } from "../model/message"

SQLite.enablePromise(true)

/**
 * Get DB
 *
 * @returns DB
 */
export const getDB = async () => {
    return SQLite.openDatabase({ name: "expo", location: "default" })
}

/**
 * Reset DB
 */
const resetDB = async () => {
    await SQLite.deleteDatabase({ name: "expo", location: "default" })
}

/**
 * Init DB
 */
export const initDB = async () => {
    // reset
    try {
        await resetDB()
    } catch (error) {
        console.log(`error: ${error}`)
    }

    // check if exist
    let db = await getDB()

    // let result: SQLite.ResultSet = (await db.executeSql("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='Contacts'"))[0]
    // let count: {"count(*)": number} = result.rows.item(0)

    // if (count["count(*)"] === 1) return

    // Contact
    await db.executeSql("CREATE TABLE IF NOT EXISTS Contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT, type TEXT)")

    await dbCreateContact({ name: "lucas", type: "aluno", password: "111111" })
    await dbCreateContact({ name: "marcos", type: "professor", password: "222222" })
    await dbCreateContact({ name: "luan", type: "aluno", password: "333333" })
    await dbCreateContact({ name: "maria", type: "professor", password: "444444" })
    await dbCreateContact({ name: "vitoria", type: "aluno", password: "555555" })
}

/**
 * Create a new contact
 *
 * @param contact Contact
 */
export const dbCreateContact = async (contact: Contact) => {
    const db = await getDB()

    await db.executeSql("INSERT INTO Contacts (name, password, type) VALUES (?, ?, ?)", [contact.name, contact.password!, contact.type])
}

/**
 * Get Contact
 *
 * @param id contact id
 * @returns Contact
 */
export const dbGetContact = async (id: number) => {
    const db = await getDB()

    // contact
    let contact: Contact

    // result
    const result: SQLite.ResultSet = (await db.executeSql("SELECT name, type FROM Contacts WHERE id = ?", [id]))[0]

    contact = result.rows.item(0) as Contact

    return contact
}

/**
 * Get Contacts
 *
 * @returns Contact
 */
export const dbGetContacts = async () => {
    const db = await getDB()

    // contacts
    const contacts: Contact[] = []

    // result
    const result: SQLite.ResultSet = (await db.executeSql("SELECT id, name, type FROM Contacts"))[0]

    for (let i = 0; i < result.rows.length; i++) {
        let contact = result.rows.item(i) as Contact

        contacts.push(contact)
    }

    return contacts
}

export const dbLogin = async (name: string, password: string): Promise<Contact> => {
    const db = await getDB()

    // contact
    const contacts: Contact[] = []

    // result
    const result: SQLite.ResultSet = (await db.executeSql("SELECT id, name, type FROM Contacts WHERE name = ? AND password = ?", [name, password]))[0]

    for (let i = 0; i < result.rows.length; i++) {
        let contact = result.rows.item(i) as Contact

        contacts.push(contact)
    }

    return contacts.length == 0 ? { id: 0, name: "", type: "aluno" } : contacts[0]
}
