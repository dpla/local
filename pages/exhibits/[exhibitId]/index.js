import React from "react"
import MainLayout from "components/MainLayout"
import { exhibitExample, directusExhibit } from "constants/exhibit"
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
};

export async function getStaticPaths() {

  const paths = directusExhibit.data.items.exhibit.map(exhibit => ({
    params: { exhibitId: exhibit.slug },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  let exhibit = directusExhibit.data.items.exhibit;
  exhibit["exhibitId"] = params.exhibitId

  return {
    props: {
      exhibit: exhibit[0]
    }
  }
}

export default ExhibitPage;
