const router = require('express').Router();
const fs = require('fs');
const path = require("path");

const {formatLedgerData} = require('../modules');

router.get('/', function (req, res) {
  res.status(200).send({});
});

router.get('/ledger/:name', function (req, res) {
  const ledgerName = req.params.name;
  const normalizedPath = path.join(__dirname, "../../data/" + ledgerName + ".json");

  fs.readFile(normalizedPath, 'utf8', (err, data) => {
    if (err) throw err;

    const formattedLedgerData = formatLedgerData(JSON.parse(data));
    res.send(formattedLedgerData);
  });
});

module.exports = router;
