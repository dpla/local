import { withRouter } from "next/router";
import MainLayout from "components/MainLayout";
// import VermontExhibitions from "components/Vermont/Exhibitions"
// import FloridaExhibitions from "components/Florida/Exhibitions"
import { LOCALS, LOCAL_ID } from "constants/local";
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
    <div id="main" role="main">
      <Exhibitions />
    </div>
  )
}

export default withRouter(ExhibitionsPage);