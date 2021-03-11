import { withRouter } from "next/router";
import MainLayout from "components/MainLayout";
import About from "components/About"
import { LOCALS } from "constants/local-data";
import FeatureHeader from "shared/FeatureHeader";
import { getCurrentUrl } from "lib";
const LOCAL_ID = process.env.NEXT_PUBLIC_LOCAL_ID

const AboutPage = ({ router, content }) => {
  const local = LOCALS[LOCAL_ID]
  const title = local.routes['/about'].title
  const description = local.routes['/about'].description

  return (
    <MainLayout
      route={router}
      pageTitle={`${title}`}
      pageDescription={`${description}`}
    >
      <FeatureHeader title="About" />
      <div id="main" role="main">
        <About content={content}/>
      </div>
    </MainLayout>
  )
}

AboutPage.getInitialProps = async ({ req }) => {
  const fullUrl = getCurrentUrl(req);
  const markdownUrl = `${fullUrl}/static/${LOCALS[LOCAL_ID]
    .theme}/about.md`;
  const markdownResponse = await fetch(markdownUrl);
  const pageMarkdown = await markdownResponse.text();

  return {
    content: pageMarkdown
  };
};

export default withRouter(AboutPage);
