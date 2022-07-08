const express = require("express");
const liqueurSchema = require("../models/liqueur");

const router = express.Router();

//create liqueur
/**
 * @swagger
 *components:
 *  schemas:
 *     Liqueur:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: name of the liqueur
 *         degreeOfAlcohol:
 *           type: number
 *           description: degree of alcohol of the liqueur
 *         manufacturingDate:
 *           type: date
 *           description: manufacturing date of the liqueur
 *       required:
 *         - name
 *         - degreeOfAlcohol
 *         - manufacturingDate
 *       example:
 *         name: "Johnnie Walker"
 *         degreeOfAlcohol: 40
 *         manufacturingDate: "2020-01-01" 
 */

 /**
  * @swagger
  * /api/liqueurs:
  *  post:
  *    summary: Create a new liqueur
  *    tags: [Liqueur]
  *    requestBody:
  *      required: true
  *      content:
  *        application/json:
  *          schema:
  *            type: object 
  *            $ref: '#/components/schemas/Liqueur'
  *    responses:
  *      200:
  *        description: Successfully created
  */
router.post("/liqueurs", (req, res) => {
    const liqueur = liqueurSchema(req.body);
    liqueur
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// get all liqueurs
 /**
  * @swagger
  * /api/liqueurs:
  *  get:
  *    summary: return all liqueurs
  *    tags: [Liqueur]
  *
  *    responses:
  *      200:
  *        description: all users
  *        content:
  *          application/json:
  *            schema:
  *              type: array
  *              items:
  *                $ref: '#/components/schemas/Liqueur'    
  */
router.get("/liqueurs", (req, res) => {
    liqueurSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


// get a liqueur
/**
  * @swagger
  * /api/liqueurs/{id}:
  *  get:
  *    summary: return a liqueur
  *    tags: [Liqueur]
  *    parameters:
  *      - in: path
  *        name: id
  *        schema:
  *          type: string
  *        required: true
  *        description: the liqueur id
  *    responses:
  *      200:
  *        description: all liqueurs
  *        content:
  *          application/json:
  *            schema:
  *              type: object
  *              $ref: '#/components/schemas/Liqueur'
  *      404:
  *        description: Liqueur not found
  */
router.get("/liqueurs/:id", (req, res) => {
    const { id } = req.params;
    liqueurSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


// update a liqueur
/**
  * @swagger
  * /api/liqueurs/{id}:
  *  put:
  *    summary: update a liqueur
  *    tags: [Liqueur]
  *    parameters:
  *      - in: path
  *        name: id
  *        schema:
  *          type: string
  *        required: true
  *        description: the liqueur id
  *    requestBody:
  *      required: true
  *      content:
  *        application/json:
  *          schema:
  *            type: object 
  *            $ref: '#/components/schemas/Liqueur'
  *    responses:
  *      200:
  *        description:liqueur updated
  *      404:
  *        description: Liqueur not found
  */
router.put("/liqueurs/:id", (req, res) => {
    const { id } = req.params;
    const { name, degreeOfAlcohol, manufacturingDate } = req.body;
    liqueurSchema
        .updateOne({ _id: id }, { $set: { name, degreeOfAlcohol, manufacturingDate } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// delete a liqueur
/**
  * @swagger
  * /api/liqueurs/{id}:
  *  delete:
  *    summary: delete a liqueur
  *    tags: [Liqueur]
  *    parameters:
  *      - in: path
  *        name: id
  *        schema:
  *          type: string
  *        required: true
  *        description: the liqueur id
  *    responses:
  *      200:
  *        description:liqueur deleted
  *      404:
  *        description: Liqueur not found
  */
router.delete("/liqueurs/:id", (req, res) => {
    const { id } = req.params;
    liqueurSchema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
module.exports = router;