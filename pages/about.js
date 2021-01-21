import { withRouter } from "next/router";
import MainLayout from "components/MainLayout";
import VermontAbout from "components/Vermont/About"
import { LOCALS, LOCAL_ID } from "constants/local";

const components = {
  vermont: VermontAbout
}
    
const About = ({ router }) => {
  const About = components[LOCALS[LOCAL_ID].theme];

  return (
    <MainLayout hidePageHeader={true} hideSearchBar={true} route={router}>
      <div id="main" role="main">
        <About />
      </div>
    </MainLayout>
  )
}

export default withRouter(About);
