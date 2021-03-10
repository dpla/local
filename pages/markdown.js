import React from "react";
import { withRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import MainLayout from "components/MainLayout";
import Sidebar from "components/MainLayout/components/shared/LocalSidebar.js"
import FeatureHeader from "shared/FeatureHeader";
import BreadcrumbsModule from "shared/BreadcrumbsModule";
import { getCurrentUrl } from "lib";
import { LOCALS } from "constants/local-data";
import contentCss from "stylesheets/content-pages.scss";
const LOCAL_ID = process.env.NEXT_PUBLIC_LOCAL_ID

class MarkdownPage extends React.Component {
  render() {
    const { router, pageData, content } = this.props;

    const local = LOCALS[LOCAL_ID];
    const routesObj = local.routes;
    const hasSidebar = local.hasSidebar;
    const bodyColumnsStyle = local.expandBody ? "col-xs-12 col-md-12" : "col-xs-12 col-md-7";

    const allRoutes = Object.keys(routesObj);

    const pages = allRoutes.map(function(page, i) {
      const objects = Object.assign({}, i);
      objects.route = allRoutes[i];
      objects.title = routesObj[allRoutes[i]].title;
      objects.category = routesObj[allRoutes[i]].category;
      objects.isTopLevel = routesObj[allRoutes[i]].isTopLevel;
      objects.isActive = false;
      return objects;
    }).filter(page =>
      page.category == pageData.category
    );

    var breadcrumbs = [];

    if (hasSidebar && !pageData.isTopLevel){
      breadcrumbs.push({
        title: pageData.category,
        url: "/" + pageData.parentDir,
        as: pageData.parentDir
      },
      {
        title: pageData.title
      });
    };

    return (
      <MainLayout
        route={router}
        pageTitle={`${pageData.title}`}
        pageDescription={`${pageData.description}`}
      >
      {breadcrumbs.length > 0 &&
        <BreadcrumbsModule
          breadcrumbs={breadcrumbs}
          route={pageData.parentDir}
        />}
      {breadcrumbs.length === 0 &&
        <FeatureHeader
          title={pageData.category}
          description={pageData.description}
        />}
        <div
          className={`container
      ${contentCss.sidebarAndContentWrapper}`}
        >
          <div className="row">
              <Sidebar
              className={contentCss.sidebar}
              items={pages}
              activePage={router.asPath}
              render={hasSidebar}
            />
            <div className={bodyColumnsStyle}>
              <div id="main" role="main" className={contentCss.content}>
                <ReactMarkdown escapeHtml={false} skipHtml={false} source={content} />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
}

MarkdownPage.getInitialProps = async context => {
  const fullUrl = getCurrentUrl(context.req);
  const asPath = context.asPath;
  const local = LOCALS[LOCAL_ID];
  const routes = local["routes"];
  const pageData = routes[asPath];
  const markdownUrl = `${fullUrl}/static/${LOCAL_ID}/${pageData.path}`;
  const markdownResponse = await fetch(markdownUrl);
  const pageMarkdown = await markdownResponse.text();
  return {
    pageData: pageData,
    content: pageMarkdown
  };
};

export default withRouter(MarkdownPage);
