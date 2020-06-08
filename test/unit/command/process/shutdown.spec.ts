/**
 * Date: 6/7/20
 * Time: 10:31 PM
 * @license MIT (see project's LICENSE file)
 */

import {createShutdownProperties, exitProcess} from "../../../../src/command";
import {ShutdownCallback} from "../../../../src/types";

describe("command.process.shutdown", function() {
	describe("createShutdownProperties", function() {
		it("should properly create instance", function() {
			const properties = createShutdownProperties({
				delayMillis: 1000,
				exitCode: 10
			});
			expect(properties).toEqual({
				delayMillis: 1000,
				exitCode: 10
			});
		});
	});


	describe("exitProcess", function() {
		it("should properly exit the process", function(done) {
			const error = new Error();
			const properties = createShutdownProperties({
				callback: jest.fn() as ShutdownCallback
			});
			// @ts-ignore
			process.exit = jest.fn((code) => {
				expect(properties.callback).toHaveBeenCalledWith(error);
				expect(code).toEqual(1);
				done();
			});
			exitProcess(properties, error);
		});
	});
});
