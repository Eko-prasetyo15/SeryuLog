import moment from "moment";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const CardList = (props) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    setImage("https://image.tmdb.org/t/p/original");
  }, []);

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
      <div
        className="movie-card mt-5 mr-3"
        style={{ backgroundColor: "#050E12" }}
      >
        <Link
          to={`/movie/${props.id}`}
          style={{
            color: "#B6B6B6",
            fontFamily: "Inter",
            textDecoration: "none",
          }}
          className="mr-3"
        >
          <img src={image + props.poster} alt={props.title} />
          <div className="movie-card-body">
            <div className="movie-title">{props.title}</div>
            <p>{moment(props.years).format("YYYY")}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CardList
