import React from "react";
import css from "./LocalIntro.module.scss";

const LocalIntro = ({ content }) =>
  <div className={`${css.wrapper} site-max-width`}>
    <div className={css.intro}>
      <h2 className={css.into__title}>
        {content.title}
      </h2>
      <p>{content.intro}</p>

      {content.collectionByTopics ??
        <>
          <h3>Collections by Topics</h3>
          <p>Below are some suggested topics to browse.  The search box above can also be used to search for any keyword.</p>
        </>
      }
      
      <ul>
        {content.topics.map((topic) => {
          return (
            <li>
              <h3><a href={topic.href}>{topic.title}</a></h3>
              <p>{topic.info}</p>
            </li>
          )
        })}
      </ul>
    </div>
  </div>;

export default LocalIntro;
