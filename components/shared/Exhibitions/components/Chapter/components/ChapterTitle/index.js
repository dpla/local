import css from "./ChapterTitle.module.scss"

const ChapterTitle = ({chapter, title, image, imageAlt}) => {
  return (
    <section className={css.chapter_title__section}>   
      <div className={css.chapter_title__info}>
        <h2>{chapter}</h2>
        <p>{title}</p>
      </div>
    </section>
  )
}

export default ChapterTitle