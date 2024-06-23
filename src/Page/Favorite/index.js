import React, { useEffect, useState } from "react";
import PopupLogin from "../Helper/PopupLogin";
import CardList from "../Helper/CardList";

const FavoriteList = () => {

  const parsedData = localStorage.getItem('favorite')
  const stateDatas = parsedData ?  JSON.parse(parsedData) : []
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.assign('/')
    }
  }, [token]);

  const MovieList = stateDatas?.map((item, index) => (
    <CardList
      key={index}
      id={item.id}
      index={index + 1}
      title={item.title || item.original_title || item.name}
      poster={item.poster_path}
      years={item.release_date || item.first_air_date}
    />
  ));

  return (
    <>
      <div className="animated fadeIn">
        <div className="wrapper">
          <h3>
            <div className="title">
              Your Favorite Movie
            </div>
          </h3>
          {stateDatas.length > 0 && (
            <div className="row">{MovieList}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default FavoriteList;
