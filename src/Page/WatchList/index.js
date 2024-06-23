import React, { useEffect } from "react";
import CardList from "../Helper/CardList";

const WatchList = () => {

  const parsedData = localStorage.getItem('watching')
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
              Your WatchList
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

export default WatchList;
