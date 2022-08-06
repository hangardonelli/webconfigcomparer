export const findDifferences = (array1, array2) => {
  let apps = array1;
  let apps2 = array2;
  let result = [];

  for (let i = 0; i < apps.length; i++) {
    if (apps2.some((b) => b.key === apps[i].key && b.value !== apps[i].value)) {
      result.push({
        type: apps[i].type,
        key: apps[i].key,
        config1: apps[i].value,
        config2: apps2.filter((x) => x.key === apps[i].key)[0].value,
      });
    }

    let found = false;
    for (let j = 0; j < apps2.length; j++) {
      if (apps2[j].key === apps[i].key) {
        found = true;
        break;
      }
    }
    if (!found)
      result.push({
        type: apps[i].type,
        key: apps[i].key,
        config1: apps[i].value,
        config2: "NOT_EXISTS",
      });
  }
  return result;
};
