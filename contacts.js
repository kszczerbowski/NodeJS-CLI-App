const fs = require("fs/promises");
const path = require("node:path");
const nanoid = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const jsonList = JSON.parse(data.toString());
  console.table(jsonList);
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath);
  const jsonList = JSON.parse(data.toString());
  if (jsonList.find((contact) => contact.id === contactId) === undefined) {
    console.log(`Sorry, there is no contact with contact ID ${contactId}!`);
    return;
  }
  const searchedContact = jsonList.find((contact) => contact.id === contactId);
  console.log(searchedContact);
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath);
  const jsonList = JSON.parse(data.toString());
  if (jsonList.find((contact) => contact.id === contactId) === undefined) {
    console.log(`Sorry, there is no contact with contact ID ${contactId}!`);
    return;
  }
  const newList = jsonList.filter((contact) => contact.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(newList));
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath);
  const jsonList = JSON.parse(data.toString());
  const newList = [...jsonList, { id: nanoid.nanoid(), name, email, phone }];
  fs.writeFile(contactsPath, JSON.stringify(newList));
}

module.exports = {
  listContacts,
  removeContact,
  addContact,
  getContactById,
};
