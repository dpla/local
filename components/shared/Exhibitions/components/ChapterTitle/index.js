import css from "./ChapterTitle.module.scss"

const ChapterTitle = ({chapter, years, title, image, imageAlt}) => {
  return (
    <section className={css.chapter_title__section}>   
      <div className={css.chapter_title__image}>
        <img src={image} alt={imageAlt}/>
      </div>
      <div className={css.chapter_title__info}>
        <p>{chapter} | {years}</p>
        <p>{title}</p>
      </div>
    </section>
  )
}

export default ChapterTitle