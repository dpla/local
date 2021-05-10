import React from "react"
import MainLayout from "components/MainLayout"
import DPLAHead from "components/DPLAHead";
import Exhibit from "components/Exhibits/components/Exhibit"
import {loadExhibit} from "../../api/exhibits/[exhibitId]";

function ExhibitPage({exhibit}) {
    return (
        <MainLayout
            className="main"
            role="main"
        >
            <DPLAHead
                pageTitle={`${exhibit.title} | DPLA`}
                pageDescription={exhibit.description}
                pageImage={exhibit.banner}
                pageImageCaption={exhibit.caption}
            />
            <Exhibit exhibit={exhibit}/>
        </MainLayout>
    )
}



export async function getStaticPaths() {
    const res = await fetch('https://dp.la/api/exhibitions')
    const rawExhibits = await res.json()

    if (!rawExhibits) {
        return {notFound: true}
    }

    const paths = rawExhibits.map(exhibit => ({params: {exhibitId: exhibit.slug}}))
    return {paths, fallback: false}
}

// loads props for an exhibit given the slug in params
export async function getStaticProps(context) {
    const {exhibitId} = context.params
    const exhibitLoaded = await loadExhibit(exhibitId)
    return {props: {exhibit: exhibitLoaded}}
}

export default ExhibitPage;
