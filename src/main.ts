import { strictRegex } from "./regex";

function isMediaQuery(testing: string) {
  if (typeof testing === "string") {
    if (!testing) {
      return false;
    }
    return strictRegex.test(testing);
  }
  if (!testing) {
    throw new Error(`This function can't be called without any argument`);
  }
  throw new Error(`You didn't provide a valid string`);
}

export { isMediaQuery };
