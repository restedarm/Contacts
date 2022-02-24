import { contacts } from "../routes/contactRoutes.js";

const validator = (req, res, next) => {
    const regexUsername = /^[A-Za-z]+\s*[A-Za-z]+$/g;
    const regexPhoneNumber = /^((\+?[3][7][4]\s?)|[0])\(?\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{3}$/g;
    const { username, phone_number } = req.body;
    const { contactId } = req.params;
    const [ contact ] = contacts.filter((contact, index) => Number(contactId) === index);
    const usernameRelust = username.match(regexUsername);
    const phoneNumberResult = phone_number.match(regexPhoneNumber);


    if(!usernameRelust || !phoneNumberResult) {
        if(req.url.search('new') !== -1)
            res.render('NewContact', { isValid: 'Invalid username or phone number.' });
        else if(req.url.search('edit') !== -1)
            res.render('EditContact', { isValid: 'Invalid username or phone number.', contactId: contactId, contact: contact });
    } else {
        next();
    }
}

export default validator;