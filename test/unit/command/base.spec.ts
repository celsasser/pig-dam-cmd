/**
 * Date: 5/25/20
 * Time: 2:06 PM
 * @license MIT (see project's LICENSE file)
 */

import {CommandBase} from "../../../src/command/base";
import {CommandHistory} from "../../../src/history";

describe("command.base", function() {
	function createInstance({id, traceId}: {
		id?: string,
		traceId?: string
	} = {}): CommandBase {
		// @ts-ignore
		return new CommandBase({id, traceId});
	}

	describe("CommandBase", function() {
		describe("constructor", function() {
			it("should properly create an instance with defaults", function() {
				const instance = createInstance();
				expect(instance.id).toMatch(/^urn:dam:command:[^:]+$/);
				expect(instance.traceId).toMatch(/^urn:dam:trace:[^:]+$/);
			});

			it("should properly create an instance with specified ids", function() {
				const instance = createInstance({
					id: "commandId",
					traceId: "traceId"
				});
				expect(instance.id).toEqual("commandId");
				expect(instance.traceId).toEqual("traceId");
			});
		});

		describe("metadata", function() {
			const instance = createInstance({
				id: "commandId",
				traceId: "traceId"
			});
			expect(instance.metadata).toEqual({
				id: "commandId",
				traceId: "traceId"
			});
		});

		describe("execute", function() {
			it("should throw an exception", function() {
				const instance = createInstance();
				const history = new CommandHistory();
				expect(instance.execute.bind(instance, history))
					.toThrowError("must implement");
			});
		});
	});
});
