/**
 * Date: 5/27/20
 * Time: 9:34 PM
 * @license MIT (see project's LICENSE file)
 */

import {CommandParallelExecution} from "../../../src/command";
import {
	createRejectTestCommand,
	createResolveTestCommand,
	defaultExecuteRejectValue
} from "../../support/factory/command";

describe("command.parallel", function() {
	describe("execute", function() {
		it("should properly execute all commands and return all results", async function() {
			const commands = [
				createResolveTestCommand(),
				createResolveTestCommand()
			];
			const instance = new CommandParallelExecution({commands});
			return instance.execute()
				.then(response => {
					expect(response).toEqual([
						"success",
						"success"
					]);
				});
		});

		it("should properly fail if any command fails", async function() {
			const commands = [
				createRejectTestCommand()
			];
			const instance = new CommandParallelExecution({commands});
			return expect(instance.execute())
				.rejects
				.toThrowError(`CommandParallelExecution.execute() failed - CommandProxy.execute() failed - ${defaultExecuteRejectValue}`);
		});
	});
});
