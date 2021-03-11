import React from "react";
import Link from "next/link";

import { addCommasToNumber } from "lib";
import scss from "./BrowseByPartner.module.scss";

const Partner = ({ name, itemCount, facetName, index }) =>
  <Link href={`/search?${facetName}="${encodeURIComponent(name)}"`}>
    <a className={scss.partnerLink}>
      <span className={scss.name}>{name}</span>
      <span className={scss.itemCount}>
        {addCommasToNumber(itemCount)}
      </span>
    </a>
  </Link>;

const mapPartnersToComponents = partners =>
  partners.map((partner, index) =>
    <li key={`p_${index}`}>
      <Partner
        name={partner.name}
        itemCount={partner.itemCount}
        facetName={partner.facet}
        index={index}
      />
    </li>
  );

const PartnerBrowseContent = ({ route, partners }) =>
  <div className={`utils_container ${scss.partnerBrowse}`}>
    <div className={`row`}>
      <ul className={`${scss.partners} col-xs-12`}>
        {mapPartnersToComponents(partners)}
      </ul>
    </div>
  </div>;

export default PartnerBrowseContent;
