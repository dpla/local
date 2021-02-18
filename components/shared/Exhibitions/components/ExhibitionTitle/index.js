import css from "./ExhibitionTitle.module.scss"
import parse from 'html-react-parser';

const ExhibitionTitle = ({title, description, credits, citation, thumbnail, banner, caption}) => {
  return (
    <section className={css.chapter_title__section}>   
      {/* <div className={css.chapter_title__image}>
        <img src={image} alt={imageAlt}/>
      </div> */}
      <div className={css.chapter_title__info}>
        <p>{title}</p>
        {parse(description)}
        {credits}
        {parse(citation)}
      </div>
    </section>
  )
}

export default ExhibitionTitle