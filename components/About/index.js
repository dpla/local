import ReactMarkdown from "react-markdown";
import scss from "./About.module.scss";

const About = ({ content }) =>
  <div className={`${scss.wrapper} site-max-width`}>
    <ReactMarkdown className={scss.intro} source={content} />
  </div>;

export default About;
