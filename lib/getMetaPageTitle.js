import { LOCALS } from "constants/local";
const LOCAL_ID = process.env.NEXT_PUBLIC_LOCAL_ID

// Text for the <title> tag in <head>.

const getMetaPageTitle = title => {
  const pageTitle = title === undefined ? "Digital Public Library of America" : `${title} | ${LOCALS[LOCAL_ID].name}}`;

  return pageTitle;
};

export default getMetaPageTitle;
