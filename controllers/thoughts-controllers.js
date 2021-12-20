const { Thoughts, User} = require('../models');

const thoughtsController = {
    getAllThoughts(req, res) {
        Thoughts.find({})
          .populate({
            path: 'username',
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbthoughtsData => res.json(dbthoughtsData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
    
    // get a THought by id
    getThoughtById({params}, res) {
        Thoughts.findOne({_id: params.thoughtId})
        
        .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought with that ID'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // create thought
    createThought({ params, body }, res) {
        Thoughts.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: body.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No user found with this id"});
              return;
            }
            res.json();
          })
            .catch((err) => {
              console.log(err)
              res.status(400).json(err)
          });
      },

    //update thoughts by Id
    updateThoughts({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.status(400).json(err));
    },
    //delete thought
    deleteThoughts({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.thoughtId })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No Thoughts found with this id!' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.status(400).json(err));
    },

    
    //add reaction
    addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbReactionData => {
                if (!dbReactionData) {
                    res.status(404).json({ message: 'No reaction found with this id!' });
                    return;
                }
                res.json(dbReactionData);
            })
            .catch(err => res.json(err));
    },
    //remove reactions
    removeReaction({ params }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },
};

module.exports = thoughtsController;