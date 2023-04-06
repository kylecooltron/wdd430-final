var express = require('express');
var router = express.Router();
module.exports = router;



router.get('/', async (req, res, next) => {
    // # swagger.ignore = true
    /**
     * Returns login state
     *  If login succesful user profile information is saved to database
     * 
     */
    try {
        if (req.oidc.isAuthenticated()) {
            // User is logged in, save user profile info to DB
            const user_profile_info = {
                profile_id: req.oidc.user.sub,
                name: req.oidc.user.name
            }
            // let msg;
            // if (!await mongodb.getDb().db(database).collection(collection).findOne(user_profile_info)) {
            //     const response = await mongodb.getDb().db(database).collection(collection).insertOne(user_profile_info);
            //     if (response.acknowledged) {
            //         msg = `User profile info saved. Name: ${user_profile_info.name}, Profile ID: ${user_profile_info.profile_id}`
            //     } else {
            //         msg = 'Some error occurred while adding new user to db.';
            //     }
            // } else {
            //     msg = "User info already in database";
            // }
            // send response
            res.status(200).json({
                "authorized": true,
                // "message": msg,
                "name": user_profile_info.name,
                // "profile_id": user_profile_info.profile_id,
            });

        } else {
            // User is not logged in
            res.status(200).json({
                "authorized": false,
            });
        }

    } catch (err) {
        res.status(500).json(err);
    }
});
