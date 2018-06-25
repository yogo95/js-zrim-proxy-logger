describe('Unit Test - WinstonProxyLogger', function () {
  const WinstonProxyLogger = require('../../../lib/winston-proxy-logger').WinstonProxyLogger;

  const _ = require('lodash');

  describe("Unit Test - WinstonProxyLogger", function () {
    describe("When require the manager", function () {

      it("Must be a function", function () {
        expect(WinstonProxyLogger).toEqual(jasmine.any(Function));
      });
    }); // End when require

    describe("When instantiate", function () {
      it("When not using the new operator Then must return new instance", function () {
        const instance = WinstonProxyLogger();
        expect(instance).toEqual(jasmine.any(WinstonProxyLogger));
      });

      it("When using the new operator must return new instance", function () {
        const instance = WinstonProxyLogger();
        expect(instance).toEqual(jasmine.any(WinstonProxyLogger));
      });

      it("Then must have logs function", function () {
        const instance = WinstonProxyLogger();

        _.each(['error', 'warn', 'warn', 'info', 'verbose', 'debug', 'silly'], function (levelName) {
          expect(instance[levelName]).toEqual(jasmine.any(Function));
        });
      });

      it("Given target Then must set the internal property", function () {
        const target = {
          a: 8
        };
        const instance = new WinstonProxyLogger({
          target: target
        });
        expect(instance.properties.target).toBe(target);
      });

      it("Given prefixes as string Then must set internal properties prefixes and prefixLog", function () {
        const instance = new WinstonProxyLogger({
          prefixes: "az"
        });

        expect(instance.properties.prefixes).toEqual([
          "az"
        ]);
        expect(instance.properties.prefixLog).toEqual("[az]");
      });

      it("Given prefixes as string array Then must set internal properties prefixes and prefixLog", function () {
        const prefixes = [
          "az",
          "l"
        ];
        const instance = new WinstonProxyLogger({
          prefixes: prefixes
        });

        expect(instance.properties.prefixes).toEqual(prefixes);
        expect(instance.properties.prefixLog).toEqual("[az][l]");
      });

      it("Given metaData Then must set internal properties metaData", function () {
        const metaData = [
          "az",
          "l"
        ];
        const instance = new WinstonProxyLogger({
          metaData: metaData
        });

        expect(instance.properties.metaData).toBe(metaData);
      });
    }); // End of When instantiate

    describe("When getRootTarget", function () {
      it("Given target nil Then must return undefined", function () {
        const instance = WinstonProxyLogger();
        expect(instance.getRootTarget()).toBeUndefined();
      });

      it("Given target as object Then must return the object", function () {
        const instance = WinstonProxyLogger();
        const targetObject = {
          a: ""
        };
        instance.properties.target = targetObject;
        expect(instance.getRootTarget()).toEqual(targetObject);
      });

      it("Given target as object Then must return the object", function () {
        const instance = WinstonProxyLogger();
        const targetObject = Object.create(WinstonProxyLogger.prototype);
        const fakeTarget = jasmine.createSpy("FakeTarget");
        instance.properties.target = targetObject;
        targetObject.getRootTarget = jasmine.createSpy("getRootTarget");
        targetObject.getRootTarget.and.callFake(function () {
          return fakeTarget;
        });
        expect(instance.getRootTarget()).toEqual(fakeTarget);
        expect(targetObject.getRootTarget).toHaveBeenCalled();
      });
    }); // End of When getRootTarget

    describe("When isDebugEnabled", function () {
      it("Then must call getRootTarget", function () {
        const instance = WinstonProxyLogger();
        instance.getRootTarget = jasmine.createSpy("getRootTarget");
        instance.isDebugEnabled();
        expect(instance.getRootTarget).toHaveBeenCalled();
      });

      it("Given target undefined Then must return false", function () {
        const instance = WinstonProxyLogger();
        instance.getRootTarget = jasmine.createSpy("getRootTarget").and.callFake(function () {
          return undefined;
        });
        expect(instance.isDebugEnabled()).toBeFalsy();
      });

      it("Given target defined and debug mode Then must return false", function () {
        const instance = WinstonProxyLogger();
        instance.getRootTarget = jasmine.createSpy("getRootTarget").and.callFake(function () {
          return {
            level: 'debug'
          };
        });
        expect(instance.isDebugEnabled()).toBeTruthy();
      });
    });

    describe("When generatePrefixLog", function () {
      it("Given undefined Then must return undefined", function () {
        const instance = WinstonProxyLogger();
        expect(instance.generatePrefixLog()).toBeUndefined();
      });

      it("Given string Then must return expected value", function () {
        const instance = WinstonProxyLogger();
        expect(instance.generatePrefixLog("qwerty")).toEqual("[qwerty]");
      });

      it("Given array with some string Then must return expected value", function () {
        const instance = WinstonProxyLogger();
        const prefixes = [
          "a",
          {},
          "b",
          12,
          "c",
          []
        ];
        expect(instance.generatePrefixLog(prefixes)).toEqual("[a][b][c]");
      });
    });

    describe("When property target", function () {
      it("Given target undefined When get Then must return undefined", function () {
        const instance = WinstonProxyLogger();
        instance.properties.target = undefined;
        expect(instance.target).toBeUndefined();
      });

      it("Given target object When get Then must return expected value", function () {
        const instance = WinstonProxyLogger();
        const expectedValue = jasmine.createSpy();
        instance.properties.target = expectedValue;
        expect(instance.target).toBe(expectedValue);
      });

      it("Given object When set Then must set target", function () {
        const instance = WinstonProxyLogger();
        const expectedValue = {
          a: ""
        };
        instance.target = expectedValue;
        expect(instance.properties.target).toBe(expectedValue);
      });

      it("Given undefined When set Then must target to undefined", function () {
        const instance = WinstonProxyLogger();
        instance.properties.target = {
          a: ""
        };
        instance.target = undefined;
        expect(instance.properties.target).toBeUndefined();
      });

      it("Given other that undefined or object When set Then must do nothing", function () {
        const instance = WinstonProxyLogger();
        const expectedValue = {
          a: ""
        };
        instance.properties.target = expectedValue;
        instance.target = function () {

        };
        expect(instance.properties.target).toBe(expectedValue);
      });
    });

    describe("When log", function () {
      it("Given not string level name Then must do nothing", function () {
        const instance = WinstonProxyLogger();
        const getRootTarget = jasmine.createSpy("getRootTarget");
        const generateMetaData = jasmine.createSpy("generateMetaData");
        instance.getRootTarget = getRootTarget;
        instance.generateMetaData = generateMetaData;
        instance.log({});
        expect(getRootTarget).not.toHaveBeenCalled();
        expect(generateMetaData).not.toHaveBeenCalled();
      });

      it("Given target level not exists but log function do Then must call log function", function () {
        const instance = WinstonProxyLogger();
        const targetMock = {
          log: jasmine.createSpy("log")
        };
        instance.getRootTarget = jasmine.createSpy("getRootTarget").and.callFake(function () {
          return targetMock;
        });

        instance.log("az");
        expect(instance.getRootTarget).toHaveBeenCalled();
        expect(targetMock.log).toHaveBeenCalledWith("az");
      });

      it("Given target level not exists but log function do with prefixes Then must call log function with valid arguments", function () {
        const instance = new WinstonProxyLogger({
          prefixes: [
            "ab",
            "cd"
          ]
        });
        const targetMock = {
          log: jasmine.createSpy("log")
        };
        instance.getRootTarget = jasmine.createSpy("getRootTarget").and.callFake(function () {
          return targetMock;
        });

        const expectedMetaData = {
          a: 45
        };
        instance.generateMetaData = jasmine.createSpy("generateMetaData").and.callFake(() => expectedMetaData);

        instance.log("debug", "az");
        instance.log("debug", "[az]");
        expect(instance.getRootTarget).toHaveBeenCalled();
        expect(targetMock.log).toHaveBeenCalledWith("debug", "[ab][cd] az", expectedMetaData);
        expect(targetMock.log).toHaveBeenCalledWith("debug", "[ab][cd][az]", expectedMetaData);
      });

      it("Given target level exists and with prefixes Then must call target function with valid arguments", function () {
        const instance = new WinstonProxyLogger({
          prefixes: [
            "ab",
            "cd"
          ]
        });
        const targetMock = {
          log: jasmine.createSpy("log"),
          debug: jasmine.createSpy("debug")
        };
        instance.getRootTarget = jasmine.createSpy("getRootTarget").and.callFake(function () {
          return targetMock;
        });

        instance.log("debug", "az");
        instance.log("debug", "[az]");
        expect(instance.getRootTarget).toHaveBeenCalled();
        expect(targetMock.log).not.toHaveBeenCalled();
        expect(targetMock.debug).toHaveBeenCalledWith("[ab][cd] az");
        expect(targetMock.debug).toHaveBeenCalledWith("[ab][cd][az]");
      });

      it('Given meta data as first Then must add it to the end', function () {
        const instance = new WinstonProxyLogger({
          prefixes: [
            "ab",
            "cd"
          ]
        });

        const metaDataIn = {
          a: 854
        };

        spyOn(instance, 'generateMetaData').and.returnValue({
          c: 77
        });

        const targetMock = {
          log: jasmine.createSpy("log"),
          debug: jasmine.createSpy("debug")
        };
        instance.getRootTarget = jasmine.createSpy("getRootTarget").and.callFake(function () {
          return targetMock;
        });

        instance.log("debug", metaDataIn, "az");
        instance.log("debug", "[az]");
        expect(instance.getRootTarget).toHaveBeenCalled();
        expect(targetMock.log).not.toHaveBeenCalled();
        expect(targetMock.debug).toHaveBeenCalledWith("[ab][cd] az", {
          a: 854,
          c: 77
        });
        expect(targetMock.debug).toHaveBeenCalledWith("[ab][cd][az]", {
          c: 77
        });
        expect(instance.generateMetaData).toHaveBeenCalledTimes(2);
      });

      it('Given meta data as last Then must add it to the end', function () {
        const instance = new WinstonProxyLogger({
          prefixes: [
            "ab",
            "cd"
          ]
        });

        const metaDataIn = {
          a: 854
        };

        spyOn(instance, 'generateMetaData').and.returnValue({});

        const targetMock = {
          log: jasmine.createSpy("log"),
          debug: jasmine.createSpy("debug")
        };
        instance.getRootTarget = jasmine.createSpy("getRootTarget").and.callFake(function () {
          return targetMock;
        });

        instance.log("debug", "az", metaDataIn);
        expect(instance.getRootTarget).toHaveBeenCalled();
        expect(targetMock.log).not.toHaveBeenCalled();
        expect(targetMock.debug).toHaveBeenCalledWith("[ab][cd] az", metaDataIn);
        expect(instance.generateMetaData).toHaveBeenCalledTimes(1);
      });

      it('Given meta data as first & last Then must add it to the end', function () {
        const instance = new WinstonProxyLogger({
          prefixes: [
            "ab",
            "cd"
          ]
        });

        spyOn(instance, 'generateMetaData').and.returnValue({
          c: 77
        });

        const targetMock = {
          log: jasmine.createSpy("log"),
          debug: jasmine.createSpy("debug")
        };
        instance.getRootTarget = jasmine.createSpy("getRootTarget").and.callFake(function () {
          return targetMock;
        });

        instance.log("debug", {
          a: 555,
          b: 852
        }, "az", {
          a: 5210
        });
        expect(instance.getRootTarget).toHaveBeenCalled();
        expect(targetMock.log).not.toHaveBeenCalled();
        expect(targetMock.debug).toHaveBeenCalledWith("[ab][cd] az", {
          a: 5210,
          b: 852,
          c: 77
        });
        expect(instance.generateMetaData).toHaveBeenCalledTimes(1);
      });
    }); // End of When log

    describe("When of", function () {
      it("Given no argument Then must create new proxy logger", function () {
        const firstProxy = new WinstonProxyLogger();
        const proxyFromOfFunction = firstProxy.of();

        expect(proxyFromOfFunction).toEqual(jasmine.any(WinstonProxyLogger));
        expect(proxyFromOfFunction.target).toBe(firstProxy);
      });

      it("Given string argument Then must create new proxy logger", function () {
        const metaData = {
          k: 12
        };
        const firstProxy = new WinstonProxyLogger({
          prefixes: "a",
          metaData: metaData
        });
        const proxyFromOfFunction = firstProxy.of("b");

        expect(proxyFromOfFunction).toEqual(jasmine.any(WinstonProxyLogger));
        expect(proxyFromOfFunction.target).toBe(firstProxy);
        expect(proxyFromOfFunction.properties.prefixes).toEqual(["a", "b"]);
        expect(proxyFromOfFunction.properties.metaData).toBe(metaData);
      });

      it("Given function with name argument Then must create new proxy logger", function () {
        const firstProxy = new WinstonProxyLogger({
          prefixes: "a"
        });

        function testFunctionName() {

        }

        const proxyFromOfFunction = firstProxy.of(testFunctionName);

        expect(proxyFromOfFunction).toEqual(jasmine.any(WinstonProxyLogger));
        expect(proxyFromOfFunction.target).toBe(firstProxy);
        expect(proxyFromOfFunction.properties.prefixes).toEqual(["a", "testFunctionName"]);
      });

      it("Given anonymous function argument Then must create new proxy logger", function () {
        const firstProxy = new WinstonProxyLogger({
          prefixes: "a"
        });

        const proxyFromOfFunction = firstProxy.of(function () {

        });

        expect(proxyFromOfFunction).toEqual(jasmine.any(WinstonProxyLogger));
        expect(proxyFromOfFunction.target).toBe(firstProxy);
        expect(proxyFromOfFunction.properties.prefixes).toEqual(["a", "anonymous"]);
      });

      describe("Given options as argument", function () {
        it("Given prefixes as string Then must create new proxy logger", function () {
          const firstProxy = new WinstonProxyLogger({
            prefixes: "a"
          });
          const proxyFromOfFunction = firstProxy.of({
            prefixes: "b"
          });

          expect(proxyFromOfFunction).toEqual(jasmine.any(WinstonProxyLogger));
          expect(proxyFromOfFunction.target).toBe(firstProxy);
          expect(proxyFromOfFunction.properties.prefixes).toEqual(["a", "b"]);
        });

        it("Given prefixes as function with name argument Then must create new proxy logger", function () {
          const firstProxy = new WinstonProxyLogger({
            prefixes: "a"
          });

          function testFunctionName() {

          }

          const proxyFromOfFunction = firstProxy.of({
            prefixes: testFunctionName
          });

          expect(proxyFromOfFunction).toEqual(jasmine.any(WinstonProxyLogger));
          expect(proxyFromOfFunction.target).toBe(firstProxy);
          expect(proxyFromOfFunction.properties.prefixes).toEqual(["a", "testFunctionName"]);
        });

        it("Given prefixes as string[] Then must create new proxy logger", function () {
          const firstProxy = new WinstonProxyLogger({
            prefixes: "a"
          });
          const proxyFromOfFunction = firstProxy.of({
            prefixes: ["b", 12, "c"]
          });

          expect(proxyFromOfFunction).toEqual(jasmine.any(WinstonProxyLogger));
          expect(proxyFromOfFunction.target).toBe(firstProxy);
          expect(proxyFromOfFunction.properties.prefixes).toEqual(["a", "b", "c"]);
        });

        it("Given metaData without type Then must replace it", function () {
          const firstProxy = new WinstonProxyLogger();
          const expectedMetaData = {
            v: 123
          };
          const proxyFromOfFunction = firstProxy.of({
            metaData: expectedMetaData
          });

          expect(proxyFromOfFunction).toEqual(jasmine.any(WinstonProxyLogger));
          expect(proxyFromOfFunction.target).toBe(firstProxy);
          expect(proxyFromOfFunction.properties.metaData).toBe(expectedMetaData);
        });

        it("Given metaData with invalid type Then must replace it", function () {
          const firstProxy = new WinstonProxyLogger();
          const expectedMetaData = {
            v: 123
          };
          const proxyFromOfFunction = firstProxy.of({
            metaData: expectedMetaData,
            metaDataType: "test"
          });

          expect(proxyFromOfFunction).toEqual(jasmine.any(WinstonProxyLogger));
          expect(proxyFromOfFunction.target).toBe(firstProxy);
          expect(proxyFromOfFunction.properties.metaData).toBe(expectedMetaData);
        });

        it("Given metaData with merge type Then must call tryMergeMetaData and return the expected value", function () {
          const firstProxy = new WinstonProxyLogger();
          firstProxy.properties.metaData = "a";
          const expectedMetaData = {
            v: 123
          };

          firstProxy.tryMergeMetaData = jasmine.createSpy("tryMergeMetaData").and.callFake(() => expectedMetaData);
          const proxyFromOfFunction = firstProxy.of({
            metaData: "b",
            metaDataType: "merge"
          });

          expect(proxyFromOfFunction).toEqual(jasmine.any(WinstonProxyLogger));
          expect(proxyFromOfFunction.target).toBe(firstProxy);
          expect(firstProxy.tryMergeMetaData).toHaveBeenCalledTimes(1);
          expect(firstProxy.tryMergeMetaData).toHaveBeenCalledWith("a", "b");
          expect(proxyFromOfFunction.properties.metaData).toBe(expectedMetaData);
        });

        it("Given metaData with merge type And tryMergeMetaData returns undefined Then must call tryMergeMetaData and return the expected value", function () {
          const firstProxy = new WinstonProxyLogger();
          firstProxy.properties.metaData = "a";
          const expectedMetaData = {
            __WinstonProxyLogger_mergeError: {
              origin: "a",
              metaData: "b"
            }
          };

          firstProxy.tryMergeMetaData = jasmine.createSpy("tryMergeMetaData").and.callFake(() => undefined);
          const proxyFromOfFunction = firstProxy.of({
            metaData: "b",
            metaDataType: "merge"
          });

          expect(proxyFromOfFunction).toEqual(jasmine.any(WinstonProxyLogger));
          expect(proxyFromOfFunction.target).toBe(firstProxy);
          expect(firstProxy.tryMergeMetaData).toHaveBeenCalledTimes(1);
          expect(firstProxy.tryMergeMetaData).toHaveBeenCalledWith("a", "b");
          expect(proxyFromOfFunction.properties.metaData).toEqual(expectedMetaData);
        });
      }); // End of #of(Options)
    }); // End of When of

    describe("When defineLogLevel", function () {
      it("Given valid name and not exist Then must define log function", function () {
        expect(WinstonProxyLogger.prototype.testMe).not.toBeDefined();
        WinstonProxyLogger.defineLogLevel("testMe");
        expect(WinstonProxyLogger.prototype.testMe).toEqual(jasmine.any(Function));
        expect(WinstonProxyLogger.levelNamesKnown.testMe).toBeTruthy();
        WinstonProxyLogger.unDefineLogLevel("testMe");
      });

      it("Given valid name and not exists Then when call function must call log with level name", function (testDone) {
        expect(WinstonProxyLogger.prototype.testMe).not.toBeDefined();
        WinstonProxyLogger.defineLogLevel("testMe");

        const instance = new WinstonProxyLogger();
        instance.log = jasmine.createSpy().and.callFake(function (levelName) {
          expect(levelName).toEqual("testMe");
          expect(arguments.length).toEqual(2);
          expect(arguments[1]).toEqual("a");
          WinstonProxyLogger.unDefineLogLevel("testMe");
          testDone();
        });
        instance.testMe("a");
      });
    }); // End of defineLogLevel

    describe("When defineLogLevelAlias", function () {
      it("Given valid name and not exist Then must define log function", function () {
        expect(WinstonProxyLogger.prototype.testMe).not.toBeDefined();
        WinstonProxyLogger.defineLogLevelAlias("debug", "testMe");
        expect(WinstonProxyLogger.prototype.testMe).toEqual(jasmine.any(Function));
        expect(WinstonProxyLogger.levelNamesKnown.testMe).toBeTruthy();
        WinstonProxyLogger.unDefineLogLevel("testMe");
      });

      it("Given valid name and not exists Then when call function must call log with level name and not alias", function (testDone) {
        expect(WinstonProxyLogger.prototype.testMe).not.toBeDefined();
        WinstonProxyLogger.defineLogLevelAlias("debug", "testMe");

        const instance = new WinstonProxyLogger();
        instance.log = jasmine.createSpy().and.callFake(function (levelName) {
          expect(levelName).toEqual("debug");
          expect(arguments.length).toEqual(2);
          expect(arguments[1]).toEqual("a");
          WinstonProxyLogger.unDefineLogLevel("testMe");
          testDone();
        });
        instance.testMe("a");
      });
    }); // End of When defineLogLevelAlias

    describe("When defineSysLogLevels", function () {
      it("Then must define sys log levels", function () {
        WinstonProxyLogger.defineSysLogLevels();
        _.each(['emerg', 'alert', 'crit', 'error', 'warning', 'notice', 'info', 'debug', 'warn', 'silly'], function (levelName) {
          expect(WinstonProxyLogger.prototype[levelName]).toEqual(jasmine.any(Function));
          expect(WinstonProxyLogger.levelNamesKnown[levelName]).toBeTruthy();
        });
      });
    }); // End of defineSysLogLevels

    describe("#generateMetaData", function () {
      it("Given no metaData Then must return undefined", function () {
        const instance = new WinstonProxyLogger();
        expect(instance.generateMetaData()).not.toBeDefined();
      });

      it("Given metadata as function Then must call it and return result", function () {
        const instance = new WinstonProxyLogger();
        const expectedResult = {
          a: 12
        };
        instance.properties.metaData = jasmine.createSpy("metaData").and.callFake(() => expectedResult);
        expect(instance.generateMetaData()).toBe(expectedResult);
      });

      it("Given metadata as function that failed Then must call it and return error", function () {
        const instance = new WinstonProxyLogger();
        const expectedResult = {
          a: 12
        };
        instance.properties.metaData = jasmine.createSpy("metaData").and.throwError("The error");
        expect(instance.generateMetaData()).toEqual({
          asymmetricMatch: function (val) {
            if (!_.isObjectLike(val)) {
              return false;
            }

            if (!_.isObjectLike(val.__WinstonProxyLogger_unexpectedError)) {
              return false;
            }

            const container = val.__WinstonProxyLogger_unexpectedError;
            return !_.isNil(container.error) && _.isString(container.stack) && _.isString(container.message);
          }
        });
      });

      it("Given metadata as object Then must return it", function () {
        const instance = new WinstonProxyLogger();
        const expectedResult = {
          a: 12
        };
        instance.properties.metaData = expectedResult;
        expect(instance.generateMetaData()).toBe(expectedResult);
      });

      it("Given metadata as string|number|boolean Then must return it", function () {
        const instance = new WinstonProxyLogger();
        let expectedResult = {
          data: "12a"
        };
        instance.properties.metaData = "12a";
        expect(instance.generateMetaData()).toEqual(expectedResult);

        expectedResult = {
          data: 12
        };
        instance.properties.metaData = 12;
        expect(instance.generateMetaData()).toEqual(expectedResult);

        expectedResult = {
          data: true
        };
        instance.properties.metaData = true;
        expect(instance.generateMetaData()).toEqual(expectedResult);
      });
    }); // End of #generateMetaData

    describe("#tryMergeMetaData", function () {
      const tryMergeMetaData = WinstonProxyLogger.prototype.tryMergeMetaData;
      it("Given different value Then must return undefined", function () {
        expect(tryMergeMetaData(12, "a")).not.toBeDefined();
      });

      it("Given different value but a undefined Then must return b", function () {
        expect(tryMergeMetaData(undefined, "b")).toEqual("b");
      });
      it("Given different value but b undefined Then must return b", function () {
        expect(tryMergeMetaData("a", undefined)).toEqual("a");
      });

      it("Given same value and unknown type Then must return undefined", function () {
        expect(tryMergeMetaData(undefined, undefined)).not.toBeDefined();
      });

      it("Given same value with type number|string|boolean Then must return expected value", function () {
        expect(tryMergeMetaData("a", "b")).toEqual({
          data: ["a", "b"]
        });

        expect(tryMergeMetaData(1, 5)).toEqual({
          data: [1, 5]
        });

        expect(tryMergeMetaData(true, false)).toEqual({
          data: [true, false]
        });
      });

      it("Given same value with type object Them must return expected value", function () {
        expect(tryMergeMetaData({a: 1}, {b: 5})).toEqual({
          a: 1,
          b: 5
        });
      });

      it("Given same value with type function Them must return expected value", function () {

        const mergeResult = tryMergeMetaData(
          () => {
            return {a: 1};
          },
          () => {
            return {b: 6};
          }
        );

        expect(mergeResult).toEqual(jasmine.any(Function));
        if (_.isFunction(mergeResult)) {
          expect(mergeResult()).toEqual({
            a: 1,
            b: 6
          });
        }
      });
    });
  });
});
