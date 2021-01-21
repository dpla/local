import { LOCALS, LOCAL_ID } from "constants/local";

// Text for the <title> tag in <head>.

const getMetaPageTitle = title => {
  const pageTitle = title === undefined ? "Digital Public Library of America" : `${title} | ${LOCALS[LOCAL_ID].name}}`;

  return pageTitle;
};

export default getMetaPageTitle;
