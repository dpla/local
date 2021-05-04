import {withRouter} from "next/router"
import MainLayout from "components/MainLayout"
import {LOCALS} from "constants/local-data"
import Exhibits from "components/Exhibits"
import DPLAHead from "components/DPLAHead"

const ExhibitsPage = ({router, exhibits}) => {
    const LOCAL_ID = process.env.NEXT_PUBLIC_LOCAL_ID
    const local = LOCALS[LOCAL_ID]
    const title = local.routes['/exhibits'].title
    const description = local.routes['/exhibits'].description

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

const loadExhibit = async exhibit => {

    const exhibitPageRes = await fetch(
        `https://dp.la/api/exhibition_pages?exhibit=${exhibit.id}`
    );
    const exhibitJson = await exhibitPageRes.json();

    const pageBlock = exhibitJson.find(
        exhibit =>
            exhibit.slug === "home-page" ||
            exhibit.slug === "homepage" ||
            exhibit.order === 0
    ).page_blocks[0];

    const itemId = pageBlock.attachments[0].item.id;
    const filesRes = await fetch(
        `https://dp.la/api/files?item=${itemId}`
    );
    const filesJson = await filesRes.json();
    exhibit.thumbnailUrl = filesJson[0].file_urls.square_thumbnail

    console.log(exhibit)
    return exhibit
}

export async function getServerSideProps() {
    const res = await fetch('https://dp.la/api/exhibitions')
    const rawExhibits = await res.json()

    if (!rawExhibits) {
        return {
            notFound: true,
        }
    }

    const exhibits = (await Promise.all(rawExhibits.map((exhibit) => loadExhibit(exhibit))))
        .sort( (a, b) => b.id - a.id)

    return { props: { exhibits } }
}


export default withRouter(ExhibitsPage);