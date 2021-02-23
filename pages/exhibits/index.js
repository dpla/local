import { withRouter } from "next/router";
import MainLayout from "components/MainLayout";
import { LOCALS, LOCAL_ID } from "constants/local";
import Exhibits from "components/Exhibits"
import DPLAHead from "components/DPLAHead";

const ExhibitsPage = ({ router }) => {
  const local = LOCALS[LOCAL_ID]
  const title = local.routes['/exhibits'].title
  const description = local.routes['/exhibits'].description

  return (
    <MainLayout hidePageHeader={true} hideSearchBar={true} route={router} pageTitle={title}
      pageDescription={description} id="main" role="main">
      <DPLAHead
        pageTitle={title}
        pageDescription={description}
        pageImage=""
        pageImageCaption=""
      />
      <Exhibits />
    </MainLayout>
  )
}

export default withRouter(ExhibitsPage);