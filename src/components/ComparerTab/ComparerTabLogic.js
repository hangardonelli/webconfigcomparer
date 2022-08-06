import { XMLToJSON } from "../../utils/xmlHelper";

export const isValidXML = (xmlString) => {
  try {
    XMLToJSON(xmlString);
    return true;
  } catch (ex) {
    return false;
  }
};
