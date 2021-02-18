import ChapterTitle from "./components/ChapterTitle"
import ExhibitionTitle from "./components/ExhibitionTitle"
import css from "./Exhibition.module.scss"
import { exhibitionExample } from "constants/exhibition"

const Exhibition = () => {
  return (
    <section className={css.exhibition__section}>
      <ExhibitionTitle 
        title={exhibitionExample.title}
        description={exhibitionExample.description}
        credits={exhibitionExample.credits}
        citation={exhibitionExample.citation}
        thumbnail={exhibitionExample.thumbnail}
        banner={exhibitionExample.banner}
        caption={exhibitionExample.caption}
      />

      {/* <ChapterTitle
        chapter="Chapter One"
        title={exhibitionExample.title}
        image="https://via.placeholder.com/350"
        imageAlt="#" /> */}
    </section>
  )
}

export default Exhibition