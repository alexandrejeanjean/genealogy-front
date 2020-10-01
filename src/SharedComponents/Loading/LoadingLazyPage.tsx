import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./loader.scss";

const Loading = () => {
  return (
    <main className="loader-wrapper page">
      <section className="loader">
        <Loader
          type="Circles"
          color="rgba(137, 194, 217, 0.3)"
          height={100}
          width={100}
          timeout={3000}
        />
      </section>
    </main>
  );
};

export default Loading;
