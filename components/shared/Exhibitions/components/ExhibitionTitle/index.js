import scss from "./ExhibitionTitle.module.scss"
import parse from 'html-react-parser';

const ExhibitionTitle = ({title, description, credits, citation, banner, caption}) => {
  return (
    <section className={scss.exhibit_title__section}>   
      <div className={scss.exhibit_title__image}>
        <img src={`${banner}`} alt=""/>
      </div>
      <div className={scss.exhibit_title__info}>
        <h1>{title}</h1>
        {parse(description)}
        {credits}
        {parse(citation)}
      </div>
    </section>
  )
}

export default ExhibitionTitle