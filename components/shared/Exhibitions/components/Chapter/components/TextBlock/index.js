import parse from 'html-react-parser';
import scss from "./TextBlock.module.scss"

const TextBlock = ({ data }) => {
  return (
    <section className={scss.text_block__section}>
      {/* {data.slug} */}
      <h3>{data.headline}</h3>
      {parse(data.text)}
    </section>
  )
}

export default TextBlock