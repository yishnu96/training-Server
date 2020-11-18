const Training= require('../models/training.model.js');
const Courses = require('../models/courses.model')
// Create and Save a new training
exports.create = async (req, res) => {

    const title = req.body.title;
    const description = req.body.description;
    const training = await Post.findById(req.body.training);

    if(training){
        let _course = await Courses({
            title: title,
            description: description,
        })
        Training.courses.push(_course)
        _course.save()
        .then((_course)=>{
            return res.status(200).json({
                message : 'Training Created',
                status: 200,
                data: _newTweet,
                error: false
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
              message: "Internal Server Error",
              status: 500,
              data: null,
              error: true
            });
          })
    }

};

exports.findAll = (req, res) => {
    Courses.find()
    .then(courses => {
        res.send(courses);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error in fetching Courses",
            status: 500,
            data: null,
            error: true
        });
    });
};


// Update  Training
exports.update = (req, res) => {

       if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty",
            status: 400,
            data: null,
            error: true
        });
    }

    Training.findByIdAndUpdate(req.params.courseId, {
        title: title,
        description: description,
    }, {new: true})
    .then(courses => {
        if(!courses) {
            return res.status(404).send({
                message: "courses Not Exists",
                status: 404,
                data: null,
                error: true
            });
        }

        res.send(courses);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "courses Not Exists",
                status: 404,
                data: null,
                error: true
            });                
        }
        return res.status(500).send({
            message: "Error In Updating",
            status: 500,
            data: null,
            error: true
        });
    });
};

// Delete courses
exports.delete = (req, res) => {
    Courses.findByIdAndRemove(req.params.id)
    .then(courses => {
        if(!courses) {
            return res.status(404).send({
                message: "courses Not Found",
                status: 404,
                data: null,
                error: true
            });
        }
        res.send({message: "courses deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "courses Not Exists",
                status: 404,
                data: null,
                error: true
            });                
        }
        return res.status(500).send({
            message: "Error in Delete courses",
            status: 500,
            data: null,
            error: true
        });
    });
};