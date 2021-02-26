import scss from "./Exhibits.module.scss"
import { directusExhibit } from "constants/exhibit"
import { EXHIBITS_ENDPOINT } from "constants/exhibits.js"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from "next/link"

const Exhibits = () => {
  const exhibits = directusExhibit.data.items.exhibit

  return (
    <section className={scss.exhibits__section}>
      <div className={scss.exhibits__container}>
        <h1>Exhibits</h1>
        <div className={scss.exhibits__cards}>

          {exhibits.map(exhibit => {
            return (
              <Card className={scss.card} key={exhibit.title}>
                <CardActionArea>
                  <Link href="/exhibits/[exhibitId]" as={`exhibits/${exhibit.slug}`}>
                    <div>
                      <CardMedia
                        component="img"
                        alt={exhibit.caption}
                        height="140"
                        image={`${EXHIBITS_ENDPOINT}${exhibit.banner.filename_disk}`}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {exhibit.title}
                        </Typography>
                      </CardContent>
                    </div>
                  </Link>
                </CardActionArea>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Exhibits