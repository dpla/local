import ReactMarkdown from "react-markdown";
import scss from "./LocalIntro.module.scss";

const LocalIntro = ({ content }) =>
  <div className={`${scss.wrapper} site-max-width`}>
    <ReactMarkdown className={scss.intro} source={content} />
  </div>;

export default LocalIntro;
