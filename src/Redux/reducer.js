const initialState = {
  datasfilm: [],
  dataRecom: [],
  dataPopular: [],
  detail: [],
  trailer: [],
  allMovie: [],
  region: [],
  cast: [],
  submitSuccess: true,
  loading: false,
  show: false,
};

const dataMovie = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.datas };
    case "SET_SHOW":
      return { ...state, show: action.datas };
    case "LOAD_MOVIE_SUCCESS":
      return { ...state, datasfilm: action.datas };
    case "LOAD_MOVIERECOM_SUCCESS":
      return { ...state, dataRecom: action.datas };
    case "LOAD_MOVIE_POPULAR_SUCCESS":
      return { ...state, dataPopular: action.datas };
    case "LOAD_DETAIL_SUCCESS":
      return { ...state, detail: action.datas };
    case "LOAD_VIDEO_SUCCESS":
      return { ...state, trailer: action.datas };
    case "LOAD_ALL_SUCCESS":
      return { ...state, allMovie: action.datas };
    case "LOAD_CAST_SUCCESS":
      return { ...state, cast: action.datas };
    default:
      return state;
  }
};

export default dataMovie;
