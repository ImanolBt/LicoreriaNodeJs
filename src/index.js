const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const liqueurRoutes = require('./routes/liqueur');
const path = require('path');
//swagger

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Liqueur API',
            version: '1.0.0',
    },
    servers: [
        {
            url: 'http://localhost:3001',
        },
    ],
},

apis:[`${path.join(__dirname,"./routes/*.js")}`],

};
const app = express();
const port = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use('/api', liqueurRoutes);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

//routes
app.get('/',(req,res)=>{
    res.send('Welcome to the liquor store');
});

//mongobd connection
mongoose.connect(process.env.MONGODB_URI).then(()=> console.log('connected to mongodb'))
.catch((error) => console.error(error));
app.listen(port, () => console.log('Server started on port ', port));
