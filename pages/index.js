import { Fragment } from "react";
import Services from "../components/Home/Services";
import Slider from "../components/Home/Slider";

const Home = () => {
  return (
    <Fragment>
      <Slider />
      <Services />
    </Fragment>
  );
};

export default Home;
