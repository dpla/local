import Title from "./Title"
import Chapter from "./Chapter"
import scss from "./Exhibit.module.scss"
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useState} from "react"

const Exhibit = ({exhibit}) => {
    const [expanded, setExpanded] = useState("panel1");

    // passing in the specific panel makes it so that each of the accordions can be toggled
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(true) //(newExpanded ? panel : false);
    };

    return (
        <>
            <section key="exhibit-title" className={scss.exhibit__section}>
                <Title exhibit={exhibit}/>
            </section>
            {
                exhibit.pages.map((page, index) => {
                    // frontpage is handled Title
                    if (index === 0) return (<div/>)
                    return (
                        <section key={`chapter-${index}`}>

                            { /* mobile view }
                            {/*<div key={`chapter-mobile-${index}`} className={scss.exhibit__mobile_cards}>*/}
                            {/*    <Accordion className={scss.exhibit__accordion}>*/}
                            {/*        <AccordionSummary*/}
                            {/*            expandIcon={<ExpandMoreIcon />}*/}
                            {/*        >*/}
                            {/*            <Typography*/}
                            {/*                component="h2"*/}
                            {/*                className={scss.exhibit__chapter}>*/}
                            {/*                Chapter {index}: {page.title}*/}
                            {/*            </Typography>*/}
                            {/*        </AccordionSummary>*/}
                            {/*        <AccordionDetails>*/}
                            {/*            { child }*/}
                            {/*        </AccordionDetails>*/}
                            {/*    </Accordion>*/}
                            {/*</div>*/}

                            <div key={`chapter-desktop-${index}`} className={scss.exhibit__desktop_cards}>
                                <Accordion
                                    expanded={expanded === `panel${index + 1}`}
                                    className={scss.exhibit__accordion}
                                    onChange={handleChange(`panel${index + 1}`)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        className={scss.exhibit__accordion_summary}
                                    >
                                        <h2 className={scss.exhibit__chapter}>
                                            Chapter {index + 1}: {page.title}
                                        </h2>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Chapter parentPage={page} index={index} key={`chapter-${index}`}/>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </section>
                    )
                })
            }</>
    )
}


export default Exhibit