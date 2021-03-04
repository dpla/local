import MainLayout from "components/MainLayout";
import FeatureHeader from "shared/FeatureHeader";
import BrowseByPartner from "components/BrowseByPartner";
import { getCurrentUrl } from "lib";
import scss from "components/BrowseByPartner/BrowseByPartner.module.scss";

const PartnerBrowse = ({ partners, url }) =>
  <div>
    <MainLayout route={url} pageTitle="Browse By Partner">
      <div id="main" role="main">
        <FeatureHeader
          titleClassName={scss.featureTitle}
          title="Browse By Partner"
        />
        <BrowseByPartner partners={partners} />
      </div>
    </MainLayout>
  </div>;

PartnerBrowse.getInitialProps = async ({ query, req }) => {
  const currentUrl = getCurrentUrl(req);
  let apiQuery = `${currentUrl}/api/browse-by-partner`;

  const res = await fetch(apiQuery);
  const json = await res.json();
  const partners = json.facets["dataProvider"].terms.map(partner => ({
    name: partner.term,
    facet: "provider",
    itemCount: partner.count
  }));
  return { partners };
};

export default PartnerBrowse;
