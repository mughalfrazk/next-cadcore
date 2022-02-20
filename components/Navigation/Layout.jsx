import { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import Navlinks from "./Navlinks";

const Layout = (props) => {
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    console.log(sidebar)
  }, [sidebar])

  return (
    <Fragment>
      <Header setSidebar={setSidebar} />
      <Navlinks active={sidebar} setSidebar={setSidebar} />
      <main>
          {props.children}
      </main>
    </Fragment>
  );
};

export default Layout;
