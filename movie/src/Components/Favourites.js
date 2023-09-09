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
            currText:"",
            currPage:1,
            limit:5,

        
        };
        
    }

async componentDidMount(){
/* let ans= await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );

        console.log(ans.data);
        */
    let results=JSON.parse(localStorage.getItem("movies"));
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
results.map((movieObj)=>{
        if(!genreArr.includes(genreId[movieObj.genre_ids[0]])){
            genreArr.push(genreId[movieObj.genre_ids[0]]);
        }
    });
    genreArr.unshift("All Genre");

        this.setState({
            movies:[...results],
            genre:[...genreArr],
            
        });
           //https://api.themoviedb.org/3/discover/movie?api_key=347bddd82306dedbc578af0bb00d0f22&sort_by=popularity.desc&page=1
        
    }
handleCurrGenre=(genre)=>{
    this.setState({
        currGenre:genre,
    });
}
handleText=(e)=>{
    this.setState({
        currText:e.target.value
    });
}
sortByPopularityAsc=()=>{
    let allMovies=this.state.movies;
    allMovies.sort((objA,objB)=>{
        return objA.popularity-objB.popularity;
    })
    this.setState({
        movies:[...allMovies],
    })
}
sortByPopularityDesc=()=>{
    let allMovies=this.state.movies;
    allMovies.sort((objA,objB)=>{
        return objB.popularity-objA.popularity;
    })
    this.setState({
        movies:[...allMovies],
    })
}
sortByRatingAsc=()=>{
    let allMovies=this.state.movies;
    allMovies.sort((objA,objB)=>{
        return objA.vote_average-objB.vote_average;
    })
    this.setState({
        movies:[...allMovies],
    })
}
sortByRatingDesc=()=>{
    let allMovies=this.state.movies;
    allMovies.sort((objA,objB)=>{
        return objB.vote_average-objA.vote_average;
    })
    this.setState({
        movies:[...allMovies],
    })
}
handleDelete=(id)=>{
let listMovie=this.state.movies.filter((movieObj)=>{
    return movieObj.id!=id;
})
this.setState({
    movies:[...listMovie],
})
localStorage.setItem("movies",JSON.stringify(listMovie));
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
    let filterMovies=this.state.movies;

    if (this.state.currText !== ""){
        filterMovies=filterMovies.filter((movieObj)=>{
            let movieName=movieObj.original_title.toLowerCase();
        
            return movieName.includes(this.state.currText);
        });
    }
    if(this.state.currGenre!="All Genre"){
        filterMovies=filterMovies.filter(
            (movieObj) => genreId[movieObj.genre_ids[0]]==this.state.currGenre
        );
    }
    let numOfPages = Math.ceil(filterMovies.length / this.state.limit);
    let pageArr=[];
    for(let i=1;i<=numOfPages;i++){
        pageArr.push(i);
    }
    let start=(this.state.currPage-1)*this.state.limit;
    let end = start + this.state.limit;
    filterMovies = filterMovies.slice(start, end);

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
            <li class="list-group-item" aria-current="true" onClick={()=> this.handleCurrGenre(genre)}>
                {genre}</li>
            
            
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
                <input type="text" placeholder='Search' className='col-8' onChange={this.handleText}></input>
                <input type="number" className="col"
                value={this.state.limit}
                onChange={(e) => this.setState({ limit: Number(e.target.value) })}
                placeholder="Results per page"
            ></input>
</div>
<div class="row">
<table class="table">
    <thead>
    <tr>
    <th scope="col">Title</th>
    <th scope="col">Genre</th>
    <th scope="col">
    <i class="fa-solid fa-caret-up" onClick={this.sortByPopularityAsc}/>Popularity
    <i class="fa-solid fa-caret-down" onClick={this.sortByPopularityDesc}/>
    </th>
    <th scope="col">
    <i class="fa-solid fa-caret-up" onClick={this.sortByRatingAsc}/>
        Rating
    <i class="fa-solid fa-caret-down" onClick={this.sortByRatingDesc}/>
    </th>
    <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
   
        {
            filterMovies.map((movieObj)=>(
                <tr>
                <td scope="row"><img src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`} style={{width:"8rem"}}/>{movieObj.original_title}</td>
                <td className='text-edit'>{genreId[movieObj.genre_ids[0]]}</td>
                <td className='text-edit'>{movieObj.popularity}</td>
                <td className='text-edit'>{movieObj.vote_average}</td>
                <td className='text-edit'>
                    <button class="btn btn-outline-danger" onClick={()=>this.handleDelete(movieObj.id)}>Delete</button>
                </td>

                </tr>
              
            ))

        }
   
     
  </tbody>
</table>
</div>

</div>
<nav aria-label="Page navigation example" className="pagination">
        <ul className="pagination">
            {pageArr.map((pageNum) => {
            return (
                <li
                className="page-item"
                onClick={() => this.setState({ currPage: pageNum })}
                >
                <a className="page-link">{pageNum}</a>
                </li>
            );
            })}
        </ul>
</nav>
        </div>
        
    )
  }
}
