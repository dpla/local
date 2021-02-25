import { withRouter } from "next/router";
import MainLayout from "components/MainLayout";
import VermontAbout from "components/Vermont/About"
import { LOCALS, LOCAL_ID } from "constants/local";
import FeatureHeader from "shared/FeatureHeader";

const components = {
  vermont: VermontAbout
}

const About = ({ router }) => {
  const local = LOCALS[LOCAL_ID]
  const About = components[local.theme];
  const title = local.routes['/about'].title
  const description = local.routes['/about'].description

  return (
    <MainLayout
      route={router}
      pageTitle={`${title}`}
      pageDescription={`${description}`}
      hidePageHeader={false}
      hideSearchBar={false}
    >
      <FeatureHeader title="About" />
      <div id="main" role="main">
        <About />
      </div>
    </MainLayout>
  )
}

export default withRouter(About);
