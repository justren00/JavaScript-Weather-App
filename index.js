import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express(); 
const port = 3000; 

// API key and url from OpenWeatherMap 
const apiKey = '3f4f9b75fed0836b864e942bd700422e'; 
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q='; 

app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",  async (req, res) => {
    try {
        const response = await axios.get(apiUrl + `London&appid=${apiKey}`);
        const result = response.data; 
        res.render("index.ejs", {content: result});
    } catch (error) {
        res.status(404).send(error.message);
    }
})

app.post("/submit" , async (req,res) => {
    let cityName = req.body["cityName"]; 
    try {
        const response = await axios.get(apiUrl + `${cityName}&appid=${apiKey}`); 
        const result = response.data; 
        res.render("index.ejs", {content: result});
    } catch (error) {
        res.render("index.ejs");
    }
})

app.listen( port , () => {
    console.log(`Listeing from port ${port}`);
}) 