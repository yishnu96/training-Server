const Training= require('../models/training.model.js');

// Create and Save a new training
exports.create = (req, res) => {

    // console.log( req);

    const title = req.body.title;
    const description = req.body.description;
    const duration = req.body.duration;

    if(!req.body) {
        return res.status(400).send({
            message: "Training Cannot be empty",
            status: 500,
            data: null,
            error: true
        });
    }



    Training.findOne({ title: title }, function(err, result){
        if(err) {
            console.error('Error in fetching complaints tweets');
                  return res.status(500).json({
                    message: "Internal Server Error",
                    status: 500,
                    data: null,
                    error: true
                  });
        }

        if(!result){
            let _newTraining = new Training({
                title: title,
                description: description,
                duration : duration,
            });

            _newTraining.save()
            .then((_newTraining)=>{
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
        }else{
            return res.status(400).json({
                message: "Training Already Exists",
                status: 400,
                data: null,
                error: true
              });
        }
    })
    
};

exports.findAll = (req, res) => {
    Training.find()
    .then(trainings => {
        res.send(trainings);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error in fetching training",
            status: 500,
            data: null,
            error: true
        });
    });
};


// Update  Training
exports.update = (req, res) => {
       // Validate Request
       if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty",
            status: 400,
            data: null,
            error: true
        });
    }

    Training.findByIdAndUpdate(req.params.id, {
        title: title,
        description: description,
        duration : duration,
    }, {new: true})
    .then(training => {
        if(!training) {
            return res.status(404).send({
                message: "Training Not Exists",
                status: 404,
                data: null,
                error: true
            });
        }
        res.send(training);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Training Not Exists",
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

// Delete Training
exports.delete = (req, res) => {
    Training.findByIdAndRemove(req.params.id)
    .then(training => {
        if(!training) {
            return res.status(404).send({
                message: "Training Not Found",
                status: 404,
                data: null,
                error: true
            });
        }
        res.send({message: "training deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Training Not Exists",
                status: 404,
                data: null,
                error: true
            });                
        }
        return res.status(500).send({
            message: "Error in Delete Training",
            status: 500,
            data: null,
            error: true
        });
    });
};