/**
 * Date: 5/28/20
 * Time: 1:16 AM
 * @license MIT (see project's LICENSE file)
 */

import * as fs from "fs-extra";
import {
	CommandReadJsonFile,
	CommandWriteJsonFile
} from "../../../../src/command/file/json";
import {CommandHistory} from "../../../../src/history";

describe("command.file.json", function() {
	describe("CommandReadJsonFile", function() {
		describe("execute", function() {
			it("should properly load a json file", async function() {
				const history = new CommandHistory();
				const instance = new CommandReadJsonFile({
					path: `${__dirname}/input/test.json`
				});
				return instance.execute(history)
					.then(result => {
						expect(result).toEqual({
							result: require("./input/test.json")
						});
					});
			});
		});
	});

	describe("CommandWriteJsonFile", function() {
		beforeEach(function() {
			// @ts-ignore
			fs.writeJson = jest.fn().mockResolvedValue(undefined);
		});

		it("should attempt to write specified object", function() {
			const object = {};
			const path = `${__dirname}/input/test.json`;
			const history = new CommandHistory();
			const instance = new CommandWriteJsonFile({object, path});
			return instance.execute(history)
				.then(result => {
					expect(result).toEqual({});
					expect(fs.writeJson).toHaveBeenCalledWith(path, object);
				});
		});
	});
});
