import XMLParser from "react-xml-parser";

export const XMLToJSON = (xmlString) =>
  new XMLParser().parseFromString(xmlString);

  export const getBasicHttpBinding = (xml) => {
    let g = [];
    for (let d = 0; d < xml.length; d++) {
      let b = xml[d].children;
      for (let a = 0; a < b.length; a++)
        if (b[a].name && "basicHttpBinding" === b[a].name) {
          let h = b[a];
          for (let e = 0; e < h.children.length; e++) {
            let c = h.children[e],
              i = {
                name: c.attributes.name,
                value: c.value,
                children: c.children,
                attributes: c.attributes,
                type: "Basic HTTP SOAP Binding",
              };
            g.push(i);
          }
        }
    }
    return g;
  };
export const getConnectionStrings = (xml) => {
  let configuration = xml.getElementsByTagName("configuration");
  let connectionStrings = [];
  for (let i = 0; i < configuration.length; i++) {
    let connectionStringsTree =
      configuration[i].getElementsByTagName("connectionStrings");
    for (let j = 0; j < connectionStringsTree.length; j++) {
      let actualConnectionStrings = connectionStringsTree[j];
      let actualConnectionStringsKeys = actualConnectionStrings.children;
      for (let k = 0; k < actualConnectionStringsKeys.length; k++) {
        for (
          let n = 0;
          n < actualConnectionStringsKeys[k].children.length;
          n++
        ) {
          let connectionStringKey = actualConnectionStringsKeys[k].children[n];
          if (connectionStringKey.name === "add") {
            
            connectionStringKey.attributes.name && connectionStrings.push({
              key: connectionStringKey.attributes.name,
              value: connectionStringKey.attributes.connectionString,
              type: "Connection String",
            });
          }
        }
      }
    }
  }
  return connectionStrings;
};
export const getAppSettings = (xml) => {
  let appSettings = xml.getElementsByTagName("appSettings");
  let keys = [];
  for (let i = 0; i < appSettings.length; i++) {
    for (let j = 0; j < appSettings[i].children.length; j++) {
      let actualKey = appSettings[i].children[j];
      if (actualKey.name === "add") {
        keys.push({
          key: actualKey.attributes.key,
          value: actualKey.attributes.value,
          type: "App Setting",
        });
      }
    }
  }

  return keys;
};
