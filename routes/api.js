const router =require('express').Router();
const db = require('../models');

router.get('/api/workouts', (req,res) => {
    // db.Workout.find({})
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration'
                }
            }
        }
    ])
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});
 
router.post('/api/workouts', (req,res) => {
    db.Workout.create(req.body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});
 
router.put('/api/workouts/:id', (req,res) => {
    db.Workout.findOneAndUpdate({}, { $push: { exercises: req.body } }, { new: true })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });


    // db.Workout.updateOne({_id: req.params.id}, {
    //     $push: {exercises:req.body}
    // }).then(dbWorkout => {
    //     res.json(dbWorkout);
    // })
    // .catch(err => {
    //     res.json(err);
    // });
})
 
 router.get('/api/workouts/range', (req,res) => {
    // db.Workout.find({})
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration'
                }
            }
        }
    ])
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
 });
 
 module.exports = router;