export const LOCAL_ID="LOCAL_ID"

export const LOCALS = {
  localName: {
    theme: "localName",
    filters: [
      "provider.@id:http%3A//dp.la/api/contributor/"
    ],
    provider: "%22local%20Name%22",
    background: "home-hero-bg.jpg",
    name: "localName",
    favicon: "favicon.png",
    logo: "logo.png",
    description: "",
    locationFacet: "%22Location%22",
    subjectFacet: "%22Location%22",
    hasAbout: true,
    hasTerms: false,
    hasContact: true,
    hasBrowseByPartner: true,
    hasBrowseAll: false,
    routes: {
      "/about" : {
        parentDir: "/about",
        path: "about.md",
        title: "About",
        description: "",
        isTopLevel: true,
        category: "About"
      }
    }
  },
};