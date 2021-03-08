import React from "react";
import { withRouter } from "next/router";

import MainLayout from "components/MainLayout";
import HomeHero from "components/HomeHero";
import Vermont from "components/Vermont"
import Florida from "components/Florida"
const LOCAL_ID = process.env.NEXT_PUBLIC_LOCAL_ID

const components = {
  vermont: Vermont,
  florida: Florida
}
    
const Home = ({ router }) => {
  const DynamicComponent = components[LOCAL_ID]

  return (
    <MainLayout route={router}>
      <div id="main" role="main">
        <HomeHero />
        <DynamicComponent />
      </div>
    </MainLayout>
  )
}

export default withRouter(Home);
