import { strictRegex } from "./regex";

function isMediaQuery(testing: string) {
  if (!testing) {
    throw new Error(`This function can't be called without any argument`);
  }
  if (typeof testing === "string") {
    return strictRegex.test(testing);
  }
  throw new Error(`You didn't provide a valid string`);
}

export { isMediaQuery };
