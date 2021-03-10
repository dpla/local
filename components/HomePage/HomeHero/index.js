import React from "react";
import Link from "next/link";
import { LOCALS } from "constants/local-data";
import scss from "./HomeHero.module.scss";
const LOCAL_ID = process.env.NEXT_PUBLIC_LOCAL_ID
const bgImage = `/static/${LOCALS[LOCAL_ID].theme}/${LOCALS[LOCAL_ID].background}`;

const HomeHero = ({ headerDescription, feature }) =>
  <div
    className={`${scss.wrapper} ${feature ? scss.withFeature : ""}`}
    style={{ backgroundImage: `url(${bgImage})` }}
  >
    <div className={`${scss.header} site-max-width`}>
      <div className={`${scss.homeLogo} `}>
        <img
          className={scss.localLogo}
          src={`/static/${LOCALS[LOCAL_ID].theme}/${LOCALS[LOCAL_ID]
            .logo}`}
        />
        <h1 className={scss.localText}>{LOCALS[LOCAL_ID].name}</h1>
      </div>
    </div>
    <div className={scss.content}>
      {headerDescription && <p className={scss.headline}>{headerDescription}</p>}
      <form action="/search">
        <div className={scss.search}>
          <input
            className={scss.searchInput}
            aria-label="Search the collection"
            placeholder="Search the collection"
            name="q"
            autoComplete="off"
            type="search"
          />
          <button type="submit" className={scss.searchButton}>
            <span>Search</span>
          </button>
        </div>
      </form>
      {LOCALS[LOCAL_ID].hasAbout &&
        <div className={scss.links}>
          <Link href="/about">
            <a>Learn more about {LOCALS[LOCAL_ID].name}</a>
          </Link>
        </div>}
    </div>
  </div>;

export default HomeHero;
