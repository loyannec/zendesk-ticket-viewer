module.exports = (app) => {
    const path = require("path")
    const express = require('express')
    const publicDirectory = path.join(__dirname, '../public')

    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))          // Define how form data should be encode.
    app.use(express.static(publicDirectory))
};
