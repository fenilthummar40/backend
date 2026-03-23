const Contact = require("../models/contact.model");

exports.createContact = async (req, res) => {
    try {
        const newContact = new Contact({
            userid: req.body.userid,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message,
        });

        const savedContact = await newContact.save();

        res.status(201).json({
            success: true,
            contact: savedContact
        });

    } catch (error){
        res.status(500).json({message: error.message});
    }
};

exports.ListContacts = async (req, res) => {
    try {
        const Contacts = await Contact.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            Contacts
        });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
