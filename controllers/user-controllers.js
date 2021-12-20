const {User,Thoughts } = require('../models');
const userController = {
    getAllUsers(req, res) {
        User.find({})
          .populate([
            {
              path: "thoughts",
              select: "-__v",
            },
            {
              path: "friends",
              select: "-__v"
            }
          ])
          .select("-__v")
          .sort({ _id: -1 })
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      },
    getUserById({ params},res) {
        User.findOne({_id: params.userId})
        .populate ({
            path: 'thoughts',
            select: '-__v'
        })
        .populate ({
            path:'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            res.status(400).json(err)
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
        User.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    //delete User
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                dbUserData.thoughts.forEach(async thought => {
                    await Thoughts.findOneAndDelete({ _id: thought._id });
                });
    
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    
    //add friend
    createFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId} },
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
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(dbFriendData => res.json(dbFriendData))
            .catch(err => res.json(err));
    },
};
module.exports = userController;
