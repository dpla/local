import scss from "./ExhibitTitle.module.scss"
import parse from 'html-react-parser';
import { EXHIBITS_ENDPOINT } from "constants/exhibits"

const ExhibitTitle = ({title, description, credits, citation, banner}) => {
  return (
    <section className={scss.exhibit_title__section}>   
      <div className={scss.exhibit_title__image}>
        <img src={`${EXHIBITS_ENDPOINT}${banner}`} alt=""/>
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

export default ExhibitTitle