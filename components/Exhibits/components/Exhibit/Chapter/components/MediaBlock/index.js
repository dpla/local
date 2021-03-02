import parse from 'html-react-parser';
import scss from "./MediaBlock.module.scss"
const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const DIRECTUS_ENDPOINT = process.env.NEXT_PUBLIC_DIRECTUS_ENDPOINT

const MediaBlock = ({ data }) => {
  return (
    <section className={scss.media_block__section}>
      {data.media_file.type == 'image/jpeg' &&
        <>
          <img src={`${DIRECTUS_ENDPOINT}${data.media_file.id}?asset_token=${API_KEY}`} onError={(e) => {e.target.src="https://via.placeholder.com/150"}}/>
          {parse(data.caption)}
        </>
      }
    </section>
  )
}

export default MediaBlock