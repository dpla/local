export const TITLE = "Exhibits";
export const DESCRIPTION = `Stories of national significance drawn from
source materials in libraries, archives, and museums across the United States.`;
const BASE_ENDPOINT = "/api";
export const EXHIBITS_ENDPOINT = `https://dp.la/api/files/`;
export const EXHIBIT_PAGES_ENDPOINT = `${BASE_ENDPOINT}/exhibit_pages`;
export const FILES_ENDPOINT = `${BASE_ENDPOINT}/files`;
export const ITEMS_ENDPOINT = `${BASE_ENDPOINT}/items`;
export const ITEM_TYPES = {
  STILL_IMAGE: "Still Image",
  MOVING_IMAGE: "Moving Image",
  SOUND: "Sound"
};
