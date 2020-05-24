/**
 * Date: 5/23/20
 * Time: 11:00 PM
 * @license MIT (see project's LICENSE file)
 */

import {CommandHistory} from "../../src/history";
import {createTestCommand} from "../support/factory/command";

describe("CommandHistory", function() {
	describe("add", function() {
		it("should properly store the input", function() {
			const history = new CommandHistory();
			history.add(createTestCommand(), "result");
			expect(history.last()).toStrictEqual("result");
		});
	});

	describe("last", function() {
		it("should throw an exception if the queue is empty", function() {
			const history = new CommandHistory();
			expect(history.last.bind(history))
				.toThrowError("history queue is empty");
		});

		it("should get last unfiltered result", function() {
			const history = new CommandHistory();
			history.add(createTestCommand(), "result");
			expect(history.last()).toStrictEqual("result");
		});
	});
});
