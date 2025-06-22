import Contact from '../models/Contact.js';
import HttpError from '../helpers/HttpError.js';

async function listContacts(query, { page = 1, limit = 20, favorite } = {}) {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const offset = (pageNum - 1) * limitNum;

    const where = { ...query };
    if (favorite) {
        where.favorite = favorite;
    }

    const { count, rows } = await Contact.findAndCountAll({
        where,
        limit: limitNum,
        offset,
        order: [['createdAt', 'DESC']],
    });

    return {
        contacts: rows,
        pagination: {
            total: count,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(count / limitNum),
            hasNextPage: pageNum < Math.ceil(count / limitNum),
            hasPrevPage: pageNum > 1,
        },
    };
}

async function getContactById(query) {
    return Contact.findOne({ where: query });
}

async function removeContact(query) {
    const contact = await getContactById(query);
    if (!contact) {
        throw HttpError(404);
    }

    await Contact.destroy({ where: query });
    return contact;
}

async function addContact(payload) {
    return Contact.create(payload);
}

async function updateContact(query, payload) {
    const contact = await getContactById(query);
    if (!contact) {
        throw HttpError(404);
    }

    const [_, updatedContact] = await Contact.update(payload, { where: query, returning: true });

    return updatedContact[0];
}

async function updateStatusContact(query, favorite) {
    return updateContact(query, { favorite });
}

const contactsService = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact,
};

export default contactsService;
