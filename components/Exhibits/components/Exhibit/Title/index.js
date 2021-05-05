import scss from "./ExhibitTitle.module.scss"
import parse from 'html-react-parser'
const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const DIRECTUS_ENDPOINT = process.env.NEXT_PUBLIC_DIRECTUS_ENDPOINT

// parse takes the strings that include html and converts them to html & content
const ExhibitTitle = ({title, description, credits, citation, banner}) => {
  return (
    <section className={scss.exhibit_title__section}>   
      <div className={scss.exhibit_title__image}>
        <img src={banner} alt={""} />
      </div>
      <div className={scss.exhibit_title__info}>
        <h1>{title}</h1>
        {parse(description)}
        {parse(credits)}
      </div>
    </section>
  )
}

export default ExhibitTitle