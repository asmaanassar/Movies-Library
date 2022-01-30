
'use strict';


const express = require ('express');
const cors  = require ('cors');
const filmdata = require('./Movie Data/data.json');


const server = express();
server.use (cors());




server.get('/', homemovies)
server.get('/favorit', handelfavorit)
server.get('*', Notfound);


function Moviefav(title, poster_path, overview){
this.title = title;
this.poster_path = poster_path;
this.overview = overview;

}


function handelfavorit(req, res){

    return res.status(200).send("welcom to movies page :)")
    }


function homemovies(req,res){

    let film =  new Moviefav(filmdata.title, filmdata.poster_path, filmdata.overview)
     res.status(200).json(film)
}

function Notfound(req,res){

    res.status(404).send("oppss, Sorry, something went wrong")
}

server.listen(3000, ()=>{
    console.log("success listen");
})



