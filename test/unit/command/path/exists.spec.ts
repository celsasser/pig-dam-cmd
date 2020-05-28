/**
 * Date: 5/28/20
 * Time: 1:16 AM
 * @license MIT (see project's LICENSE file)
 */

import {
	CommandFilePathExists,
	CommandFilePathNotExists
} from "../../../../src/command/file/exists";
import {CommandHistory} from "../../../../src/history";

describe("command.file.exists", function() {
	describe("CommandFilePathExists", function() {
		describe("execute", function() {
			it("should return true if it does", async function() {
				const history = new CommandHistory();
				const instance = new CommandFilePathExists({
					path: __filename
				});
				return instance.execute(history)
					.then(result => {
						expect(result).toEqual({
							result: true
						});
					});
			});

			it("should return false if it does not", async function() {
				const history = new CommandHistory();
				const instance = new CommandFilePathExists({
					path: `${__dirname}/bordertown`
				});
				return instance.execute(history)
					.then(result => {
						expect(result).toEqual({
							result: false
						});
					});
			});
		});
	});

	describe("CommandFilePathNotExists", function() {
		describe("execute", function() {
			it("should return false if it does", async function() {
				const history = new CommandHistory();
				const instance = new CommandFilePathNotExists({
					path: __filename
				});
				return instance.execute(history)
					.then(result => {
						expect(result).toEqual({
							result: false
						});
					});
			});

			it("should return true if it does not", async function() {
				const history = new CommandHistory();
				const instance = new CommandFilePathNotExists({
					path: `${__dirname}/bordertown`
				});
				return instance.execute(history)
					.then(result => {
						expect(result).toEqual({
							result: true
						});
					});
			});
		});
	});
});
