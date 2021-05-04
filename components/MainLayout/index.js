import { useEffect } from "react";
import { useRouter } from 'next/router'
import Helmet from "react-helmet";
import DPLAHead from "components/DPLAHead";
import SkipToContent from "shared/SkipToContent";
import MobileNavbar from "./components/MobileNavbar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Searchbar from "./components/Searchbar";

import * as gtag from "lib/gtag";
import { getFullPath, getCurrentFullUrl } from "lib";

const MainLayout = (props) => {
  const {
    children,
    route,
    isSearchPage,
    headLinks,
    pageTitle,
    pageImage,
    pageDescription,
    seoType,
    query
  } = props;

  const router = useRouter()


    //TODO page tracking doesn't work right, fix
  // useEffect(() => {
  //   router.events.on('routeChangeComplete', trackPageview())
  // }, [])

  const trackPageview = () => {
    // console.log('track')
    // const fullPath = getFullPath();
    // const fullUrl = getCurrentFullUrl();

    // if (fullPath !== this.lastTrackedPath) {
    //   gtag.pageview({
    //     path: fullPath,
    //     url: fullUrl,
    //     title: this.props.pageTitle
    //   });
    //   this.lastTrackedPath = fullPath;
    // }
  }

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
        {router.pathname !== '/' && <Searchbar searchQuery={query}/>}
        {children}
        <Footer />
      </div>
  )
}

export default MainLayout;