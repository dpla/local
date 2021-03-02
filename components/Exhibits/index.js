import scss from "./Exhibits.module.scss"
import { directusExhibit } from "constants/exhibit"
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Link from "next/link"
const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const DIRECTUS_ENDPOINT = process.env.NEXT_PUBLIC_DIRECTUS_ENDPOINT

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
                        image={`${DIRECTUS_ENDPOINT}${exhibit.banner.id}?asset_token=${API_KEY}`}
                        onError={(e) => {e.target.src="https://via.placeholder.com/150"}}
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