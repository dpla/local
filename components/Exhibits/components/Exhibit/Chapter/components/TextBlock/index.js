import parse from 'html-react-parser';
import scss from "./TextBlock.module.scss"
import {Container} from "@material-ui/core";

const TextBlock = ({ data }) => {
  return (
    <section className={scss.text_block__section}>
        <Container maxWidth={"md"}>
            <h3>{data.headline}</h3>
            {parse(data.text)}
        </Container>
    </section>
  )
}

export default TextBlock