import express from 'express';
import validator from '../middleware/validator.js';

const router = express.Router();
let contacts = [];

router.get('/new', (req, res) => {
    res.render('NewContact');
})

router.get('/edit/:contactId', (req, res) => {
    const { contactId } = req.params;
    const [ contact ] = contacts.filter((contact, index) => Number(contactId) === index);
    res.render('EditContact', { contactId: contactId, contact: contact });
})


router.post('/new', validator, (req, res) => {
    const contact = req.body;
    contacts.push(contact);
    res.redirect('/');
})

router.post('/edit/:contactId', validator, (req, res) => {
    const { contactId } = req.params;
    const editedContact = req.body;
    contacts = contacts.map((contact, index) => Number(contactId) === index ? editedContact : contact)
    res.redirect('/');
})

router.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    contacts = contacts.filter((contact, index) => index !== Number(id));
    res.redirect('/')
})

export { router, contacts };
