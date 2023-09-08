import React, { Component } from 'react'
import axios from "axios";
import API_KEY from "../secrets";

export default class Favourites extends Component {
    constructor(){
        super();
        this.state={
            movies:[],
            genre:[],
            currGenre:"All Genre",
        };
        
    }
  
async componentDidMount(){
    let ans= await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        console.log(ans.data);
        let genreId = {
            28: "Action",
            12: "Adventure",
            16: "Animation",
            35: "Comedy",
            80: "Crime",
            99: "Documentary",
            18: "Drama",
            10751: "Family",
            14: "Fantasy",
            36: "History",
            27: "Horror",
            10402: "Music",
            9648: "Mystery",
            10749: "Romance",
            878: "Sci-Fi",
            10770: "TV",
            53: "Thriller",
            10752: "War",
            37: "Western",
          };
    let genreArr=[];
    ans.data.results.map((movieObj)=>{
          if(!genreArr.includes(genreId[movieObj.genre_ids[0]])){
            genreArr.push(genreId[movieObj.genre_ids[0]]);
          }
    });
    genreArr.unshift("All Genre");

        this.setState({
            movies:[...ans.data.results],
            genre:[...genreArr],
            
        });
           //https://api.themoviedb.org/3/discover/movie?api_key=347bddd82306dedbc578af0bb00d0f22&sort_by=popularity.desc&page=1
        
    }

render() {
    let genreId = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Sci-Fi",
        10770: "TV",
        53: "Thriller",
        10752: "War",
        37: "Western",
      };
    return (
        <div class="row">
           {/*we brought this all from bootstrap so if we write col-3 then property of boootsstrap will adjust the column size*/}

        <div class="col-3 favourites-list">
          <ul class="list-group">
        {
          this.state.genre.map((genre)=>(
            this.state.currGenre==genre?
             <li class="list-group-item active" aria-current="true">{genre}
             </li>:
             <li class="list-group-item" aria-current="true" >{genre}</li>
             
            
          ))
        }
         {/*} <li class="list-group-item " aria-current="true">All Genre</li>
          <li class="list-group-item">Fantasy </li>
          <li class="list-group-item">Action</li>
          <li class="list-group-item">Thriller</li>
    <li class="list-group-item">Horror</li>*/}
        </ul>
        </div>
        <div class="col favourites-table">
            <div className="row">
                <input type="text" placeholder='Search' className='col'></input>
                <input type="number" placeholder='5' className='col'></input>
            </div>
            <div class="row">
<table class="table">
    <thead>
    <tr>
    <th scope="col">Title</th>
    <th scope="col">Genre</th>
    <th scope="col">Movie</th>
    <th scope="col">Rating</th>
    <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
   
        {
            this.state.movies.map((movieObj)=>(
                <tr>
                <td scope="row"><img src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`} style={{width:"8rem"}}/>{movieObj.original_title}</td>
                <td className='text-edit'>{genreId[movieObj.genre_ids[0]]}</td>
                <td className='text-edit'>{movieObj.popularity}</td>
                <td className='text-edit'>{movieObj.vote_average}</td>
                <td className='text-edit'>
                    <button class="btn btn-outline-danger">Delete</button>
                </td>

                </tr>
              
            ))

        }
   
     
  </tbody>
</table>
</div>
        </div>
        </div>
    )
  }
}
