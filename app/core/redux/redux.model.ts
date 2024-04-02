import { Contact } from "../model/contact"
import { Message } from "../model/message"

export interface StateType {
    me: Contact
    contacts: Contact[] 
    messages: Message[]
}