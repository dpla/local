import React from "react";
import Router from "next/router";
import Helmet from "react-helmet";

import DPLAHead from "components/DPLAHead";
import SkipToContent from "shared/SkipToContent";
import MobileNavbar from "./components/MobileNavbar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// import * as gtag from "lib/gtag";
// import { getFullPath, getCurrentFullUrl } from "lib";

class MainLayout extends React.Component {
  // Google Analytics tracking for MainLayout-using pages
  componentDidMount() {
    // Router.onRouteChangeComplete = url => this.trackPageview();
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
        <MobileNavbar
          isSearchPage={isSearchPage}
          route={route}
        />
        <Navbar />
        {children}
        <Footer />
      </div>
    );
  }
}

export default MainLayout;
