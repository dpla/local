import Title from "./components/Exhibit/Title"
import Chapter from "./components/Exhibit/Chapter"
import scss from "./Exhibits.module.scss"
import { exhibitExample } from "constants/exhibit.js"
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Exhibit = () => {
  return (
    <section className={scss.exhibit__section}>
      <Title
        title={exhibitExample.title}
        description={exhibitExample.description}
        credits={exhibitExample.credits}
        citation={exhibitExample.citation}
        thumbnail={exhibitExample.thumbnail}
        banner={exhibitExample.banner}
        caption={exhibitExample.caption}
      />

      {exhibitExample.pages.map((chapter, index) => {
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

export default Exhibit