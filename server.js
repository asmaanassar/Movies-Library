
'use strict';


require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const filmdata = require('./Movie Data/data.json');

const PORT = process.env.PORT;

const server = express();
server.use(cors());




server.get('/', homemovies)
server.get('/favorit', handelfavorit)
server.get('/trending', trendingMovies);
server.get('/Search', SearchMovies);
server.use('*', NotfoundHandler);
server.use(errorHandler)




function Moviefav(title, poster_path, overview){
this.title = title;
this.poster_path = poster_path;
this.overview = overview;
}


function Trendenig(id, title, release_date,poster_path,overview){
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
}

//let numberOfRecipes=5;

let userSearch = "Spider-Man";
let url=`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.APIKEY}&language=en-US`


function trendingMovies(req,res)
{
axios.get(url)
.then((data)=>{
    console.log(data);
    let trending= data.data.results.map(trende =>{
      return new Trendenig(trende.id, trende.title, trende.release_date,trende.poster_path,trende.overview);
    });
    res.status(200).json(trending);
}).catch((err)=>{
    errorHandler(error, req, res)
})
}

function SearchMovies(req,res){
   
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&language=en-US&query=${userSearch}&page=2`;
    
        axios.get(url)
        .then(result=>{
            // console.log(result.data.recipes);
            let trendee = result.data.results.map(trende =>{
                return new Trendenig(trende.id, trende.title, trende.release_date,trende.poster_path,trende.overview);
    });
            res.status(200).json(trendee);  
         }).catch((err)=>{
            errorHandler(error, req, res)
        })

}

function handelfavorit(req, res){
    return res.status(200).send("welcom to home movies page :)");
    }

function homemovies(req,res){
    let film =  new Moviefav(filmdata.title, filmdata.poster_path, filmdata.overview);
     res.status(200).json(film);
}


function NotfoundHandler(req,res){
    res.status(404).send("oppss, Sorry, something went wrong");
}

function errorHandler(error,req,res)
{
const err = {
    status : 500,
    message: error
}
res.status(500).send(err);
}

server.listen(PORT,()=>{
    console.log(`listin to port ${PORT}`)

// server.listen(3000, ()=>{
//     console.log("success listen");
});



