import React from "react";
import Router from "next/router";
import Helmet from "react-helmet";

import DPLAHead from "components/DPLAHead";
import SkipToContent from "shared/SkipToContent";
import SmallScreenHeader from "./components/SmallScreenHeader";
import GlobalHeader from "./components/GlobalHeader";
import PageHeader from "./components/PageHeader";
import Footer from "./components/Footer";

// import * as gtag from "lib/gtag";
// import { getFullPath, getCurrentFullUrl } from "lib";

class MainLayout extends React.Component {
  // Google Analytics tracking for MainLayout-using pages
  componentDidMount() {
    Router.onRouteChangeComplete = url => this.trackPageview();
  }

  // trackPageview() {
  //   const fullPath = getFullPath();
  //   const fullUrl = getCurrentFullUrl();

  //   if (fullPath !== this.lastTrackedPath) {
  //     gtag.pageview({
  //       path: fullPath,
  //       url: fullUrl,
  //       title: this.props.pageTitle
  //     });
  //     this.lastTrackedPath = fullPath;
  //   }
  // }

  render() {
    const {
      children,
      route,
      hideSearchBar,
      isSearchPage,
      headLinks,
      pageTitle,
      pageImage,
      pageDescription,
      seoType
    } = this.props;
    return (
      <div>
        <Helmet htmlAttributes={{ lang: "en" }} />
        <DPLAHead
          additionalLinks={headLinks}
          pageTitle={pageTitle}
          pageImage={pageImage}
          seoType={seoType}
          pageDescription={pageDescription}
        />
        <SkipToContent />
        <SmallScreenHeader
          isSearchPage={isSearchPage}
          route={route}
        />
        <GlobalHeader />
        <PageHeader
          query={route.query}
          searchQuery={route.query.q}
          hideSearchBar={hideSearchBar}
        />
        {children}
        <Footer route={route} />
      </div>
    );
  }
}

export default MainLayout;
