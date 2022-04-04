const { check, validationResult } = require("express-validator");
const db = require("../db/db");

const checkHist = (clientID) => new Promise(
  (resolve, reject) => {
    db.query(
      "SELECT * FROM `Sales` WHERE clientID = ?",
      clientID,
      (err, result, fields) => {
        if (err) {
          reject(false);
        }

        if (result.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    );
  }
);

const validate = (method) => {
  switch (method) {
    case "getQuote": {
      return [
        check("clientID")
          .exists()
          .not()
          .isEmpty()
          .withMessage('Bad Request'),
        check("state")
          .exists()
          .not()
          .isEmpty()
          .withMessage('Bad Request'),
        check("gallons")
          .exists()
          .not()
          .isEmpty()
          .isNumeric()
          .custom((val, { req }) => { return req.body.gallons >= 0 })
          .withMessage('Bad Request')
      ];
    }
    case "saveQuote": {
      return [
        check("clientID")
          .exists()
          .not()
          .isEmpty()
          .withMessage('Bad Request'),

        check("address")
          .exists()
          .not()
          .isEmpty()
          .withMessage('Bad Request'),

        check("gallons")
          .exists()
          .not()
          .isEmpty()
          .withMessage('Bad Request'),

        check("quote")
          .exists()
          .not()
          .isEmpty()
          .withMessage('Bad Request')
      ]
    }
    case "getHistory": {
      return [
        check("clientID")
          .exists()
          .not()
          .isEmpty()
          .withMessage("Bad Request")
      ]
    }
  }
};

// const getQuote = async (req, res) => {

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const currentPrice = 1.5;
//   const profitFactor = 0.1;

//   if (!req.body.clientID || !req.body.location || !req.body.gallons) {
//     return res.sendStatus(400);
//   } else {
//     const clientID = req.body.clientID;
//     const location = req.body.location;
//     const gallons = req.body.gallons;

//     let locationFactor = 0.04;
//     if (location == "TX") {
//       locationFactor = 0.02;
//     }

//     let userHasHistory = await hasHistory(clientID);
//     let rateHistoryFactor = (userHasHistory) ? 0.01 : 0;

//     let gallonRequestedFactor = 0.03;
//     if (gallons > 1000) {
//       gallonRequestedFactor = 0.02;
//     }

//     const margin = Number(
//       (
//         currentPrice *
//         (locationFactor -
//           rateHistoryFactor +
//           gallonRequestedFactor +
//           profitFactor)
//       ).toFixed(4)
//     );
//     const quote = currentPrice + margin;
//     const total = gallons * quote;
//     return res.send({ margin, quote, total });
//   }
// };


const getHistory = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const clientID = req.body.clientID;

  if (!clientID) {
    return res.sendStatus(400);
  } else {
    db.query(
      "SELECT * FROM `quotes` WHERE clientID = ?",
      clientID,
      (err, result, fields) => {
        if (err) {
          return next(new Error([err]));
        }

        return res.json(result).status(200);
      }
    );
  }
};


const saveQuote = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const date = new Date();
    const clientID = req.body.clientID;
//   const location = req.body.location;
    const gallons = req.body.gallons;
    const total= req.body.total
//   const quote = req.body.quote;
//   const total = gallons * quote;

    db.query(
        "INSERT INTO `sale` (clientID, Gallons, Delivery State, Date, Total) VALUES (?, ?, ?, ?, ?)",
        [clientID, gallons, state, date, total],
        (err, result, fields) => {
            if (err) {
            next(new Error([err]));
            return res.sendStatus(400);
            } else {
            return res.sendStatus(200);
            }
        }
    );
}


module.exports = {
//   getQuote,
  getHistory,
  saveQuote,
//   validate,
};
