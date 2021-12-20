const { thoughts, Reaction } = require('../models');

const thoughtsController = {
    // get all thoughts
    getAllThoughts(req, res) {
        thoughts.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')

            .sort({ _id: -1 })
            .then(dbthoughtsdata => res.json(dbthoughtsdata))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //get one thought by id
    getThoughtById({ params }, res) {
        thoughts.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
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
    createThought({ body }, res) {
        thoughts.create(body)
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },
    //update thoughts by Id
    updateThoughts({ params, body }, res) {
        thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
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
        thoughts.findOneAndDelete({ _id: params.id })
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
        Reaction.findOneAndUpdate(
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
        Reaction.findOneAndUpdate(
            { _id: params.reactionId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbReactionData => res.json(dbReactionData))
            .catch(err => res.json(err));
    },
};

module.exports = thoughtsController;