import React from "react"
import MainLayout from "components/MainLayout"
import DPLAHead from "components/DPLAHead";
import Exhibit from "components/Exhibits/components/Exhibit"

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

// we have to do a bunch of work to get the pages out of omeka
// because it doesn't return the pages nested and it doesn't load files

const loadBlockAttachment = async (attachment) => {
    const itemUrl = `https://dp.la/api/files?item=${attachment.item.id}`
    const filesRes = await fetch(itemUrl)
    const files = await filesRes.json()
    if (files) attachment.files = files
}

const loadExhibit = async exhibit => {
    const exhibitUrl = `https://dp.la/api/exhibition_pages?exhibit=${exhibit.id}`
    const exhibitPageRes = await fetch(exhibitUrl);
    const allPages = await exhibitPageRes.json()

    // sort the page blocks, load all the file info
    await allPages.map( async (page) => {
        page.page_blocks = page.page_blocks.sort((b1, b2) => { b1.order - b2.order })
        await Promise.all(page.page_blocks.map(async (block) => {
            await Promise.all(block.attachments.map(attachment => loadBlockAttachment(attachment)))
        }))
    })

    // top pages are all the pages that have no parents
    const topPages = allPages
        .filter(page => page.parent === null)
        .sort((p1, p2) => p1.order - p2.order)

    exhibit.pages = topPages

    // assign all the children to their parents
    // we're assuming one level of nesting
    topPages.forEach((page) => {
        page.children = allPages
            .filter(page => page.parent && page.parent.id === page.id)
            .sort((p1, p2) => {
                p1.order - p2.order
            })
    })

    const frontAttachmentId = exhibit.pages[0].page_blocks[0].attachments[0].item.id
    const filesRes = await fetch(`https://dp.la/api/files?item=${frontAttachmentId}`)
    const filesJson = await filesRes.json()
    exhibit.frontImage = filesJson[0].file_urls

    return exhibit
}

export async function getStaticPaths() {
    const res = await fetch('https://dp.la/api/exhibitions')
    const rawExhibits = await res.json()

    if (!rawExhibits) {
        return {notFound: true}
    }

    const paths = rawExhibits.map(exhibit => ({params: {exhibitId: exhibit.slug}}))
    return { paths, fallback: false }
}

// loads props for an exhibit given the slug in params
export async function getStaticProps({params}) {
    const exhibitId = params.exhibitId
    const res = await fetch('https://dp.la/api/exhibitions')
    const rawExhibits = await res.json()
    if (!rawExhibits) return {notFound: true}
    const exhibitsFiltered = rawExhibits.filter((exhibit) => exhibit.slug === exhibitId)
    if (!exhibitsFiltered) return {notFound: true}
    const exhibitLoaded = await loadExhibit(exhibitsFiltered[0])
    return {props: {exhibit: exhibitLoaded}}
}

export default ExhibitPage;
