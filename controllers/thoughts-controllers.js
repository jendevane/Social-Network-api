const { Thoughts,} = require('../models');

const thoughtsController = {
    getAllThoughts(req, res) {
        Thoughts.find({})
          .populate({
            path: 'userName',
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
        Thoughts.findOne({_id: params.id})
        
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
              { _id: params.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No user found with this id"});
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.json(err));
      },
    //update thoughts by Id
    updateThoughts({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
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
        Thoughts.findOneAndDelete({ _id: params.id })
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
            { _id: params.commentId },
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
            { _id: params.reactionId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbReactionData => res.json(dbReactionData))
            .catch(err => res.json(err));
    },
};

module.exports = thoughtsController;