/**
 * Date: 5/25/20
 * Time: 9:21 PM
 * @license MIT (see project's LICENSE file)
 */

import {CommandProxy} from "../../../src/command/proxy";
import {CommandHistory} from "../../../src/history";
import {CommandExecuteType} from "../../../src/types";

describe("command.proxy", function() {
	const execute: CommandExecuteType = jest.fn().mockResolvedValue({
		result: "result"
	});

	describe("construction", function() {
		it("should properly create an instance", function() {
			const instance = new CommandProxy({execute});
			expect(instance.execute).toEqual(execute);
			expect(instance.id).toMatch(/^urn:dam:command:/);
			expect(instance.traceId).toMatch(/^urn:dam:trace:/);
		});
	});

	describe("execute", function() {
		it("should properly execute the execute param", async function() {
			const instance = new CommandProxy({execute});
			const history = new CommandHistory();
			return instance.execute(history)
				.then(response => {
					expect(response).toEqual({
						result: "result"
					});
				});
		});
	});
});
