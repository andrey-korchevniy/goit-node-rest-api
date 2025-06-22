import contactsService from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';

const getAllContacts = async (req, res) => {
    const { id } = req.user;
    const { page, limit, favorite } = req.query;

    const result = await contactsService.listContacts({ owner: id }, { page, limit, favorite });
    res.json(result);
};

const getOneContact = async (req, res) => {
    const {
        params: { id },
        user: { id: owner },
    } = req;
    const contact = await contactsService.getContactById({ id, owner });
    if (!contact) {
        throw HttpError(404);
    }
    res.json(contact);
};

const deleteContact = async (req, res) => {
    const {
        params: { id },
        user: { id: owner },
    } = req;
    const contact = await contactsService.removeContact({ id, owner });
    if (!contact) {
        throw HttpError(404);
    }
    res.json(contact);
};

const createContact = async (req, res) => {
    const { id } = req.user;
    const contact = await contactsService.addContact({ ...req.body, owner: id });
    res.status(201).json(contact);
};

const updateContact = async (req, res) => {
    const {
        params: { id },
        user: { id: owner },
    } = req;
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
        throw HttpError(400, 'Body must have at least one field');
    }

    const contact = await contactsService.updateContact({ id, owner }, req.body);
    if (!contact) {
        throw HttpError(404);
    }
    res.json(contact);
};

const updateStatusContact = async (req, res) => {
    const {
        params: { id },
        body: { favorite },
        user: { id: owner },
    } = req;
    const contact = await contactsService.updateStatusContact({ id, owner }, favorite);
    res.json(contact);
};

const contactsCtrl = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
};

export default contactsCtrl;
