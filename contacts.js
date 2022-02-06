const { v4 } = require('uuid');

const fs = require("fs/promises");
const path = require("path");
const { mainModule } = require('process');

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  
  // if (!contactById) {
  //   return null;
  // }
  return contactById;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  
  if (idx === -1) {
    return null;
  }
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return contacts[idx];
}

async function addContact(name, email, phone) {
  const newContact= {
    id: v4(),
    name,
    email,
    phone
  }
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
