/**
 * Date: 5/27/20
 * Time: 10:53 PM
 * @license MIT (see project's LICENSE file)
 */

import * as fs from "fs-extra";
import {CommandCopyPath} from "../../../../src/command/file/copy";

jest.mock("fs-extra");
const fsMocked = fs as jest.Mocked<typeof fs>;

describe("command.file.copy", function() {
	describe("CommandCopyPath", function() {
		describe("constructor", function() {
			it("should properly create an instance", function() {
				const options = {};
				const instance = new CommandCopyPath({
					id: "id",
					options,
					pathFrom: "path-from",
					pathTo: "path-to",
					traceId: "trace-id"
				});
				expect(instance.options).toEqual(options);
				expect(instance.pathFrom).toEqual("path-from");
				expect(instance.pathTo).toEqual("path-to");
				expect(instance.metadata).toEqual({
					id: "id",
					options: {},
					pathFrom: "path-from",
					pathTo: "path-to",
					traceId: "trace-id"
				});
			});
		});

		describe("execute", function() {
			it("should properly make request on fs", async function() {
				const instance = new CommandCopyPath({
					pathFrom: "path-from",
					pathTo: "path-to"
				});
				return instance.execute()
					.then(result => {
						expect(result).toBeUndefined();
						expect(fsMocked.copy).toHaveBeenCalledWith("path-from", "path-to", undefined);
					});
			});
		});
	});
});
