/**
 * Date: 6/7/20
 * Time: 10:48 PM
 * @license MIT (see project's LICENSE file)
 */

import {
	CommandTerminalInterruptSignal,
	CommandTerminalQuitSignal,
	CommandTerminalTerminateSignal,
	createShutdownProperties
} from "../../../../src/command";
import {createTestLogger} from "../../../support/factory/logger";

describe("command.process.terminate", function() {
	describe("CommandTerminalSignal", function() {
		describe("_execute", function() {
			it("should setup an event listener and log and exit the process on signal", function(done) {
				const logger = createTestLogger();
				const shutdownProperties = createShutdownProperties();
				const instance = new CommandTerminalInterruptSignal({
					logger,
					shutdownProperties
				});
				// @ts-ignore
				process.exit = jest.fn((code) => {
					expect(logger.error).toHaveBeenCalledTimes(1);
					expect(code).toEqual(shutdownProperties.exitCode);
					done();
				});
				instance.execute();
				// @ts-ignore
				process.emit("SIGINT");
			});
		});
	});

	describe("CommandTerminalInterruptSignal", function() {
		describe("constructor", function() {
			it("should properly create an instance", function() {
				const logger = createTestLogger();
				const shutdownProperties = createShutdownProperties();
				const instance = new CommandTerminalInterruptSignal({
					id: "urn:dam:command:id",
					logger,
					shutdownProperties,
					traceId: "urn:dam:trace:id"
				});
				expect(instance.id).toEqual("urn:dam:command:id");
				// @ts-ignore
				expect(instance.logger).toEqual(logger);
				expect(instance.shutdownProperties).toEqual(shutdownProperties);
				expect(instance.signal).toEqual("SIGINT");
				expect(instance.traceId).toEqual("urn:dam:trace:id");
			});
		});
	});

	describe("CommandTerminalQuitSignal", function() {
		describe("constructor", function() {
			it("should properly create an instance", function() {
				const logger = createTestLogger();
				const shutdownProperties = createShutdownProperties();
				const instance = new CommandTerminalQuitSignal({
					id: "urn:dam:command:id",
					logger,
					shutdownProperties,
					traceId: "urn:dam:trace:id"
				});
				expect(instance.id).toEqual("urn:dam:command:id");
				// @ts-ignore
				expect(instance.logger).toEqual(logger);
				expect(instance.shutdownProperties).toEqual(shutdownProperties);
				expect(instance.signal).toEqual("SIGQUIT");
				expect(instance.traceId).toEqual("urn:dam:trace:id");
			});
		});
	});

	describe("CommandTerminalTerminateSignal", function() {
		describe("constructor", function() {
			it("should properly create an instance", function() {
				const logger = createTestLogger();
				const shutdownProperties = createShutdownProperties();
				const instance = new CommandTerminalTerminateSignal({
					id: "urn:dam:command:id",
					logger,
					shutdownProperties,
					traceId: "urn:dam:trace:id"
				});
				expect(instance.id).toEqual("urn:dam:command:id");
				// @ts-ignore
				expect(instance.logger).toEqual(logger);
				expect(instance.shutdownProperties).toEqual(shutdownProperties);
				expect(instance.signal).toEqual("SIGTERM");
				expect(instance.traceId).toEqual("urn:dam:trace:id");
			});
		});
	});
});
