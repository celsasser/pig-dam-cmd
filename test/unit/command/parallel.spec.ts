/**
 * Date: 5/27/20
 * Time: 9:34 PM
 * @license MIT (see project's LICENSE file)
 */

import {CommandParallelExecution} from "../../../src/command/parallel";
import {CommandHistory} from "../../../src/history";
import {
	createRejectTestCommand,
	createResolveTestCommand, defaultExecuteRejectValue
} from "../../support/factory/command";

describe("command.parallel", function() {
	describe("construction", function() {
		it("should properly create an instance", function() {
			const commands = [createResolveTestCommand()]
			const instance = new CommandParallelExecution({commands});
			expect(instance.commands).toEqual(commands);
			expect(instance.id).toMatch(/^urn:dam:command:/);
			expect(instance.traceId).toMatch(/^urn:dam:trace:/);
		});
	});

	describe("execute", function() {
		it("should properly execute all commands and return all results", async function() {
			const commands = [
				createResolveTestCommand(),
				createResolveTestCommand()
			];
			const instance = new CommandParallelExecution({commands});
			const history = new CommandHistory();
			return instance.execute(history)
				.then(response => {
					expect(response).toEqual({
						result: [
							"success",
							"success"
						]
					});
				});
		});

		it("should properly fail if any command fails", async function() {
			const commands = [
				createRejectTestCommand()
			];
			const instance = new CommandParallelExecution({commands});
			const history = new CommandHistory();
			return expect(instance.execute(history)).
				rejects.toThrowError(defaultExecuteRejectValue);
		});
	});
});
