import XMLParser from "react-xml-parser";

export const XMLToJSON = (xmlString) =>
  new XMLParser().parseFromString(xmlString);

export const getBasicHttpBindings = (xml) => {
  let bindingsTree = xml.getElementsByTagName("basicHttpBinding");
  return getBasicHttpBinding(bindingsTree);
};
const getBasicHttpBinding = (xml) => {
  let bindings = [];
  for (let i = 0; i < xml.length; i++) {
    for (let j = 0; j < xml.length; j++) {
      if (xml[j].name && xml[j].name === "basicHttpBinding") {
        let bindingSubItem = xml[j];
        for (let k = 0; k < bindingSubItem.children.length; k++) {
          let bindingKey = bindingSubItem.children[k];
          let bindingObj = {
            name: bindingKey.attributes.name,
            key: bindingKey.attributes.name,
            value: bindingKey.value,
            children: bindingKey.children,
            attributes: bindingKey.attributes,
            type: "Basic HTTP SOAP Binding",
          };
          bindings.push(bindingObj);
        }
      }
    }
  }
  return bindings;
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
        let connectionStringKey = actualConnectionStringsKeys[k];

        if (connectionStringKey.name === "add") {
          connectionStringKey.attributes.name &&
            connectionStrings.push({
              key: connectionStringKey.attributes.name,
              value: connectionStringKey.attributes.connectionString,
              type: "Connection String",
            });
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

export const getCulture = (xml) => {
  let globalization = xml.getElementsByTagName("globalization");
  for (let i = 0; i < globalization.length; i++) {
    if (globalization[i].attributes.culture) {
      return {
        type: "Globalization",
        key: "Culture",
        value: globalization[i].attributes.culture,
        uiculture: globalization[i].attributes.uiCulture,
      };
    }
  }
};

export const getAuthenticationMode = (xml) => {
  let authenticationModes = [];
  let authentication = xml.getElementsByTagName("authentication");
  for (let i = 0; i < authentication.length; i++) {
    authenticationModes.push({
      key: "Mode",
      value: authentication[i].attributes.mode,
      type: "Authentication",
    });
  }

  return authenticationModes;
};

export const getCompilationTargetFramework = (xml) => {
  let compilationTargetFrameworks = [];
  let compilation = xml.getElementsByTagName("compilation");
  for (let i = 0; i < compilation.length; i++) {
    compilationTargetFrameworks.push({
      type: "Compilation",
      key: "Target Framework",
      value: compilation[i].attributes.targetFramework,
    });
  }
  return compilationTargetFrameworks;
};

export const getCompilationDebug = (xml) => {
  let compilationDebug = [];
  let compilation = xml.getElementsByTagName("compilation");
  for (let i = 0; i < compilation.length; i++) {
    compilationDebug.push({
      type: "Compilation",
      key: "Debug",
      value: compilation[i].attributes.debug,
    });
  }
  return compilationDebug;
};

export const getHttpRuntimeTargetFramework = (xml) => {
  let httpRuntimeTargetFramework = [];
  let httpRuntime = xml.getElementsByTagName("httpRuntime");
  for (let i = 0; i < httpRuntime.length; i++) {
    httpRuntimeTargetFramework.push({
      type: "HTTP Runtime",
      key: "Target Framework",
      value: httpRuntime[i].attributes.targetFramework,
    });
  }
  return httpRuntimeTargetFramework;
};

export const getHttpRuntimeExcecutionTimeout = (xml) => {
  let compilationDebug = [];
  let compilation = xml.getElementsByTagName("httpRuntime");
  for (let i = 0; i < compilation.length; i++) {
    compilationDebug.push({
      type: "HTTP Runtime",
      key: "Debug",
      value: compilation[i].attributes.executionTimeout,
    });
  }
  return compilationDebug;
};

export const getPagesEnableSessionState = (xml) => {
  let enableSessionState = [];
  let pages = xml.getElementsByTagName("pages");
  for (let i = 0; i < pages.length; i++) {
    enableSessionState.push({
      type: "Pages",
      key: "Enable Session State",
      value: pages[i].attributes.enableSessionState,
    });
  }
  return enableSessionState;
};

export const getHttpModules = (xml) => {
  getWebServerModules(xml);
  let httpModules = [];
  let modules = xml.getElementsByTagName("httpModules");
  for (let i = 0; i < modules.length; i++) {
    let childModules = modules[i].children;
    for (let j = 0; j < childModules.length; j++) {
      if (childModules[j].name === "add") {
        httpModules.push({
          key: childModules[j].attributes.name,
          value: childModules[j].attributes.type,
          type: "HTTP Modules",
        });
      }
    }
  }
  return httpModules;
};

export const getWebServerModules = (xml) => {
  let modules = [];
  let systemWebServer = xml.getElementsByTagName("systemWebServer");
  for (let i = 0; i < systemWebServer.length; i++) {
    let children = systemWebServer[i].children;
    for (let k = 0; k < children.length; k++) {
      if (children[k].name === "modules") {
        for (let n = 0; n < children[k].children.length; n++) {
          let module = children[k].children;
          modules.push({
            key: module[n].attributes.name,
            value: module[n].name,
            attributes: module[n].attributes,
            type: "System Web Server Module",
          });
        }
      }
    }
  }
  return modules;
};

export const getWebServerHandlers = (xml) => {
  let handlers = [];
  let systemWebServer = xml.getElementsByTagName("systemWebServer");
  for (let i = 0; i < systemWebServer.length; i++) {
    let children = systemWebServer[i].children;
    for (let k = 0; k < children.length; k++) {
      if (children[k].name === "handlers") {
        for (let n = 0; n < children[k].children.length; n++) {
          let handler = children[k].children;
          handlers.push({
            key: handler[n].attributes.name,
            value: handler[n].name,
            attributes: handler[n].attributes,
            type: "System Web Server Handler",
          });
        }
      }
    }
  }
  return handlers;
};

export const getWebServerValidations = (xml) => {
  let validations = [];
  let systemWebServer = xml.getElementsByTagName("systemWebServer");

  for (let i = 0; i < systemWebServer.length; i++) {
    let children = systemWebServer[i].children;
    for (let k = 0; k < children.length; k++) {
      if (children[k].name === "validation") {
        let validation = children[k];
        let attributeList = Object.getOwnPropertyNames(validation.attributes);
        for (let j = 0; j < attributeList.length; j++) {
          validations.push({
            key: attributeList[j],
            value: validation.attributes[attributeList[j]],
            attributes: validation.attributes,
            type: "System Web Server Validations",
          });
        }
      }
    }
  }
  return validations;
};

export const getDependentAssembly = (xml) => {
  let dependents = [];
  let dependentAssemblyTree = xml.getElementsByTagName("dependentAssembly");
  for (let i = 0; i < dependentAssemblyTree.length; i++) {
    let dependentChildren = dependentAssemblyTree[i];
    let dependentObj = {};
    for (let j = 0; j < dependentChildren.children.length; j++) {
      let dependent = dependentChildren.children[j];
      if (dependent.name === "bindingRedirect") {
        dependentObj.oldVersion = dependent.attributes.oldVersion;
        dependentObj.newVersion = dependent.attributes.oldVersion;
      }
      if (dependent.name === "assemblyIdentity") {
        dependentObj.key = "assemblyIdentity";
        dependentObj.value = dependent.attributes.name;
        dependentObj.assemblyIdentity = dependent.attributes.name;
        dependentObj.publicKeyToken = dependent.attributes.publicKeyToken;
      }
    }
    if (dependentObj.key) {
      dependentObj.type = "Dependent Assembly";
      dependents.push(dependentObj);
    }
  }
  return dependents;
};

export const getCodeDOMCompilers = (xml) => {
  let compilers = [];
  let codeDom = xml.getElementsByTagName("systemCodedom");
  for (let i = 0; i < codeDom.length; i++) {
    let actualCodeDom = codeDom[i];
    let compilerList = actualCodeDom.children;

    for (let j = 0; j < compilerList.length; j++) {
      let actualCompiler = compilerList[j];
      if (actualCompiler.name === "compilers") {
        for (let k = 0; k < actualCompiler.children.length; k++) {
          let compiler = actualCompiler.children[k];

          compilers.push({
            key: compiler.attributes.extension,
            value: compiler.attributes.language
              .toUpperCase()
              .replaceAll(";", ","),
            compilationType: compiler.attributes.type,
            warningLevel: compiler.attributes.warningLevel,
            compilerOptions: compiler.attributes.compilerOptions,
            type: "CodeDOM Compiler",
          });
        }
      }
    }
  }
  return compilers;
};

export const getEntityFrameworkDefaultConnectionFactory = (xml) => {
  let defaultConnectionFactories = [];
  let defaultConnectionFactoryTree = xml.getElementsByTagName(
    "defaultConnectionFactory"
  );
  for (let i = 0; i < defaultConnectionFactoryTree.length; i++) {
    let actualDefaultConnectionFactoryTree = defaultConnectionFactoryTree[i];

    for (
      let j = 0;
      j < actualDefaultConnectionFactoryTree.children.length;
      j++
    ) {
      let parametersTree = actualDefaultConnectionFactoryTree.children[j];
      for (let k = 0; k < parametersTree.children.length; k++) {
        let parameter = parametersTree.children[k];
        if (parameter.name === "parameter") {
          defaultConnectionFactories.push({
            key: "Default Connection Factory",
            value: parameter.attributes.value,
            connectionType: actualDefaultConnectionFactoryTree.attributes.type,
            type: "Entity Framework",
          });
        }
      }
    }
  }
  return defaultConnectionFactories;
};

export const getEntityFrameworkProviders = (xml) => {
  let providers = [];
  let providersTree = xml.getElementsByTagName("providers");
  for (let i = 0; i < providersTree.length; i++) {
    let actualProviderTree = providersTree[i];
    for (let j = 0; j < actualProviderTree.children.length; j++) {
      let provider = actualProviderTree.children[j];
      providers.push({
        key: "Provider",
        value: provider.attributes.invariantName,
        providerType: provider.attributes.type,
        type: "Entity Framework",
      });
    }
  }
  return providers;
};
