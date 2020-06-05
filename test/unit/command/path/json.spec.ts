/**
 * Date: 5/28/20
 * Time: 1:16 AM
 * @license MIT (see project's LICENSE file)
 */

import * as fs from "fs-extra";
import {CommandReadJsonFile, CommandWriteJsonFile} from "../../../../src/command";

describe("command.file.json", function() {
	describe("CommandReadJsonFile", function() {
		describe("execute", function() {
			it("should properly load a json file", async function() {
				const instance = new CommandReadJsonFile({
					path: `${__dirname}/input/test.json`
				});
				return instance.execute()
					.then(result => {
						expect(result).toEqual(require("./input/test.json"));
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
			const instance = new CommandWriteJsonFile({object, path});
			return instance.execute()
				.then(result => {
					expect(result).toBeUndefined();
					expect(fs.writeJson).toHaveBeenCalledWith(path, object);
				});
		});
	});
});
