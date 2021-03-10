// import React from "react";
// import { withRouter } from "next/router";

// import MainLayout from "components/MainLayout";
// import HomeHero from "components/HomeHero";
// import Vermont from "components/Vermont"
// import Florida from "components/Florida"
// const LOCAL_ID = process.env.NEXT_PUBLIC_LOCAL_ID

// const components = {
//   vermont: Vermont,
//   florida: Florida
// }
    
// const Home = ({ router }) => {
//   const DynamicComponent = components[LOCAL_ID]

//   return (
//     <MainLayout route={router}>
//       <div id="main" role="main">
//         <HomeHero />
//         <DynamicComponent />
//       </div>
//     </MainLayout>
//   )
// }

// export default withRouter(Home);

import React from "react";
import { withRouter } from "next/router";

import MainLayout from "components/MainLayout";
import HomeHero from "components/HomePage/HomeHero";
import LocalIntro from "components/HomePage/LocalIntro";

import { getCurrentUrl } from "lib";

const LOCAL_ID = process.env.NEXT_PUBLIC_LOCAL_ID
import { LOCALS } from "constants/local-data";

const Home = ({ router, content }) =>
  <MainLayout hidePageHeader={true} hideSearchBar={true} route={router}>
    <div id="main" role="main">
      <HomeHero />
      <LocalIntro content={content} />
    </div>
  </MainLayout>;

Home.getInitialProps = async ({ req }) => {
  const fullUrl = getCurrentUrl(req);
  const markdownUrl = `${fullUrl}/static/${LOCALS[LOCAL_ID]
    .theme}/homepage.md`;
  const markdownResponse = await fetch(markdownUrl);
  const pageMarkdown = await markdownResponse.text();

  return {
    content: pageMarkdown
  };
};

export default withRouter(Home);
