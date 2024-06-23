import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const API_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=fb07bd7840b8c57af5696504bf028f10`;
const API_URL = "https://api.themoviedb.org/4/account/5ebaf32a0cb3350020d50f38/movie/recommendations?page=1";
const API_POPULAR = 'https://api.themoviedb.org/3/movie/popular?api_key=fb07bd7840b8c57af5696504bf028f10&language=en-US&page='
const API_AUTH = "https://api.themoviedb.org/4/auth/request_token";
const Token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjA3YmQ3ODQwYjhjNTdhZjU2OTY1MDRiZjAyOGYxMCIsInN1YiI6IjVlYmFmMzJhMGNiMzM1MDAyMGQ1MGYzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XU1cIcDyfobWMCkFPpnY3pMk6znLXl7khUy9SvhOX_4";


const loadMovieSuccess = (datas) => ({
  type: "LOAD_MOVIE_SUCCESS",
  datas,
});

export const setShow = (datas) => ({
  type: "SET_SHOW",
  datas,
});
export const setLoading = (datas) => ({
  type: "SET_LOADING",
  datas,
});

const loadMovieFailure = () => ({
  type: "LOAD_MOVIE_FAILURE",
});
const loadMoviePopulerSuccess = (datas) => ({
    type: 'LOAD_MOVIE_POPULAR_SUCCESS',
    datas,
});

const loadMoviePopulerFailure = () => ({
    type: 'LOAD_MOVIE_POPULAR_FAILURE',
});

const loadMovieDetailSuccess = (datas) => ({
  type: "LOAD_DETAIL_SUCCESS",
  datas,
});

const loadMovieDetailFailure = () => ({
  type: "LOAD_DETAIL_FAILURE",
});

const loadVideoSuccess = (datas) => ({
  type: "LOAD_VIDEO_SUCCESS",
  datas,
});

const loadVideoFailure = () => ({
  type: "LOAD_VIDEO_FAILURE",
});

const loadCastSuccess = (datas) => ({
  type: "LOAD_CAST_SUCCESS",
  datas,
});

const loadCastFailure = () => ({
  type: "LOAD_CAST_FAILURE",
});

const headers = {
  Authorization: `Bearer ${Token}`, // Ganti dengan implementasi sesungguhnya
  "Content-Type": "application/json", // Contoh tambahkan header Content-Type
};

export const getMovie = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    return axios
      .get(API_URL, { headers }) // Menggunakan Axios untuk melakukan GET request
      .then((response) => {
        dispatch(loadMovieSuccess(response.data.results)); // Dispatch action jika request berhasil
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(loadMovieFailure()); // Dispatch action jika terjadi error
        dispatch(setLoading(false));
        toast.error(error, { theme: "colored" })
      });
  };
};
export const getMoviePopular = () => {
    return dispatch => {
        dispatch(setLoading(true))
        return axios.get(API_POPULAR, {headers})
            .then(function (response) {
                dispatch(loadMoviePopulerSuccess(response.data.results))
                dispatch(setLoading(false))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(loadMoviePopulerFailure());
                dispatch(setLoading(false))
                toast.error(error, { theme: "colored" })
            });
    }
}
export const getAuthToken = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    return axios
      .post(API_AUTH, {}, { headers })
      .then((response) => {
        const token = response?.data?.request_token;
        localStorage.setItem("token", token);
        dispatch(setShow(true));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(loadMovieFailure()); // Dispatch action jika terjadi error
        dispatch(setLoading(false));
        toast.error(error, { theme: "colored" })
      });
  };
};

export const getDetail = (id) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=fb07bd7840b8c57af5696504bf028f10&language=en-US`
      )
      .then(function (response) {
        dispatch(loadMovieDetailSuccess(response.data));
        dispatch(setLoading(false));
      })
      .catch(function (error) {
        console.error(error);
        dispatch(loadMovieDetailFailure());
        toast.error(error, { theme: "colored" })
      });
  };
};
export const getVideo = (id) => {
  return (dispatch) => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=fb07bd7840b8c57af5696504bf028f10&language&language=en-US`
      )
      .then(function (response) {
        dispatch(loadVideoSuccess(response.data.results));
      })
      .catch(function (error) {
        console.error(error);
        dispatch(loadVideoFailure());
        toast.error(error, { theme: "colored" })
      });
  };
};

export const ActrisMovie = (id) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=fb07bd7840b8c57af5696504bf028f10&language=en-US`
      )
      .then(function (response) {
        dispatch(loadCastSuccess(response.data.cast));
        dispatch(setLoading(false));
      })
      .catch(function (error) {
        console.error(error);
        dispatch(loadCastFailure());
        dispatch(setLoading(false));
        toast.error(error, { theme: "colored" })
      });
  };
};
export const Provider = (id) => {
  return (dispatch) => {
    dispatch(setLoading(true))
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=fb07bd7840b8c57af5696504bf028f10`
      )
      .then(function (response) {
        dispatch(setLoading(false));

      })
      .catch(function (error) {
        console.error(error);
        dispatch(setLoading(false));
        toast.error(error, { theme: "colored" })
      });
  };
};

