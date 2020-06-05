/**
 * Date: 5/25/20
 * Time: 9:21 PM
 * @license MIT (see project's LICENSE file)
 */

import {CommandProxy} from "../../../src/command";
import {CommandExecuteType} from "../../../src/types";

describe("command.proxy", function() {
	const execute: CommandExecuteType<string> = jest.fn().mockResolvedValue("result");

	describe("CommandProxy", function() {
		describe("construction", function() {
			it("should properly create an instance", function() {
				const instance = new CommandProxy({execute});
				// @ts-ignore
				expect(instance._execute).toEqual(execute);
				expect(instance.id).toMatch(/^urn:dam:command:/);
				expect(instance.traceId).toMatch(/^urn:dam:trace:/);
			});
		});

		describe("execute", function() {
			it("should properly execute the execute param", async function() {
				const instance = new CommandProxy({execute});
				return instance.execute()
					.then(response => {
						expect(response).toEqual("result");
					});
			});
		});
	});
});
