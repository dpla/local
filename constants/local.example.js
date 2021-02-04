export const LOCAL_ID="LOCAL_ID"

export const LOCALS = {
  plains2peaks: {
    theme: "plains2peaks",
    filters: [
      "provider.@id:http%3A//dp.la/api/contributor/wisconsin"
    ],
    provider: "%22Plains%20to%20Peaks%20Collective%22",
    background: "home-hero-bg.jpg",
    name: "Plains to Peaks Collective",
    favicon: "favicon.png",
    logo: "logo.png",
    description: "",
    locationFacet: "%22Colorado%20OR%20Wyoming%22",
    subjectFacet: "%22Colorado%20OR%20Wyoming%22",
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