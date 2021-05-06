import scss from "./ExhibitTitle.module.scss"
import parse from 'html-react-parser'
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from "@material-ui/core/Typography";
import {Container, Grid, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {},
    banner: {
        margin: 'auto',
        display: 'block',
        width: '100%',
        height: 'auto',
    },
    image: {
        backgroundRepeat: "no-repeat",
        backgroundClip: "border-box",
        backgroundPosition: "center",
        backgroundSize: "cover"
    },
    text: {
        padding: "15px"
    },
    title: {},
    captionLeadIn: {
        fontWeight: 600,
        textTransform: "uppercase",
        marginRight: "0.25rem"
    },
    caption: {
        color: scss.dimmedTextColor,
        display: "flex",
        fontSize: "0.875rem",
        lineHeight: "1.125",
        padding: "0 1rem"
    }
}));

const ExhibitTitleGrid = ({exhibit}) => {
    const classes = useStyles()

    // description is citation
    // credits is credits
    // title is title
    // banner is big image
    // ignorance is strength

    const frontpage = exhibit.pages[0].page_blocks[0]

    console.log(frontpage)

    return (
        <section className={scss.exhibit_title__section}>
            <Grid container className={classes.root} spacing={0}>
                <Grid item xs={6} md={6} lg={6} xl={6} className={classes.image}
                      style={{backgroundImage: `url(${exhibit.frontImage.fullsize})`}}/>
                <Grid item xs={6}>
                    <Container className={classes.text}>
                        <Typography gutterBottom variant={"h1"} component={"h1"}>{exhibit.title}</Typography>
                        <Typography gutterBottom variant={"body1"} component={"p"}>{parse(frontpage.text)}</Typography>
                        <Typography gutterBottom variant={"body2"} component={"p"}><span className={classes.captionLeadIn}>Credit: </span> {parse(exhibit.credits)}</Typography>
                        <figcaption className={classes.caption}>
                            <Typography gutterBottom component={""}>
                                <span className={classes.captionLeadIn}>Image: </span>
                                {parse(frontpage.attachments[0].caption)}
                            </Typography>
                        </figcaption>
                    </Container>
                </Grid>
            </Grid>
        </section>
    )
}

export default ExhibitTitleGrid