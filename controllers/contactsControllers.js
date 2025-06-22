import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
    const contacts = await contactsService.listContacts();
    res.json(contacts);
};

const getOneContact = async (req, res) => {
    const { id } = req.params;
    const contact = await contactsService.getContactById(id);
    if (!contact) {
        throw HttpError(404);
    };
    res.json(contact);
};

const deleteContact = async (req, res) => {
    const { id } = req.params;
    const contact = await contactsService.removeContact(id);
    if (!contact) {
        throw HttpError(404);
    };
    res.json(contact);
};

const createContact = async (req, res) => {
    const contact = await contactsService.addContact(req.body);
    res.status(201).json(contact);
};

const updateContact = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
        throw HttpError(400, "Body must have at least one field");
    }

    const contact = await contactsService.updateContact(id, req.body);
    if (!contact) {
        throw HttpError(404);
    };
    res.json(contact);
};

const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const { favorite } = req.body;
    const contact = await contactsService.updateStatusContact(id, favorite);
    res.json(contact);
};

const ctrl = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
}

export default ctrl;