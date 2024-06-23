import { Spinner } from "react-bootstrap";

const SpinnerLoad = () => {

    return (
        <div className="spinner-container">
          <Spinner animation="border" role="status" className="tmdb-spinner">
            <img
              src={process.env.PUBLIC_URL + "/tmDb-logo.jpg"}
              alt="TMDB Logo"
              className="tmdb-logo"
            />
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
    )
}

export default SpinnerLoad