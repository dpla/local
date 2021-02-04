import css from "./Florida.module.scss";
import { topics } from "constants/Florida"

const Florida = () => {
  return (
    <div className={`${css.wrapper} site-max-width`}>
      <div className={css.intro}>
        <h2 className={css.into__title}>
          Sharing Florida’s rich history and culture. Exploring stories from the Sunshine State.
        </h2>
        <p>
          Uncover photos, maps, books, artifacts, oral histories and more from libraries, archives, museums, and historical societies across the state. Find free local, state, national, and international resources related to Florida and beyond.
        </p>
        <p>Sunshine State Digital Network highlights include:</p>

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

        <span>SSDN membership to the DPLA Hub Network is supported through generous funding provided by the Library Services and Technology Act administered by the Florida Department of State, Division of Library and Information Services.</span>
      </div>
    </div>
  )
}

export default Florida