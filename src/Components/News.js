import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News= (props) => {

        const [articles, setarticles] = useState([]);
        const [loading, setloading] = useState(true);
        const [page, setpage] = useState(1);
        const [totalResults, settotalResults] = useState(0);
        

    const captalizeFirst = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews= async()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        setloading(true);
        let data = await fetch(url);
        props.setProgress(50);
        let parsedData = await data.json();
        props.setProgress(70);
        setarticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
        setloading(false);
        props.setProgress(100);

    }

    useEffect(() => {
        document.title = `${captalizeFirst(props.category)} -ShaileNews`;
        updateNews();
        // eslint-disable-next-line
     }, [])
    

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setarticles(articles.concat(parsedData.articles));
        setpage(page+1);
        settotalResults(parsedData.totalResults);
      };
        return (
            <>
                <h1 className='container text-center' style={{ margin: "30px opx", marginTop:'90px',color: props.mode==='dark'?'white':'black'}}>ShailNews- Top {captalizeFirst(props.category)} Headlines</h1>
                {loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                >
                <div className="container" style={{color: props.mode==='dark'?'white':'black'}}>
                <div className='row' style={{color: props.mode==='dark'?'white':'black'}}>
                    {!loading && articles.map((element) => {
                        return <div className="col-md-4" key={element.url} style={{color: props.mode==='dark'?'white':'black'}}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 45) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                </div>
                </InfiniteScroll>

            </>
        )
    }

News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',

}

News.propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
