import { isMediaQuery } from "../src/index";

describe("isMediaQuery", () => {
  it("is defined", () => {
    expect(isMediaQuery).toBeDefined();
  });
  describe("Error States", () => {
    it("fails with no argus", () => {
      // @ts-expect-error
      expect(() => isMediaQuery()).toThrow();
    });
    describe("Wrong data types getting passed", () => {
      describe("when in object structure", () => {
        it("if no string is passed", () => {
          // @ts-expect-error
          expect(() => isMediaQuery({ test: "" })).toThrow();
        });
        it("with just objects", () => {
          // @ts-expect-error
          expect(() => isMediaQuery({}, {})).toThrow();
        });
      });
      it("if  arg is array", () => {
        // @ts-expect-error
        expect(() => isMediaQuery([])).toThrow();
        // @ts-expect-error
        expect(() => isMediaQuery([], [])).toThrow();
      });
      it("if args are numbers", () => {
        // @ts-expect-error
        expect(() => isMediaQuery(1, 1)).toThrow();
        // @ts-expect-error
        expect(() => isMediaQuery(1)).toThrow();
      });
      it("if args are undefined", () => {
        // @ts-expect-error
        expect(() => isMediaQuery(undefined, undefined)).toThrow();
        // @ts-ignore
        expect(() => isMediaQuery(undefined)).toThrow();
      });
      it("if args are null", () => {
        // @ts-expect-error
        expect(() => isMediaQuery(null, null)).toThrow();
        // @ts-ignore
        expect(() => isMediaQuery(null)).toThrow();
      });
      it("if there is combination that is bad", () => {
        // @ts-expect-error
        expect(() => isMediaQuery(1, { strict: true })).toThrow();
      });

      it("if args are functions", () => {
        expect(() =>
          isMediaQuery(
            () => {},
            // @ts-expect-error
            () => {}
          )
        ).toThrow();
        expect(() =>
          isMediaQuery(
            // @ts-expect-error
            () => {}
          )
        ).toThrow();
      });
    });
  });

  describe("Success", () => {
    it("just works", () => {
      const first = isMediaQuery("(min-width: 960px)");
      expect(first).toBeTruthy();
      // doesnt work because it needs the parenthesis
      // TODO Would be interesting to, eventually, add a way for these things to be transformed into the right one.
      expect(isMediaQuery("min-width: 950px")).toBe(false);
      expect(isMediaQuery("(max-height: 960px)")).toBeTruthy();
      expect(
        isMediaQuery("(max-width: 960px) and (min-height: 1000px)")
      ).toBeTruthy();
      expect(isMediaQuery("")).toBe(false);
    });
  });
});
