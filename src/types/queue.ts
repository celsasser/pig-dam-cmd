/**
 * Date: 5/23/20
 * Time: 10:10 PM
 * @license MIT (see project's LICENSE file)
 */
import {CommandInterface} from "./command";

export interface CommandQueueInterface {
	/**
	 * Adds this command or commands to the end of the queue
	 */
	add(command: CommandInterface|CommandInterface[]): void;

	/**
	 * Create a clone of this interface
	 */
	clone(): CommandQueueInterface;

	/**
	 * Inserts command or commands after specified <param>after</param>
	 */
	insert(command: CommandInterface|CommandInterface[], after: CommandInterface): void;

	/**
	 * Is there another command to process?
	 */
	isNext(): boolean;

	/**
	 * Gets command at the current command index pointer
	 * @throws {Error} if no more commands
	 */
	next(): CommandInterface;
}
