import parse from 'html-react-parser';
import scss from "./MediaBlock.module.scss"
import {Card, Container} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const MediaBlock = (attachment) => {
  return (
    <section className={scss.media_block__section}>
      {attachment.data.files && attachment.data.files.map(file => {
        return (
            <>
              <img alt="" src={file.file_urls.original} />
            </>
        )
      })}
      <caption>{attachment.data.caption && parse(attachment.data.caption)}</caption>

    </section>
  )
}

const MediaBlock2 = (attachment) => {
    return (
        <section className={scss.media_block__section}>
            <Card>
                <CardMedia className={scss.cardImage} image={attachment.data.files[0].file_urls.original} />
                <CardContent>
                    <caption className={scss.caption}>{attachment.data.caption && parse(attachment.data.caption)}</caption>
                </CardContent>
            </Card>
        </section>
    )
}


export default MediaBlock2