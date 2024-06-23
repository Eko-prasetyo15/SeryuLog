import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import { useSelector } from "react-redux";
import SpinnerLoad from "../Helper/Spinner";

const propTypes = {
  children: PropTypes.node.isRequired,
};

const defaultProps = {};

const Layout = (props) => {
  const { children } = props;
  const loading = useSelector((state) => state?.dataMovie?.loading);

  return (
    <div className="" style={{ backgroundColor: "black" }}>
      <Header />
      {loading && (
        <SpinnerLoad/>
      )}
      <div className="mt-3" style={{ padding: "20px" }}>
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;
export default Layout;
