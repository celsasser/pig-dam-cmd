/**
 * Date: 5/25/20
 * Time: 11:16 PM
 * @license MIT (see project's LICENSE file)
 */

import {executeCommand} from "../../src/process";
import {
	createRejectTestCommand,
	createResolveTestCommand,
	defaultExecuteResolveValue
} from "../support/factory/command";

describe("processor", function() {
	describe("executeCommand", function() {
		it("should resolve with proper result", async function() {
			const command = createResolveTestCommand();
			return executeCommand(command)
				.then(result => {
					expect(result).toEqual(defaultExecuteResolveValue);
				});
		});

		it("should reject with an informative error", async function() {
			const command = createRejectTestCommand();
			expect(executeCommand(command))
				.rejects.toThrowError();
		});
	});
});
