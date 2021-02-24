import scss from "./Exhibits.module.scss"
import { exhibitExample } from "constants/exhibit"
import { EXHIBITS_ENDPOINT } from "constants/exhibits.js"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from "next/link"

const Exhibits = () => {
  // this logic will have to be updated once more exhibits are available
  // currently it's hardcoded to look at the one object in the json example
  const exhibits = exhibitExample["erie-canal"]

  return (
    <section className={scss.exhibits__section}>
      <div className={scss.exhibits__container}>
        <h1>Exhibits</h1>

        <Card className={scss.card}>
          <CardActionArea>
            <Link href="/exhibits/[exhibitId]" as={`exhibits/${exhibits.slug}`}>
              <div>
                <CardMedia
                  component="img"
                  alt={exhibits.caption}
                  height="140"
                  image={`${EXHIBITS_ENDPOINT}${exhibits.banner}`}
                  title={exhibits.caption}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {exhibits.title}
                  </Typography>
                </CardContent>
              </div>
            </Link>
          </CardActionArea>
        </Card>
      </div>
    </section>
  )
}

export default Exhibits