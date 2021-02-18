import ExhibitionTitle from "./components/ExhibitionTitle"
import Chapter from "./components/Chapter"
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

      {exhibitionExample.pages.map((chapter, index) => {
        return (
          <Chapter chapter={chapter} index={index} key={`chapter-${index+1}`}/>
        )
      })}

    </section>
  )
}

export default Exhibition