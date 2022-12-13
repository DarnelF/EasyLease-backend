var express = require('express');
var router = express.Router();

const Scenary = require('../models/scenary');
const { checkBody } = require('../modules/checkBody');

router.get('/testroute', (req, res) => {
    res.json({ result: true })
  });

  router.post('/new', (req, res) => {
    if (!checkBody(req.body, ['client', 'name', 'type', 'duration', 'amount', 'creationDate', 'contratStart', 'contratEnd', 'residualValue'])) {
      res.json({ result: false, error: 'Champs vides ou manquants !' });
      return;
    }
  
    // Check if the scenary has not already been registered
    Scenary.findOne({ name: { $regex: new RegExp(req.body.name, 'i') } }).then(data => {
      if (data === null) {
  
        const newScenary = new Scenary({
            client: req.body.client,
            name: req.body.name,
            type: req.body.type,
            duration: req.body.duration,
            amount : req.body.amount,
            creationDate: req.body.creationDate,
            contratStart: req.body.contratStart,
            contratEnd: req.body.contratEnd,
            residualValue: req.body.residualValue,
        });
  
        newScenary.save().then(newScenary => {
          res.json({ result: true, name: newScenary.name });
        });
      } else {
        // Scenary already exists in database
        res.json({ result: false, error: 'Scenario déja existant' });
      }
    });
  });

  router.get('/all', (req,res) => {
    Scenary.find()
    .then(data => {
        if (data) {
            res.json({result: true, scenaries : data})
        } else {
            res.json({result : false, error: "Pas de scénarios !"})
        }
    })
  });

  router.get('/:name', (req,res) => {
    Scenary.findOne({ name: { $regex: new RegExp(req.params.name, 'i') } })
    .then(data => {
        if (data) {
            res.json({result: true, scenary: data})
        } else {
            res.json({result: false, error: "Scenario pas trouver !"})
        }
    })
  });


module.exports = router;