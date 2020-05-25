/**
 * Date: 5/25/20
 * Time: 11:16 PM
 * @license MIT (see project's LICENSE file)
 */

import {CommandProcessor} from "../../src/process";
import {CommandQueue} from "../../src/queue";
import {CommandInterface} from "../../src/types";
import {
	createResolveTestCommand,
	defaultExecuteResolveValue
} from "../support/factory/command";

describe("CommandProcessor", function() {
	let executeCommandSpy: jest.SpiedFunction<any>;

	/**
	 * creates an instance of CommandProcessor and builds a queue with <param>commands</param>
	 */
	function createInstance(commands: CommandInterface[] = []): CommandProcessor {
		const queue = new CommandQueue();
		queue.add(commands);
		return new CommandProcessor(queue);
	}

	beforeEach(function() {
		executeCommandSpy = jest.spyOn(CommandProcessor.prototype as any, "executeCommand");
	});

	describe("constructor", function() {
		it("should properly setup an instance", function() {
			const queue = new CommandQueue();
			const instance = new CommandProcessor(queue);
			// @ts-ignore
			expect(instance.queue).toEqual(queue);
		});
	});

	describe("execute", function() {
		it("should do nothing if there are no commands in the queue", async function() {
			const instance = createInstance();
			return instance.execute()
				.then(result => {
					expect(result).toBeUndefined();
					expect(executeCommandSpy).not.toHaveBeenCalled();
				})

		});

		it("should return the result of the last command processed", async function() {
			const command = createResolveTestCommand();
			const instance = createInstance([command]);
			return instance.execute()
				.then(result => {
					expect(result).toEqual(defaultExecuteResolveValue.result);
					expect(executeCommandSpy).toHaveBeenCalledWith(command);
				});
		});
	});
});
