const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "organizations";'
    console.log('in organizations router.get', req.body)
    pool.query(queryText)
        .then(result => {
            console.log(result.rows)
            res.send(result.rows)
        }).catch(error => {
            console.log('error in organizations GET', error)
            res.sendStatus(500);
        })
})

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('in organizations post router')
    const newEntry = req.body;
    console.log(newEntry)
    const queryText = `INSERT INTO "organizations" ("name", "logo", "type", 
                            "address_number", "address_street", "address_unit", "city",
                            "state", "county", "zip", "notes") 
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;
    const queryValues = [
        newEntry.name,
        newEntry.logo,
        newEntry.type,
        newEntry.address_number,
        newEntry.address_unit,
        newEntry.city,
        newEntry.state,
        newEntry.county,
        newEntry.zip,
        newEntry.notes
    ];
    pool.query(queryText, queryValues)
        .then(() => {
            res.sendStatus(201);
            console.log(queryValues)
        }).catch((err) => {
            console.log('Error in router.post on entry router', err);
            res.sendStatus(500);
        })
});

module.exports = router;