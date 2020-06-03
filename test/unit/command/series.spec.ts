/**
 * Date: 6/2/20
 * Time: 12:45 AM
 * @license MIT (see project's LICENSE file)
 */

import {CommandSeriesExecution} from "../../../src/command/series";
import {
	createRejectTestCommand,
	createResolveTestCommand,
	defaultExecuteRejectValue
} from "../../support/factory/command";

describe("command.series", function() {
	describe("execute", function() {
		it("should properly execute all commands and return all results", async function() {
			const commands = [
				createResolveTestCommand(),
				createResolveTestCommand()
			];
			const instance = new CommandSeriesExecution({commands});
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
			const instance = new CommandSeriesExecution({commands});
			return expect(instance.execute())
				.rejects.toThrowError(defaultExecuteRejectValue);
		});
	});
});
