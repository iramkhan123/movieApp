import React, { Component } from 'react'
import { movies } from './getMovies'
import axios from 'axios'
import API_KEY from '../secrets';
export default class List extends Component {
    constructor(){
        super();
        this.state={
            hover:"",
            parr:[1],
            currPage:2,
            movies:[],
        };

        
    }
  handleEnter=(id)=>{
    this.setState({
        hover:id
    });
  };
  handleLeave=()=>{
    this.setState({
        hover:"",
    });
  };
  async componentDidMount(){
  //generate own api from themoviedb
  //let address=`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currPage}`;
 // console.log(address);
let ans= await axios.get(
  `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currPage}`
  );
    console.log(ans.data);
    this.setState({
      movies:[...ans.data.results],
    });
     //https://api.themoviedb.org/3/discover/movie?api_key=347bddd82306dedbc578af0bb00d0f22&sort_by=popularity.desc&page=1
  
  }
  changeMovie=async()=>{
    console.log(this.state.currPage);
    console.log("changeMovie called");
    let ans= await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currPage}`
      );
      this.setState({
        movies:[...ans.data.results],
      });

//arr=[1,2,3]
//arr=[1,2,3,4,4] here the two arr are different it is reintialized so the position to hold this arr changes
//suppose even after pressing to next it dont bring new movie entry and movies have same data but the positon is different as prev arr and new arr is different 
//so rendering occurs;
  }
  handleNext=()=>{
    let tempArr=[];
    for(let i=1;i<=this.state.parr.length+1;i++){
      tempArr.push(i);
    }
    this.setState({
      parr:[...tempArr],
      currPage:this.state.currPage+1,

    });
    this.changeMovie();

  }
  handlePrevious=()=>{
      if(this.state.currPage>1){
      this.setState({
        currPage:this.state.currPage-1,
      
      },this.changeMovie)
    }
    
  }
  handlePageNo=(pageNum)=>{
      
      this.setState({
        currPage:pageNum,
      },this.changeMovie);
  }
  render() {
   // let movie=movies.results;
    return (
     <>
     {
        this.state.movies.length==0 ? (
        <div className="spinner-border text-secondary" role="status">
             <span className="visually-hidden">Loading...</span>
        </div>
        ):
        (
          <div>
            <h3 className="text-center">
                
                    Trending
               
            </h3>
            <div className="movies-list"> {
                this.state.movies.map((movieObj)=>(
                    <div className="card movie-card"
                     onMouseEnter={()=>this.handleEnter(movieObj.id)} 
                     onMouseLeave={this.handleLeave}
                     >
                    <img
                           src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                           className="card-img-top banner-img"
                           alt="..."
                           style={{height:"40vh"}}
                    />
                    {/*} <div className="card-body banner-title">*/}
                       <h6 className="card-title movie-title">{movieObj.original_title}</h6>
                     {/*  <p className="card-text movie-text">{movieObj.overview}</p>*/}
                     <div className="button-wrapper">
                        {this.state.hover==movieObj.id && (
                      <a href="#" className="btn btn-danger movie-button">Add To Favourites</a>
                        )}
                     </div>
                     </div>
                ))}
                </div>
                <div className="pagination">
                
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link"  aria-label="Previous" onClick={this.handlePrevious}>
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {
      this.state.parr.map(pageNum=>(
        <li className="page-item">
        <a className="page-link" onClick={()=>{this.handlePageNo(pageNum)}}>{pageNum}</a></li>
      ))
    }
   
    <li className="page-item">
      <a className="page-link" aria-label="Next" onClick={this.handleNext} >
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>

    </div>
          </div>
        )
     }
        
     
    
     </>

    );
  }
}
