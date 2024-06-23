import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { getMovie, getMoviePopular, setShow } from "../../Redux/action";
import WatchNow from "./component/nowWatching";
import OwlCarousel from "react-owl-carousel3";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import PopupLogin from "../Helper/PopupLogin";
import CardList from "../Helper/CardList";

const Home = ({ setShow }) => {
  const dispatch = useDispatch();
  const stateDatas = useSelector((state) => state?.dataMovie?.datasfilm);
  const stateDataPopular = useSelector((state) => state.dataMovie.dataPopular);
  const stateShow = useSelector((state) => state?.dataMovie?.show);
  const [dataMark, setDataMark] = useState([]);
  const [dataFav, setDataFav] = useState([]);

  useEffect(() => {
    dispatch(getMovie());
    dispatch(getMoviePopular());
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem("watching")) {
      const data = localStorage.getItem("watching");
      setDataMark(JSON.parse(data));
    }
    if (localStorage.getItem("favorite")) {
      const data = localStorage.getItem("favorite");
      setDataFav(JSON.parse(data));
    }
  }, [localStorage]);
  const handleClose = () => {
    setShow(false);
  };

  const handleAddMark = (itm) => {
    setDataMark([...dataMark, itm]);
    localStorage.setItem("watching", JSON.stringify([...dataMark, itm]));
  };

  const handleDeleteMark = (id) => {
    const updatedMark = dataMark.filter((movie) => movie.id !== id);
    localStorage.setItem("watching", JSON.stringify(updatedMark));
  };

  const handleAddFav = (itm) => {
    setDataFav([...dataFav, itm]);
    localStorage.setItem("favorite", JSON.stringify([...dataFav, itm]));
  };

  const handleDeleteFav = (id) => {
    const updatedFav = dataFav.filter((movie) => movie.id !== id);
    localStorage.setItem("favorite", JSON.stringify(updatedFav));
  };

  const MovieList = stateDatas?.map((item, index) => (
    <WatchNow
      key={index}
      id={item.id}
      index={index + 1}
      title={item.title || item.original_title || item.name}
      poster={item.poster_path}
      years={item.release_date || item.first_air_date}
      item={item}
      handleAddMark={handleAddMark}
      handleAddFav={handleAddFav}
      handleDeleteFav={handleDeleteFav}
      handleDeleteMark={handleDeleteMark}
    />
  ));

  const MovieTop = stateDataPopular?.map((item, index) => (
    <CardList
      key={index}
      id={item.id}
      index={index + 1}
      title={item.title || item.original_title || item.name}
      poster={item.poster_path}
      years={item.release_date || item.first_air_date}
    />
  ));

  const options = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    items: 4,
    responsive: {
      0: { items: 2 },
      600: { items: 3 },
      1000: { items: 6 },
    },
    dots: false,
    nav: true,
    navText: [
      "<i className='fa fa-chevron-left'></i>", // Ikon panah kiri (gunakan kelas font-awesome)
      "<i className='fa fa-chevron-right'></i>", // Ikon panah kanan (gunakan kelas font-awesome)
    ],
  };
  return (
    <>
      {stateShow && <PopupLogin show={stateShow} handleClose={handleClose} />}
      <div className="animated fadeIn">
        <div className="wrapper mb-5">
          <div className="title">Now Playing</div>
          {stateDatas.length > 0 && (
            <OwlCarousel className="owl-theme" {...options}>
              {MovieList}
            </OwlCarousel>
          )}
        </div>
        <div className="wrapper">
          <h3>
            <div className="title">Top Rated</div>
          </h3>
          {stateDatas.length > 0 && <div className="row">{MovieTop}</div>}
        </div>
      </div>
    </>
  );
};

export default connect(null, { setShow })(Home);
