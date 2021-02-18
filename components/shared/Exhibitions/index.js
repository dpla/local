import ChapterTitle from "./components/ChapterTitle"
import css from "./Exhibition.module.scss"

const Exhibition = () => {
  return (
    <section className={css.exhibition__section}>
      <ChapterTitle
        chapter="Chapter One"
        years="1600-1800"
        title="Two Hundred Years on the Erie Canal"
        image="https://via.placeholder.com/350"
        imageAlt="#" />
    </section>
  )
}

export default Exhibition