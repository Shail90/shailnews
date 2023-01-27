import React from 'react'

const NewsItem= (props) => {
        let{title, description, imageUrl, newsUrl, author, date, source}=props;
        return (
            <div className='my-3' style={{color: props.mode==='dark'?'white':'black'}} color='black'>
                <div className="card">
                <div style={{display:'flex', justifyContent:'flex-end', position:'absolute', right:'0'}}>
                <span className="badge rounded-pill bg-danger">{source}</span>
                </div>
                    <img src={!imageUrl?"https://images.livemint.com/img/2023/01/19/600x338/dividend_stocks_1674106030361_1674106030666_1674106030666.jpg":imageUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}...</h5>
                            <p className="card-text">{description}...</p>
                            <p className="card-text"><small className='text-muted'>By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                            <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
                        </div>
                </div>

            </div>
        )
    }


export default NewsItem
