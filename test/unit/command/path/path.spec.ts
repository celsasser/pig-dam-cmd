/**
 * Date: 5/28/20
 * Time: 1:40 AM
 * @license MIT (see project's LICENSE file)
 */

import * as fs from "fs-extra";
import {CommandEnsureNotPath, CommandEnsurePath} from "../../../../src/command";

jest.mock("fs-extra");
const mockedFs = fs as jest.Mocked<typeof fs>;

describe("command.file.path", function() {
	afterEach(function() {
		jest.resetAllMocks();
	});

	describe("CommandEnsurePath", function() {
		describe("execute", function() {
			it("should correctly call ensureDir", async function() {
				const instance = new CommandEnsurePath({
					path: "path"
				});
				return instance.execute()
					.then(result => {
						expect(result).toBeUndefined();
						expect(mockedFs.ensureDir).toHaveBeenCalledWith("path");
					});
			});
		});
	});

	describe("CommandEnsureNotPath", function() {
		describe("execute", function() {
			it("should call remove if it does exist", async function() {
				const instance = new CommandEnsureNotPath({
					path: "path"
				});
				mockedFs.pathExists.mockResolvedValue(true as never);
				return instance.execute()
					.then(result => {
						expect(result).toBeUndefined();
						expect(mockedFs.pathExists).toHaveBeenCalledWith("path");
						expect(mockedFs.remove).toHaveBeenCalledWith("path");
					});
			});

			it("should not call remove if it does not exist", async function() {
				const instance = new CommandEnsureNotPath({
					path: "path"
				});
				mockedFs.pathExists.mockResolvedValue(false as never);
				return instance.execute()
					.then(result => {
						expect(result).toBeUndefined();
						expect(mockedFs.pathExists).toHaveBeenCalledWith("path");
						expect(mockedFs.remove).not.toHaveBeenCalled();
					});
			});
		});
	});
});
