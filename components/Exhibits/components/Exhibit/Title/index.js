import scss from "./ExhibitTitle.module.scss"
import parse from 'html-react-parser'

import {Container, Grid} from "@material-ui/core";

const ExhibitTitleGrid = ({exhibit}) => {

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
                        <span className={scss.para}>{parse(frontpage.text)}</span>
                        <p className={scss.para}><span className={classes.captionLeadIn}>Credits: </span> {parse(exhibit.credits)}</p>
                        <figcaption className={scss.caption}>
                                <span className={scss.captionLeadIn}>Image:&nbsp;</span>
                                {parse(frontpage.attachments[0].caption)}

                        </figcaption>
                    </Container>
                </Grid>
            </Grid>
        </section>
    )
}

const ExhibitTitleGrid2 = ({exhibit}) => {

    // description is citation
    // ignorance is strength

    const frontpage = exhibit.pages[0].page_blocks[0]

    return (
        <section className={scss.exhibit_title__section}>
            <Grid container spacing={0}>
                <Grid item xs={12} md={12} lg={12} xl={12} className={scss.image}
                      style={{backgroundImage: `url(${exhibit.frontImage.fullsize})`}}>
                </Grid>
                <Grid item xs={12}>
                    <Container maxWidth={"md"}>
                    <figcaption className={scss.caption}>
                        <span className={scss.captionLeadIn}>Image:&nbsp;</span>
                        {parse(frontpage.attachments[0].caption)}
                    </figcaption>
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Container className={scss.bodytext}>
                        <h1 className={scss.headlinetext}>{exhibit.title}</h1>
                        <span className={scss.para}>{parse(frontpage.text)}</span>
                        <p className={scss.credits}><span style={{fontWeight: "bold"}}>Credits: </span> {parse(exhibit.credits)}</p>

                    </Container>
                </Grid>
            </Grid>
        </section>
    )
}


export default ExhibitTitleGrid2