import scss from "./Exhibits.module.scss"
import { exhibitExample } from "constants/exhibit.js"
import { EXHIBITS_ENDPOINT } from "constants/exhibits.js"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const Exhibits = () => {
  return (
    <section className={scss.exhibit__section}>
      <h1>Exhibits</h1>

      <Card className={scss.card}>
        <CardActionArea href={`exhibits/${exhibitExample.slug}`}>
          <CardMedia
            component="img"
            alt={exhibitExample.caption}
            height="140"
            image={`${EXHIBITS_ENDPOINT}${exhibitExample.banner}`}
            title={exhibitExample.caption}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {exhibitExample.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </section>
  )
}

export default Exhibits