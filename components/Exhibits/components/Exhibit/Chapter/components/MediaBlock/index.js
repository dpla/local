import parse from 'html-react-parser';
import scss from "./MediaBlock.module.scss"

const MediaBlock = ({ data }) => {
  return (
    <section className={scss.media_block__section}>
      {data.media_file.type == 'image/jpeg' &&
        <>
          <img src={data.url} />
          {parse(data.caption)}
        </>
      }
    </section>
  )
}

export default MediaBlock