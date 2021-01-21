import css from "./Vermont.module.scss";
import { topics } from "constants/vermont"

const Vermont = () => {
  return (
    <div className={`${css.wrapper} site-max-width`}>
      <div className={css.intro}>
        <h2 className={css.into__title}>
          Explore the history and culture of our “Brave Little State”
        </h2>
        <p>
          The <span>Vermont Green Mountain Digital Archive</span> (GMDA) is a collaboration between Middlebury College, Vermont State Archives & Records Administration, Vermont Historical Society, Rockingham Free Public Library, Norwich University, St. Michael’s College, University of Vermont, and Vermont Department of Libraries, and brings together photographs, documents, maps, recordings, and other resources related to Vermont and beyond.
        </p>
        <h3>Collections by Topics</h3>
        <p>Below are some suggested topics to browse.  The search box above can also be used to search for any keyword.</p>

        <ul>
          {topics.map((topic, index) => {
            return (
              <li key={`topic-item-${index}`}>
                <h3><a href={topic.href}>{topic.title}</a></h3>
                <p>{topic.info}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Vermont