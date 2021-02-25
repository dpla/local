import React from "react";
import Head from "next/head";

import { getMetaPageTitle, getCurrentFullUrl } from "lib";

import { LOCALS, LOCAL_ID } from "constants/local";

class DPLAHead extends React.Component {
  state = { defaultImageUrl: "" };

  componentDidMount() {
    const fullUrl = getCurrentFullUrl();
    let url = fullUrl.substr(0, fullUrl.indexOf("/", 8));
    url += `/static/images/${LOCALS[LOCAL_ID].logo}`;
    this.setState({ defaultImageUrl: url });
  }

  render() {
    const { defaultImageUrl } = this.state;
    const {
      additionalLinks,
      seoType,
      pageTitle,
      pageImage,
      pageImageCaption,
      pageDescription
    } = this.props;
    const defaultDescription = LOCALS[LOCAL_ID].description;
    const defaultPageTitle = LOCALS[LOCAL_ID].name;
    
    return (
      <div>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="referrer" content="origin-when-cross-origin" />
          <meta
            name="description"
            content={pageDescription || defaultDescription}
          />
          <meta
            name="og:description"
            content={pageDescription || defaultDescription}
          />
          <meta name="og:site_name" content={defaultPageTitle} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@dpla" />
          <meta name="twitter:creator" content="@dpla" />
          <meta name="twitter:image" content={pageImage || defaultImageUrl} />
          {pageImageCaption &&
            <meta name="twitter:image:alt" content={pageImageCaption} />}
          <meta name="og:image" itemProp="image" content={pageImage || defaultImageUrl} />
          <meta name="og:title" content={pageTitle || defaultPageTitle} />
          <meta name="og:type" content={seoType || "website"} />
          <meta name="theme-color" content="#ffffff" />
            <link
              key="180"
              rel="apple-touch-icon"
              sizes="180x180"
              href={`/static/${LOCAL_ID}/${LOCALS[LOCAL_ID].favicon}`}
            />,
            <link
              key="32"
              rel="icon"
              type="image/png"
              sizes="32x32"
              href={`/static/${LOCAL_ID}/${LOCALS[LOCAL_ID].favicon}`}
            />,
            <link
              key="16"
              rel="icon"
              type="image/png"
              sizes="16x16"
              href={`/static/${LOCAL_ID}/${LOCALS[LOCAL_ID].favicon}`}
            />,
            <link
              key="mask"
              rel="mask-icon"
              href={`/static/${LOCAL_ID}/${LOCALS[LOCAL_ID].favicon}`}
              color="#ffffff"
            />,
            {/* <link key="manifest" rel="manifest" href="/manifest.json" /> */}
          {additionalLinks}
          <title>{getMetaPageTitle(pageTitle)}</title>
        </Head>
      </div>
    );
  }
}

export default DPLAHead;
