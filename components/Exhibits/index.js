import scss from "./Exhibits.module.scss"

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Link from "next/link"
import FeatureHeader from "shared/FeatureHeader";
import {LOCALS} from "constants/local-data"

import {makeStyles} from '@material-ui/core/styles';
import {Container, Grid} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: "200px"
    }
}));

function Exhibits( {exhibits} ) {
    const classes = useStyles()
    const LOCAL_ID = process.env.NEXT_PUBLIC_LOCAL_ID
    const local = LOCALS[LOCAL_ID]

    return (<>
            <FeatureHeader title={local.exhibits.title} description={local.exhibits.description}/>
            <section className={scss.exhibits__section}>
                <div className={scss.exhibits__container}>

                    <div className={scss.wrapper}>
                        <Container>
                            <Grid container spacing={8}>
                                {
                                    exhibits.map(exhibit => {
                                        return (
                                            <Grid item key={exhibit.slug} xs={12} sm={6} md={6}>
                                                <Card key={exhibit.title} className={classes.root}>
                                                    <Link href={`/exhibits/${exhibit.slug}`}>
                                                        <a>
                                                            <CardMedia
                                                                className={classes.details}
                                                                component="img"
                                                                image={exhibit.thumbnailUrl}

                                                            />
                                                        </a>
                                                    </Link>
                                                    <div className={scss.exhibitionText}>
                                                        <CardContent style={{ padding: 0, margin: 0, display: "flex"}}>
                                                            <CardContent>
                                                                <Link href={`/exhibits/${exhibit.slug}`}><a><h2
                                                                    className={scss.title}>
                                                                    {exhibit.title}
                                                                </h2></a></Link>
                                                            </CardContent>
                                                        </CardContent>
                                                    </div>
                                                </Card>
                                            </Grid>
                                        )
                                    })}
                            </Grid>
                        </Container>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Exhibits