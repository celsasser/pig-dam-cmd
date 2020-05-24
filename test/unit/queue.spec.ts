/**
 * Date: 5/23/20
 * Time: 11:00 PM
 * @license MIT (see project's LICENSE file)
 */

import {CommandQueue} from "../../src/queue";
import {createTestCommand} from "../support/factory/command";

describe("CommandQueue", function() {
	describe("add", function() {
		it("should properly insert a single command", function() {
			const queue = new CommandQueue();
			const command = createTestCommand();
			queue.add(command);
			expect(queue.next()).toStrictEqual(command);
		});

		it("should properly insert multiple commands", function() {
			const queue = new CommandQueue();
			const commands = [
				createTestCommand(),
				createTestCommand()
			];
			queue.add(commands);
			expect(queue.next()).toStrictEqual(commands[0]);
			expect(queue.next()).toStrictEqual(commands[1]);
		});
	});

	describe("insert", function() {
		it("should properly insert a single command", function() {
			const queue = new CommandQueue();
			const after = createTestCommand();
			const insert = createTestCommand();
			queue.add(after);
			queue.insert(insert, after);
			expect(queue.next()).toStrictEqual(after);
			expect(queue.next()).toStrictEqual(insert);
		});

		it("should properly insert multiple commands", function() {
			const queue = new CommandQueue();
			const after = createTestCommand();
			const insert =[
				createTestCommand(),
				createTestCommand()
			]
			queue.add(after);
			queue.insert(insert, after);
			expect(queue.next()).toStrictEqual(after);
			expect(queue.next()).toStrictEqual(insert[0]);
			expect(queue.next()).toStrictEqual(insert[1]);
		});
	});

	describe("isNext", function() {
		it("should return false if there isn't a next", function() {
			const queue = new CommandQueue();
			expect(queue.isNext()).toEqual(false);
		});

		it("should return true if there is a next", function() {
			const queue = new CommandQueue();
			queue.add(createTestCommand());
			expect(queue.isNext()).toEqual(true);
		});
	});

	/**
	 * We've incidentally tested the successful side next up above
	 */
	describe("next", function() {
		it("should throw an exception if there aren't any more commands", function() {
			const queue = new CommandQueue();
			expect(queue.next.bind(queue))
				.toThrowError("no more commands");
		});
	});
});
