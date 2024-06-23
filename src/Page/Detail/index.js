import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import OwlCarousel from "react-owl-carousel3";
import {
  ActrisMovie,
  getDetail,
  getMovie,
  getVideo,
  Provider,
  setShow,
} from "../../Redux/action";
import "./detail.css";
import Cast from "./CastList";
import WatchNow from "../Home/component/nowWatching";
import PopupLogin from "../Helper/PopupLogin";

const Detail = ({setShow}) => {
  const dispatch = useDispatch();
  const url = window.location.href;
  const location = url.trim();
  const dataId = location.split("/")[4];

  const stateMovie = useSelector((state) => state?.dataMovie?.datasfilm);
  const stateShow = useSelector((state) => state?.dataMovie?.show);
  const stateDatas = useSelector((state) => state.dataMovie.detail);
  const stateTrailer = useSelector((state) => state.dataMovie.trailer);
  const stateCast = useSelector((state) => state.dataMovie.cast);

  const [image, setImage] = useState("");
  const [genre, setGenre] = useState("");
  const [trailer, setTrailer] = useState("");
  const [key, setKey] = useState("");
  const [link, setLink] = useState("");
  const [dataMark, setDataMark] = useState([]);
  const [dataFav, setDataFav] = useState([]);

  useEffect(() => {
    dispatch(getMovie());
    dispatch(getDetail(dataId));
    dispatch(getVideo(dataId));
    dispatch(ActrisMovie(dataId));
    dispatch(Provider(dataId));
  }, [dataId, dispatch]);

  useEffect(() => {
    setImage("https://image.tmdb.org/t/p/original");
    setGenre(stateDatas.genres);
    setTrailer("https://www.youtube.com/watch?v=");
    setKey(stateTrailer[0]);
  }, [stateDatas, stateTrailer]);

  useEffect(() => {
    if (key) {
      setLink(key.key);
    }
  }, [key]);

  const handleClose = () => {
    setShow(false);
  };

  const handleAddMark = (itm) => {
    setDataMark([...dataMark, itm]);
    localStorage.setItem('watching',  JSON.stringify([...dataMark,itm]))
  };

  const handleDeleteMark = (id) => {
    const updatedMark = dataMark.filter((movie) => movie.id !== id);
    setDataMark(updatedMark);
    localStorage.setItem('watching', JSON.stringify(updatedMark))
  };

  const handleAddFav= (itm) => {
    setDataFav([...dataFav, itm]);
  };

  const handleDeleteFav = (id) => {
    const updatedFav = dataFav.filter((movie) => movie.id !== id);
    setDataFav(updatedFav);
  };
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
  const CastList = stateCast.map((item, index) => {
    return (
      <Cast
        key={index}
        id={item.id}
        index={index + 1}
        judul={item.name}
        poster={item.profile_path}
        character={item.character}
      />
    );
  });

  const MovieTop = stateMovie?.map((item, index) => (
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
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const anggaran = formatter.format(stateDatas.budget);
  const pemasukan = formatter.format(stateDatas.revenue);

  return (
    <>
      {stateShow && <PopupLogin show={stateShow} handleClose={handleClose} />}
      <div style={{ backgroundColor: "#F4F4F4" }}>
        {/* <Header /> */}
        <div class="movie_card" style={{ width: "100%", height: "50%" }}>
          <div className="info_section">
            <div className="movie_header">
              <img
                className="locandina mb-3"
                src={image + stateDatas.poster_path}
                style={{
                  width: "300px",
                  height: "450px",
                  borderRadius: "30px",
                }}
              />
              <h1>{stateDatas.title}</h1>
              <h4>
                {stateDatas.release_date}, {stateDatas.tagline}
              </h4>
              <span className="likes">{stateDatas.popularity} likes</span>{" "}
              <br></br>
              <span className="minutes">{stateDatas.runtime} min</span>
              {genre &&
                genre.map((item, idx) => {
                  return <p className="type">{item.name}</p>;
                })}
            </div>
            <div className="movie_desc">
              <p className="text">
                <h5>
                  <strong>Overview</strong>
                </h5>
                {stateDatas.overview}
              </p>
            </div>
            <div className="movie_social">
            </div>
            <div className="movie-play">
              <a
                href={trailer + link}
                target="_blank"
                className="btn btn-outline text-center"
                type="button"
                style={{ color: "white" }}
              >
                <i
                  className="fa fa-youtube-play fa-lg mr-2 ml-0 align-center"
                  aria-hidden="true"
                ></i>
                Youtube Trailer
              </a>
            </div>
          </div>

          <div
            className="blur_back"
            style={{
              background: `url(${image + stateDatas.backdrop_path})`,
              width: "100%",
              height: "100%",
            }}
          ></div>
        </div>

        <div className="row col-12">
          <div className="col-sm-9">
            <h3>
              <strong>Actor Utama</strong>
            </h3>
            <OwlCarousel
              className="team-slider owl-carousel owl-theme"
              {...options}
            >
              {CastList}
            </OwlCarousel>
          </div>

          <div className="col-sm-3 mt-5 mb-5">
            <div className="container ml-3">
              <h5>
                <strong>Judul Asli</strong>
              </h5>
              <span className="mb-5">
                {stateDatas.title} : {stateDatas.tagline}
              </span>
              <br></br>
              <br></br>
              <h5>
                <strong>Status</strong>
              </h5>
              <span>{stateDatas.status}</span>
              <br></br>
              <br></br>
              <h5>
                <strong>Bahasa</strong>
              </h5>
              <span>English</span>
              <br></br>
              <br></br>
              <h5>
                <strong>Anggaran</strong>
              </h5>
              <span>{anggaran}</span>
              <br></br>
              <br></br>
              <h5>
                <strong>Pemasukan</strong>
              </h5>
              <span>{pemasukan}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper mb-3">
        <h3>
          <div className="title">Recomendations</div>
        </h3>
        {stateMovie.length > 0 && (
          <OwlCarousel className="owl-theme" {...options}>
            {MovieTop}
          </OwlCarousel>
        )}
      </div>
    </>
  );
};

export default connect(null, { setShow })(Detail);
