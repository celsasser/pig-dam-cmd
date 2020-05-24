/**
 * Date: 5/23/20
 * Time: 7:38 PM
 * @license MIT (see project's LICENSE file)
 */

import {mutable, PigError} from "pig-dam-core";
import {createQueueUrn} from "./factory/urn";
import {CommandInterface, CommandQueueInterface} from "./types";

/**
 * A command queue. A queue of commands with functionality to do what needs to get done.
 */
export class CommandQueue implements CommandQueueInterface {
	public readonly id: string;

	private index: number = 0;
	private readonly queue: CommandInterface[] = [];

	/**
	 * Construction
	 */
	constructor(id = createQueueUrn()) {
		this.id = id;
	}

	/********************
	 * Public Interface
	 ********************/
	/**
	 * Adds this command or commands to the end of the queue
	 */
	public add(command: CommandInterface|CommandInterface[]): void {
		const commands: CommandInterface[] = (Array.isArray(command))
			? command
			: [command];
		mutable.array.concat(this.queue, commands);
	}

	/**
	 * Inserts command or commands after specified <param>after</param>
	 * @throws {Error}
	 */
	public insert(command: CommandInterface|CommandInterface[], after: CommandInterface): void {
		const commands: CommandInterface[] = (Array.isArray(command))
			? command
			: [command];
		mutable.array.concat(this.queue, commands, {after});
	}

	/**
	 * Is there another command in the queue?
	 */
	public isNext(): boolean {
		return this.index < this.queue.length;
	}

	/**
	 * Gets command at the current command index pointer
	 * @throws {Error}
	 */
	public next(): CommandInterface {
		if(this.index < this.queue.length) {
			return this.queue[this.index++];
		} else {
			throw new PigError({
				instance: this,
				message: "no more commands",
				method: this.next
			});
		}
	}

}
