/**
 * Date: 5/25/20
 * Time: 2:06 PM
 * @license MIT (see project's LICENSE file)
 */

import {CommandBase, CommandQueueBase} from "../../../src/command/base";
import {CommandInterface} from "../../../src/types";
import {createResolveTestCommand} from "../../support/factory/command";

describe("command.base", function() {
	describe("CommandBase", function() {
		function createInstance({id, traceId}: {
			id?: string,
			traceId?: string
		} = {}): CommandBase<void> {
			// @ts-ignore
			return new CommandBase({id, traceId});
		}

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
				expect(instance.execute.bind(instance))
					.toThrowError("must implement");
			});
		});
	});

	describe("CommandQueueBase", function() {
		function createInstance<T>({commands, id, traceId}: {
			commands: CommandInterface<T>[],
			id?: string,
			traceId?: string
		}): CommandQueueBase<T> {
			// @ts-ignore
			return new CommandQueueBase<T>({commands, id, traceId});
		}

		describe("constructor", function() {
			it("should properly create an instance", function() {
				const commands = [createResolveTestCommand()];
				const instance = createInstance({commands});
				expect(instance.commands).toEqual(commands);
				expect(instance.id).toMatch(/^urn:dam:command:/);
				expect(instance.traceId).toMatch(/^urn:dam:trace:/);
			});
		});

		describe("metadata", function() {
			const commands = [createResolveTestCommand()];
			const instance = createInstance({
				commands,
				id: "urn:dam:command:outer",
				traceId: "urn:dam:trace:outer"
			});
			expect(instance.metadata).toEqual({
				"commands": [
					{
						"id": "urn:dam:command:id",
						"traceId": "urn:dam:trace:id"
					}
				],
				"id": "urn:dam:command:outer",
				"traceId": "urn:dam:trace:outer"
			});
		});

	});
});
