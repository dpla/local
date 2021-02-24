import Title from "./Title"
import Chapter from "./Chapter"
import scss from "./Exhibit.module.scss"
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Exhibit = ({ exhibit }) => {
  return (
    <section className={scss.exhibit__section}>
      <Title
        title={exhibit.title}
        description={exhibit.description}
        credits={exhibit.credits}
        citation={exhibit.citation}
        thumbnail={exhibit.thumbnail}
        banner={exhibit.banner}
        caption={exhibit.caption}
      />

      {exhibit.pages.map((chapter, index) => {
        return (
          <div key={`chapter-${index + 1}`}>
            <Accordion className={scss.exhibit__accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography component="h2">Chapter {index + 1}: {chapter.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Chapter chapter={chapter} index={index} key={`chapter-${index + 1}`} />
              </AccordionDetails>
            </Accordion>
          </div>
        )
      })}

    </section>
  )
}

export default Exhibit