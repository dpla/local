import { withRouter } from "next/router";
import MainLayout from "components/MainLayout";
// import VermontExhibitions from "components/Vermont/Exhibitions"
// import FloridaExhibitions from "components/Florida/Exhibitions"
import { LOCALS, LOCAL_ID } from "constants/local";
import Exhibits from "components/shared/Exhibits"

// const components = {
//   vermont: VermontExhibits
// }

const ExhibitsPage = ({ router }) => {
  const local = LOCALS[LOCAL_ID]
  // const Exhibits = components[local.theme];
  const title = local.routes['/exhibits'].title
  const description = local.routes['/exhibits'].description

  return (

    <MainLayout  route={router} pageTitle={title}
    pageDescription={description}>
      <div id="main" role="main">
        <Exhibits />

      </div>
    </MainLayout>
  )
}

export default withRouter(ExhibitsPage);