import Link from "next/link"
import { LOCALS } from "constants/local"
import css from "./HomeHero.module.scss"
const LOCAL_ID = process.env.NEXT_PUBLIC_LOCAL_ID

const HomeHero = ({ headerDescription, feature }) => {
  const bgImage = `/static/${LOCALS[LOCAL_ID].theme}/${LOCALS[LOCAL_ID].background}`;

  return (
    <div
      className={`${css.wrapper} ${feature ? css.withFeature : ""}`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className={`${css.header} site-max-width`}>
        <div className={`${css.homeLogo} `}>
          <img
            className={css.localLogo}
            src={`/static/${LOCALS[LOCAL_ID].theme}/${LOCALS[LOCAL_ID].logo}`}
          />
          <h1 className={css.localText}>{LOCALS[LOCAL_ID].name}</h1>
        </div>
      </div>
      <div className={css.content}>
        {headerDescription && <p className={css.headline}>{headerDescription}</p>}
        <form action="/search">
          <div className={css.search}>
            <input
              className={css.searchInput}
              aria-label="Search the collection"
              placeholder="Search the collection"
              name="q"
              autoComplete="off"
              type="search"
            />
            <button type="submit" className={css.searchButton}>
              <span>Search</span>
            </button>
          </div>
        </form>
        {LOCALS[LOCAL_ID].hasAbout &&
          <div className={css.links}>
            <Link href="/local/about" as="/about">
              <a>Learn more about {LOCALS[LOCAL_ID].name}</a>
            </Link>
          </div>}
      </div>
    </div>
  )
}

export default HomeHero;