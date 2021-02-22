import ExhibitionTitle from "./components/ExhibitionTitle"
import Chapter from "./components/Chapter"
import scss from "./Exhibition.module.scss"
import { exhibitionExample } from "constants/exhibition"
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Exhibition = () => {
  return (
    <section className={scss.exhibition__section}>
      <ExhibitionTitle
        title={exhibitionExample.title}
        description={exhibitionExample.description}
        credits={exhibitionExample.credits}
        citation={exhibitionExample.citation}
        thumbnail={exhibitionExample.thumbnail}
        banner={exhibitionExample.banner}
        caption={exhibitionExample.caption}
      />

      {exhibitionExample.pages.map((chapter, index) => {
        return (
          <div key={`chapter-${index+1}`}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography component="h2">Chapter {index+1}: {chapter.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Chapter chapter={chapter} index={index} key={`chapter-${index + 1}`}/>
              </AccordionDetails>
            </Accordion>
          </div>
        )
      })}

    </section>
  )
}

export default Exhibition