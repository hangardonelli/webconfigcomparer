
export const removeBetween = (str, x, y) => {
  try {
    if (typeof str !== "string")
      throw {err:"Error on removeBetween. 'str' is not a string."};
    if (typeof x !== "string")
      throw {err:"Error on removeBetween. 'x' is not a string."};
    if (typeof y !== "string")
      throw {err:"Error on removeBetween. 'y' is not a string."};
    let manipulatedString = str;
    while (manipulatedString.indexOf(x) !== -1) {
      manipulatedString = manipulatedString.replaceAll(
        manipulatedString.slice(
          manipulatedString.indexOf(x),
          manipulatedString.indexOf(y) + y.length
        ),
        ""
      );
    }

    return manipulatedString;
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};
