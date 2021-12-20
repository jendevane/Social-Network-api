const {User } = require('../models');
const userController = {
    getAllUsers(req, res) {
        User.find({})
            .then(dbthoughtsdata => res.json(dbthoughtsdata))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //get one user by ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // create User
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },
    //update User by Id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    //delete User
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    
    //add friend
    createFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.commentId },
            { $push: { friends: body } },
            { new: true, runValidators: true }
        )
            .then(dbFriendsData => {
                if (!dbFriendsData) {
                    res.status(404).json({ message: 'No Friends found with this id!' });
                    return;
                }
                res.json(dbFriendsData);
            })
            .catch(err => res.json(err));
    },
    //remove friends
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.friendId },
            { $pull: { friend: { friendId: params.friendId } } },
            { new: true }
        )
            .then(dbFriendData => res.json(dbFriendData))
            .catch(err => res.json(err));
    },
};
module.exports = userController;
