const userService = require("../services/user");
var fs = require('fs');

module.exports = class user {
    static async apiGetAllUser(req, res, next) {
        try {
            const users = await userService.getAllUser();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async apiGetUserByID(req, res, next) {
        try {
            let id = req.params.id;
            const user = await userService.getUserById(id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async apiCreateUser(req, res, next) {
        try {
            if (!req.body) res.status(404).send(`The URL ${req.originalUrl} No form data found`);
            // set image uri
            let data = { ...req.body };
            if(req.file){
                data = { ...data, image: `http://${req.get('host')}/${req.file.path}` }
            }
            const createUser = await userService.createUser(data);
            res.json(createUser);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async apiUpdateUser(req, res, next) {
        try {
            if (!req.body) res.status(404).send(`The URL ${req.originalUrl} No form data found`);
            let id = req.params?.id;
            let imageUrl = req.body?.image;
            let rootUrl = `http://${req.get('host')}/`;
            let newData = { ...req.body }

            // delete old image in store
            const filePathDelete = imageUrl.slice(rootUrl.length);
            if (req.file) {
                fs.unlink(filePathDelete, function (err) {
                    if (err) console.log(err);
                    else console.log(filePathDelete, ' File deleted!');
                })
                // set new image uri
                newData = { ...newData, image: `${rootUrl}${req.file.path}` }
            }

            const updatedUser = await userService.updateUser(id, newData);
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    static async apiDeleteUser(req, res, next) {
        try {
            const id = req.params.id;
            // get user for delete image 
            const user = await userService.getUserById(id);
            let rootUrl = `http://${req.get('host')}/`;
            // delete image in store
            const filePathDelete = user.image.slice(rootUrl.length);
            fs.unlink(filePathDelete, function (err) {
                if (err) console.log(err);
                else console.log(filePathDelete, ' File deleted!');
            })

            const deleteResponse = await userService.deleteUser(id);
            res.json(deleteResponse);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

};