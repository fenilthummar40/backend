const Profile = require ('../models/profileModel');

exports.createProfile = async (req, res) => {
    try {
        const newProfile = new Profile({
            userid: req.body.userid,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            city: req.body.city,
            pin_code: req.body.pin_code,
            DOB: req.body.DOB,
            address: req.body.address,
        });

        const savedProfile = await newProfile.save();

        res.status(201).json({
            success: true,
            profile: savedProfile
        });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.listProfile = async (req, res) => {
    try {
        const profiles = await Profile.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            profiles
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

