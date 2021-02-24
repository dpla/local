import React from "react"
import MainLayout from "components/MainLayout"
import { exhibitExample } from "constants/exhibit"
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

  const paths = Object.keys(exhibitExample).map((key) => ({
    params: { exhibitId: key },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  let exhibit = exhibitExample;
  exhibit["exhibitId"] = params.exhibitId

  return {
    props: {
      exhibit: exhibit[params.exhibitId]
    }
  }
}

export default ExhibitPage;
