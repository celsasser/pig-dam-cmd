/**
 * Date: 6/7/20
 * Time: 11:12 PM
 * @license MIT (see project's LICENSE file)
 */

import {CommandUnhandledError, createShutdownProperties} from "../../../../src/command";
import {createTestLogger} from "../../../support/factory/logger";

describe("command.process.unhandled", function() {
	describe("CommandUnhandledError", function() {
		describe("constructor", function() {
			it("should properly create an instance", function() {
				const logger = createTestLogger();
				const shutdownProperties = createShutdownProperties();
				const instance = new CommandUnhandledError({
					id: "urn:dam:command:id",
					logger,
					shutdownProperties,
					traceId: "urn:dam:trace:id"
				});
				expect(instance.id).toEqual("urn:dam:command:id");
				// @ts-ignore
				expect(instance.logger).toEqual(logger);
				expect(instance.shutdownProperties).toEqual(shutdownProperties);
				expect(instance.traceId).toEqual("urn:dam:trace:id");
			});
		});

		describe("_execute", function() {
			it("should exit process on uncaught exception", function(done) {
				const error = new Error("forced");
				const logger = createTestLogger();
				const shutdownProperties = createShutdownProperties();
				const instance = new CommandUnhandledError({logger, shutdownProperties});
				// @ts-ignore
				process.exit = jest.fn((code) => {
					expect(logger.error).toHaveBeenCalled();
					expect(code).toEqual(shutdownProperties.exitCode);
					done();
				});
				instance.execute();
				process.emit("uncaughtException", error);
			});

			it("should log warning on unhandled rejections", function() {
				const logger = createTestLogger();
				const shutdownProperties = createShutdownProperties();
				const instance = new CommandUnhandledError({logger, shutdownProperties});
				instance.execute();
				process.emit("unhandledRejection", "reason", Promise.resolve());
				expect(logger.warn).toHaveBeenCalled();
			});
		});
	});
});
