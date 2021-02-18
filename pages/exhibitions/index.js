import { withRouter } from "next/router";
import MainLayout from "components/MainLayout";
// import VermontExhibitions from "components/Vermont/Exhibitions"
// import FloridaExhibitions from "components/Florida/Exhibitions"
import { LOCALS, LOCAL_ID } from "constants/local";
import FeatureHeader from "shared/FeatureHeader";
import Exhibitions from "components/shared/Exhibitions"

// const components = {
//   vermont: VermontExhibitions
// }

const ExhibitionsPage = ({ router }) => {
  const local = LOCALS[LOCAL_ID]
  // const Exhibitions = components[local.theme];
  const title = local.routes['/exhibitions'].title
  const description = local.routes['/exhibitions'].description

  return (
    // <MainLayout
    //   route={router}
    //   pageTitle={`${title}`}
    //   pageDescription={`${description}`}
    //   hidePageHeader={false}
    //   hideSearchBar={false}
    // >
      <div id="main" role="main">
        <Exhibitions />
      </div>
    // {/* </MainLayout> */}
  )
}

export default withRouter(ExhibitionsPage);


// import MainLayout from "components/MainLayout";
// // import AllExhibitions from "components/ExhibitionsComponents/AllExhibitions";
// import Exhibitions from "components/shared/Exhibitions"
// import { getCurrentUrl } from "lib";
// import {
//   TITLE,
//   EXHIBITS_ENDPOINT,
//   EXHIBIT_PAGES_ENDPOINT,
//   FILES_ENDPOINT
// } from "constants/exhibitions";

// const ExhibitionsPage = ({ url, exhibitions }) =>
//   <MainLayout route={url} pageTitle={TITLE}>
//     <div id="main" role="main">
//       <Exhibitions />
//       {/* <AllExhibitions route={url} exhibitions={exhibitions} /> */}
//     </div>
//   </MainLayout>;

// ExhibitionsPage.getInitialProps = async ({ req }) => {
//   const currentUrl = getCurrentUrl(req);
//   const exhibitsRes = await fetch(`${currentUrl}${EXHIBITS_ENDPOINT}`);
//   const exhibitsJson = await exhibitsRes.json();
//   let exhibitions = [];
//   if (exhibitsJson.length > 0) {
//     exhibitions = await Promise.all(
//       exhibitsJson
//         .map(async exhibit => {
//           const exhibitPageRes = await fetch(
//             `${currentUrl}${EXHIBIT_PAGES_ENDPOINT}?exhibit=${exhibit.id}`
//           );
//           const exhibitJson = await exhibitPageRes.json();

//           const pageBlock = exhibitJson.find(
//             exhibit =>
//               exhibit.slug === "home-page" ||
//               exhibit.slug === "homepage" ||
//               exhibit.order === 0
//           ).page_blocks[0];

//           const itemId = pageBlock.attachments[0].item.id;
//           const filesRes = await fetch(
//             `${currentUrl}${FILES_ENDPOINT}?item=${itemId}`
//           );
//           const filesJson = await filesRes.json();

//           const thumbnailUrl = filesJson[0].file_urls.square_thumbnail;
//           return Object.assign({}, exhibit, {
//             thumbnailUrl
//           });
//         })
//         .reverse()
//     );
//   }

//   return { exhibitions };
// };

// export default ExhibitionsPage;
