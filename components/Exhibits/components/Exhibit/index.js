import Title from "./Title"
import Chapter from "./Chapter"
import scss from "./Exhibit.module.scss"
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useState } from "react"

const Exhibit = ({ exhibit }) => {
  const [expanded, setExpanded] = useState("panel1");

  // passing in the specific panel makes it so that each of the accordions can be toggled
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <section className={scss.exhibit__section}>
      <Title
        title={exhibit.title}
        description={exhibit.description}
        credits={exhibit.credits}
        banner={exhibit.frontImage.fullsize}
        caption={exhibit.caption}
      />

      {/*{exhibit.pages.map((chapter, index) => {*/}
      {/*  return (*/}
      {/*    <section key={`chapter-${index+1}`}>*/}
      {/*      <div key={`chapter-mobile-${index + 1}`} className={scss.exhibit__mobile_cards}>*/}
      {/*        <Accordion className={scss.exhibit__accordion}>*/}
      {/*          <AccordionSummary*/}
      {/*            expandIcon={<ExpandMoreIcon />}*/}
      {/*          >*/}
      {/*            <Typography component="h2" className={scss.exhibit__chapter}>Chapter {index + 1}: {chapter.title}</Typography>*/}
      {/*          </AccordionSummary>*/}
      {/*          <AccordionDetails>*/}
      {/*            <Chapter chapter={chapter} index={index} key={`chapter-${index + 1}`} />*/}
      {/*          </AccordionDetails>*/}
      {/*        </Accordion>*/}
      {/*      </div>*/}
      {/*      <div key={`chapter-desktop-${index + 1}`} className={scss.exhibit__desktop_cards}>*/}
      {/*        <Accordion expanded={expanded === `panel${index+1}`} className={scss.exhibit__accordion} onChange={handleChange(`panel${index+1}`)}>*/}
      {/*          <AccordionSummary*/}
      {/*            expandIcon={<ExpandMoreIcon />}*/}
      {/*            className={scss.exhibit__accordion_summary}*/}
      {/*          >*/}
      {/*            <Typography component="h2" className={scss.exhibit__chapter}>Chapter {index + 1}: {chapter.title}</Typography>*/}
      {/*          </AccordionSummary>*/}
      {/*          <AccordionDetails>*/}
      {/*            <Chapter chapter={chapter} index={index} key={`chapter-${index + 1}`} />*/}
      {/*          </AccordionDetails>*/}
      {/*        </Accordion>*/}
      {/*      </div>*/}
      {/*    </section>*/}
      {/*  )*/}
      {/*})}*/}

    </section>
  )
}

export default Exhibit