import XMLParser from "react-xml-parser";
import { removeBetween } from "./stringHelper";

export const deleteXMLComments = (xmlString) =>
  removeBetween(xmlString, "<!--", "-->");

export const normalizeTags = (xmlString) => {
  let manipulatedString = xmlString.replaceAll("system.webServer", "systemWebServer");
  manipulatedString = manipulatedString.replaceAll("system.serviceModel", "systemServiceModel");
  manipulatedString = manipulatedString.replaceAll("system.codedom", "systemCodedom");

  return manipulatedString;
};
export const XMLToJSON = (xmlString) =>
  new XMLParser().parseFromString(xmlString);
