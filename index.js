const argv = require('yargs').argv;

const contacts = require('./contacts');

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contactList = await contacts.listContacts();
      console.log(contactList);
      break;

    case 'get':
      const contactById = await contacts.getContactById(`${id}`);
      if(!contactById){
        throw new Error(`Contact with id ${id} is not found.`)
      }
      console.log(contactById);
      break;

    case 'add':
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
      const removedContact = await contacts.removeContact(`${id}`);
      console.log(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);