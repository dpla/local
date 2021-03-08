import { addCommasToNumber } from "lib"
import Link from "next/link"
import css from "../Sidebar.module.scss";

const FacetLink = ({ route, queryKey, termObject, disabled }) =>
  disabled
    ? <span className={[css.facet].join(" ")}>
        <span className={[css.facetName, css.activeFacetName].join(" ")}>
          {`${termObject.term} `}
        </span>
        <span className={css.facetCount}>
          {addCommasToNumber(termObject.count)}
        </span>
      </span>
    : <Link
        href={{
          pathname: route.pathname,
          query: Object.assign({}, route.query, {
            // some facet names have spaces, and we need to wrap them in " "
            [queryKey]: route.query[queryKey]
              ? [`${route.query[queryKey]}`, `"${[termObject.term]}"`].join("|")
              : `"${termObject.term}"`,
            page: 1
          })
        }}
      >
        <a className={css.facet}>
          <span className={css.facetName}>
            {`${termObject.term} `}
          </span>
          <span className={css.facetCount}>
            {addCommasToNumber(termObject.count)}
          </span>
        </a>
      </Link>;

export default FacetLink