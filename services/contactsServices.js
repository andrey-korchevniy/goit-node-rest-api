import Contact from "../models/Contact.js";
import HttpError from "../helpers/HttpError.js";

async function listContacts() {
    return Contact.findAll();
}

async function getContactById(id) {
    return Contact.findByPk(id);
}

async function removeContact(id) {
    const contact = await getContactById(id);
    if (!contact) {
        throw HttpError(404);
    }

    await Contact.destroy({ where: { id } });
    return contact;
}

async function addContact(payload) {
    return Contact.create(payload);
}

async function updateContact(id, payload) {
    const contact = await getContactById(id);
    if (!contact) {
        throw HttpError(404);
    }

    const [_, updatedContact] = await Contact.update(payload, { where: { id }, returning: true });

    return updatedContact[0];
}

async function updateStatusContact(id, favorite) {
    return updateContact(id, { favorite });
}

const contactsService = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact,
}

export default contactsService;
