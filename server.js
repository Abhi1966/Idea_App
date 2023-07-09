const express = require('express');
const mongoose = require('mongoose')
const serverConfig = require('./config/server.config.js')
const dbConfig = require('./config/db.config.js');
// const { init } = require('./models/user.model.js');
const userModel = require('./models/user.model.js')

const app = express();

/**
 * Logic to connect Mongodb and Create an ADMIN user
 */
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.on("error", () => {
    console.log("Error while connecting to db");
});

db.once("open", () => {
    console.log("DB is connected");

    userModel.init();
})

async function init() {

    /**
     * Check if the admin user is already present
     */
    let admin = await userModel.findOne({
        userId: "admin"
    });

    if(admin) {
        console.log("Admin user already present");
        return;
    }
    
    admin = await userModel.create( {
        name: "Gulshan kumar",
        userId: "admin",
        email: "gulshanku9135@gmail.com",
        userType: "ADMIN",
        password: "welcome1"
    })
    console.log(admin);
}

app.listen(serverConfig.PORT, () => {
    console.log("server started");
}) 