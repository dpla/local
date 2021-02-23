import parse from 'html-react-parser';
import scss from "./MediaBlock.module.scss"

const MediaBlock = ({ data }) => {
  return (
    <section className={scss.media_block__section}>
      {data.mime_type == 'image/jpeg' &&
        <>
          <img src={data.url} />
          <p>{parse(data.text)}</p>
        </>
      }
    </section>
  )
}

export default MediaBlock