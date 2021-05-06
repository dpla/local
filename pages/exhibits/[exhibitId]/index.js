import React from "react"
import MainLayout from "components/MainLayout"
import DPLAHead from "components/DPLAHead";
import Exhibit from "components/Exhibits/components/Exhibit"

function ExhibitPage({ exhibit }) {

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
    return {
      notFound: true,
    }
  }

  const paths = rawExhibits.map(exhibit => ({
    params: { exhibitId: exhibit.slug },
  }))

  return { paths, fallback: false }
}

const loadExhibit = async exhibit => {
  const exhibitPageRes = await fetch(`https://dp.la/api/exhibition_pages?exhibit=${exhibit.id}`);
  const rawPages = await exhibitPageRes.json()
  rawPages.forEach( (page) => {
    const blocks = page.page_blocks.sort((b1, b2) => {b1.order -  b2.order}).map( (block) => {
      //TODO
    })
  })
  const topPages = rawPages.filter(page => page.parent === null).sort((p1, p2) => p1.order - p2.order)
  exhibit.pages = topPages
  topPages.forEach( (page) => {
    const pageId = page.id
    page.children = rawPages.filter( page => page.parent && page.parent.id === pageId).sort( (p1, p2) => { p1.order - p2.order} )
  } )
  const frontAttachmentId = exhibit.pages[0].page_blocks[0].attachments[0].item.id
  const filesRes = await fetch(`https://dp.la/api/files?item=${frontAttachmentId}`)
  const filesJson = await filesRes.json()
  exhibit.frontImage = filesJson[0].file_urls
  return exhibit
}

export async function getStaticProps({ params }) {
  const exhibitId = params.exhibitId
  const res = await fetch('https://dp.la/api/exhibitions')
  const rawExhibits = await res.json()

  if (!rawExhibits) {
    return {
      notFound: true,
    }
  }

  const exhibitsFiltered = rawExhibits.filter( (exhibit) => exhibit.slug === exhibitId)

  if (!exhibitsFiltered) {
    return {
      notFound: true
    }
  }

  const exhibitLoaded = await loadExhibit(exhibitsFiltered[0])

  return {
    props: {
      exhibit: exhibitLoaded
    }
  }
}

export default ExhibitPage;
