import  React from "react";

const NewsItem =(props)=> {

    let { title, description, imgurl, newsurl, author, date, source } =
      props;
    return (
      <div>
        <div className="card">
          <div style={{ display:'flex',justifyContent:'flex-end',position:'absolutte',right:'0' }}>
        <span className="badge rounded-pill bg-danger" >
                {source}
            </span>
            </div>
          <img src={imgurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title}
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </p>
            <a href={newsurl} target="_blank" className="btn btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }


export default NewsItem;
