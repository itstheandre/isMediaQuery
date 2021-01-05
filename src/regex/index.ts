import mediaFeatures from "@solx/css-features";
import { discreteValues } from "@solx/css-features/dist/utils";
import mediaQueryTypes from "@solx/css-media-types";
import cssLengths from "@solx/css-units";
import cssResolutionUnits from "css-resolution-units";

const numberRe = "\\d+(\\.\\d+)?";
const baseJoin = "|";

const getMediaTypes = mediaQueryTypes().join(baseJoin);

const joinedRangedFeatures = mediaFeatures({ range: true }).join(baseJoin);
const joinedDiscreteVals = discreteValues.join(baseJoin);
const concatArr = [...cssLengths.all, ...cssResolutionUnits].join(baseJoin);

export const strictRegex = new RegExp(
  [
    "^(\\s*",
    "(only|not)?\\s*",
    `(${getMediaTypes})?\\s*`,
    "(and)?\\s*",
    "(\\(\\s*(",
    [
      "-\\w+-(min-|max-)?([\\w\\-]+)\\s*(:?\\s*.+)?",
      `(${joinedRangedFeatures})\\s*(:?\\s*(${joinedDiscreteVals}|${numberRe}(${concatArr}|\\/${numberRe})?))?`,
    ].join("|"),
    ")\\s*\\))?",
    "\\s*(,|and)?",
    "\\s*){1,}$",
  ].join("")
);
