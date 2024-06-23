import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { setShow } from "../../../Redux/action";

const WatchNow = (props) => {
  const [image, setImage] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [bookmark, setBookmark] = useState(false);

  const token = localStorage.getItem("token");
  const storedData = localStorage?.getItem("watching");
  const parsedWatch = storedData ? JSON.parse(storedData) : [];

  useEffect(() => {
    setImage("https://image.tmdb.org/t/p/original");
  }, []);

  useEffect(() => {
    parsedWatch?.forEach((mv) => {
      if (mv.id === props.id) {
        setBookmark(true);
      }
    });
  }, [parsedWatch, props.id]);

  const handleBookmarkClick = () => {
    if (token) {
      setBookmark(!bookmark);
      if (bookmark) {
        props.handleDeleteMark(props.id);
      } else {
        props.handleAddMark(props.item);
      }
    } else {
      props.setShow(true);
    }
  };

  const handleFavoriteClick = () => {
    if(token){
      setFavorite(!favorite);
      if (favorite) {
        props.handleDeleteFav(props.id);
      } else {
        props.handleAddFav(props.item);
      }
    } else {
      props.setShow(true);
    }
  };

  return (
    <>
      <div
        className="movie-card mr-5 mt-3"
        style={{ backgroundColor: "#050E12" }}
      >
        <Link
          to={`/movie/${props.id}`}
          style={{
            color: "#B6B6B6",
            fontFamily: "Inter",
            textDecoration: "none",
          }}
        >
          <img
            src={image + props.poster}
            alt={props.title}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </Link>
        <div className="overlay">
          <img
            src={
              bookmark
                ? process.env.PUBLIC_URL + "/bookark_filled.png"
                : process.env.PUBLIC_URL + "/bookark.svg"
            }
            alt="Bookmark Icon"
            width="17"
            height="17"
            onClick={handleBookmarkClick}
          />
          <img
            src={
              favorite
                ? process.env.PUBLIC_URL + "/favorite_filled.svg"
                : process.env.PUBLIC_URL + "/favorite.svg"
            }
            alt="Favorite Icon"
            width="17"
            height="17"
            onClick={handleFavoriteClick}
          />
        </div>
        <div className="movie-card-body">
          <div className="movie-title">{props.title}</div>
          <p style={{ color: "#ffffff" }}>{moment(props.years).format("YYYY")}</p>
        </div>
      </div>
    </>
  );
};

export default connect(null, { setShow })(WatchNow);
