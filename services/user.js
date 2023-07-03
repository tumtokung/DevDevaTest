const user = require("../models/user");

module.exports = class userService {

    static async getAllUser() {
        try {
            const users = await user.find();
            return users;
        } catch (error) {
            console.log("getAllUser service error >> ", error);
        }

    }

    static async getUserById(userId) {
        try {
            const userOne = await user.findById({ '_id': userId });
            return userOne;
        } catch (error) {
            console.log("getUserById service error >> ", error);
        }
    }


    static async createUser(data) {
        try {
            const newUser = {
                firstName: data.firstName,
                lastName: data.lastName,
                gender: data.gender,
                birthDate: data.birthDate,
                image: data.image,
            }
            const response = await new user(newUser).save();
            return response;
        } catch (error) {
            console.log("createUser service error >> ", error);
        }
    }

    static async updateUser(userId, data) {
        try {
            const {firstName, lastName, gender, birthDate, image} = data;
            const updateResponse = await user.findByIdAndUpdate({ _id: userId },
                { firstName, lastName, gender, birthDate, image }, {new: true});
            return updateResponse;
        } catch (error) {
            console.log("updateUser service error >> ", error);
        }
    }

    static async deleteUser(userId) {
        try {
            const deletedResponse = await user.findByIdAndDelete(userId);
            return deletedResponse;
        } catch (error) {
            console.log("deleteUser service error >> ", error);
        }

    }

}
