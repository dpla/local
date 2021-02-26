import scss from "./ExhibitTitle.module.scss"
import parse from 'html-react-parser'
import { EXHIBITS_ENDPOINT } from "constants/exhibits"

// parse takes the strings that include html and converts them to html & content
const ExhibitTitle = ({title, description, credits, citation, banner}) => {
  return (
    <section className={scss.exhibit_title__section}>   
      <div className={scss.exhibit_title__image}>
        {/* <img src={`${EXHIBITS_ENDPOINT}${banner}`} alt=""/> */}
      </div>
      <div className={scss.exhibit_title__info}>
        <h1>{title}</h1>
        {parse(description)}
        {parse(credits)}
        {parse(citation)}
      </div>
    </section>
  )
}

export default ExhibitTitle