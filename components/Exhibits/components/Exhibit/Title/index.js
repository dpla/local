import scss from "./ExhibitTitle.module.scss"
import parse from 'html-react-parser'
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from "@material-ui/core/Typography";
import {Container, Grid, makeStyles} from "@material-ui/core";
import {red} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    root: {
    },
    banner: {
        margin: 'auto',
        display: 'block',
        width: '100%',
        height: 'auto',
    },
    content: {
        // flexDirection: "row",
        //width: "100%",
        //height: "auto"
    }
}));

const ExhibitTitleGrid = ({title, description, credits, banner}) => {
    const classes = useStyles()
    return (
        <section className={scss.exhibit_title__section}>
            <Grid container className={classes.root} spacing={0}>
                <Grid item xs={6} md={6} lg={6} xl={6}>
                    <div style={{backgroundImage: `url(${banner})`}} className={classes.banner}/>
                </Grid>
                <Grid item xs={6}>
                    <Typography component={"h1"}>{title}</Typography>
                    <Typography component={"p"}>{parse(description)}</Typography>
                    <Typography component={"p"}>{parse(credits)}</Typography>
                </Grid>
            </Grid>
        </section>
    )
}


// parse takes the strings that include html and converts them to html & content
const ExhibitTitleCard = ({title, description, credits, banner}) => {
    const classes = useStyles()
    return (
        <section className={scss.exhibit_title__section}>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.media}
                    image={banner}
                    title=""
                />
                <CardContent>
                    <Typography component={"h1"}>{title}</Typography>
                    <Typography component={"p"}>{parse(description)}</Typography>
                    <Typography component={"p"}>{parse(credits)}</Typography>
                </CardContent>
            </Card>
        </section>
    )
}

export default ExhibitTitleGrid