import React from "react";
import { withRouter } from "next/router";

import MainLayout from "components/MainLayout";
import HomeHero from "components/HomeHero";
import Vermont from "components/Vermont"
import Florida from "components/Florida"
import { LOCALS, LOCAL_ID } from "constants/local";

const components = {
  vermont: Vermont,
  florida: Florida
}
    
const Home = ({ router }) => {
  const DynamicComponent = components[LOCALS[LOCAL_ID].theme];

  return (
    <MainLayout hidePageHeader={true} hideSearchBar={true} route={router}>
      <div id="main" role="main">
        <HomeHero />
        <DynamicComponent />
      </div>
    </MainLayout>
  )
}

export default withRouter(Home);
