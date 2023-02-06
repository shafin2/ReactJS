import React, { Component } from 'react'
import NewsItem from './NewsItem'
import json from "./Sample.json"
export class News extends Component {
    constructor(props){
        super(props)
        this.state={
            articles:[],
            page:1,
            totalNews:0,
        }
    }
   async componentDidMount(){
        console.log("Run hgyq")
        let url="https://newsapi.org/v2/top-headlines?country=us&apiKey=aa59059d8c4f4cdea01d4053242f1d70&page=1&pageSize=20";
        let data= await fetch(url);
        let parsedData=await data.json();
        this.setState({
            articles:parsedData.articles,
            totalNews:parsedData.totalResults,
        })
    }
    handlePrevClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=aa59059d8c4f4cdea01d4053242f1d70&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json()  
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })

    }

     handleNextClick = async ()=>{
        if (this.state.page + 1 > Math.ceil(this.state.totalNews/20)){
            document.getElementById("nxtBtn").disabled=true;
        } 
        else{
            let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=aa59059d8c4f4cdea01d4053242f1d70&page=${this.state.page + 1}&pageSize=20`;
            let data = await fetch(url);
            let parsedData = await data.json() 
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })
    }
    }
  render() {
    return (
      <div>
        <div className="container my-5">
            <h2>Headlines</h2>
            <div className="row">
                {
                    this.state.articles.map((elem)=>{
                        return (
                            <div className="col-md-4" key={elem.url}>
                                <NewsItem key={elem.url} title={elem.title} desc={elem.description} imageUrl={elem.urlToImage} newUrl={elem.url}/>
                            </div>
                        );
                    })
                }
                
            </div>
        </div>
        <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
            <button type="button" id="nxtBtn" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
