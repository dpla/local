import scss from "./ExhibitTitle.module.scss"
import parse from 'html-react-parser'

import {Container, Grid, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

}));

const ExhibitTitleGrid = ({exhibit}) => {
    const classes = useStyles()

    // description is citation
    // ignorance is strength

    const frontpage = exhibit.pages[0].page_blocks[0]

    return (
        <section className={scss.exhibit_title__section}>
            <Grid container  spacing={0}>
                <Grid item xs={6} md={6} lg={6} xl={6} className={scss.image}
                      style={{backgroundImage: `url(${exhibit.frontImage.fullsize})`}}/>
                <Grid item xs={6}>
                    <Container className={scss.bodytext}>
                        <h1 className={scss.headlinetext}>{exhibit.title}</h1>
                        <p className={scss.para}>{parse(frontpage.text)}</p>
                        <p className={scss.para}><span className={classes.captionLeadIn}>Credits: </span> {parse(exhibit.credits)}</p>
                        <figcaption className={scss.caption}>
                            <p className={scss.para}>
                                <span className={scss.captionLeadIn}>Image: </span>
                                {parse(frontpage.attachments[0].caption)}
                            </p>
                        </figcaption>
                    </Container>
                </Grid>
            </Grid>
        </section>
    )
}

export default ExhibitTitleGrid