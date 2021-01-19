import React from "react";
import { withRouter } from "next/router";

import MainLayout from "components/MainLayout";
import HomeHero from "components/HomePage/HomeHero";
import LocalIntro from "components/HomePage/LocalIntro";

// import { getCurrentUrl } from "lib";

import { LOCALS, LOCAL_ID } from "constants/local";

const Home = ({ router, content }) =>
  <MainLayout hidePageHeader={true} hideSearchBar={true} route={router}>
    <div id="main" role="main">
      <HomeHero />
      <LocalIntro content={content} />
    </div>
  </MainLayout>;



export default withRouter(Home);
