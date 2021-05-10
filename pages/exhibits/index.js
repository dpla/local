import {withRouter} from "next/router"
import { loadAllExhibits } from "pages/api/exhibits"
import { useRouter } from 'next/router'
import MainLayout from "components/MainLayout"
import {LOCALS} from "constants/local-data"
import Exhibits from "components/Exhibits"
import DPLAHead from "components/DPLAHead"
import ErrorPage from "next/error";

const ExhibitsPage = ({router, exhibits}) => {

    const LOCAL_ID = process.env.NEXT_PUBLIC_LOCAL_ID
    const local = LOCALS[LOCAL_ID]

    if (! local.exhibits ) {
        return <ErrorPage statusCode={404} />
    }

    const title = local.exhibits.title
    const description = local.exhibits.description

    return (
        <MainLayout route={router} pageTitle={title}
                    pageDescription={description} id="main" role="main">
            <DPLAHead
                pageTitle={title}
                pageDescription={description}
                pageImage=""
                pageImageCaption=""
            />
            <Exhibits exhibits={exhibits}/>
        </MainLayout>
    )
};



export async function getStaticProps(context) {
    const exhibits = await loadAllExhibits()
    return { props: { exhibits } }
}


export default withRouter(ExhibitsPage);