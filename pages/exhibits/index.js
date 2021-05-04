import {withRouter} from "next/router"
import MainLayout from "components/MainLayout"
import { LOCALS } from "constants/local-data"
import Exhibits from "components/Exhibits"
import DPLAHead from "components/DPLAHead"
import { exhibits } from "constants/exhibits"

const ExhibitsPage = ({router}) => {
    const LOCAL_ID = process.env.NEXT_PUBLIC_LOCAL_ID
    const local = LOCALS[LOCAL_ID]
    // const title = local.routes['/exhibits'].title
    // const description = local.routes['/exhibits'].description

    return (
        <MainLayout route={router} pageTitle={"Exhibits"}
                    pageDescription={"Some exhibits"} id="main" role="main">
            <DPLAHead
                pageTitle={"Exhibits"}
                pageDescription={"Some exhibits"}
                pageImage=""
                pageImageCaption=""
            />
            <Exhibits/>
        </MainLayout>
    )
}

export default withRouter(ExhibitsPage);