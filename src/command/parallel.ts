/**
 * Date: 5/23/20
 * Time: 7:37 PM
 * @license MIT (see project's LICENSE file)
 */

import {CommandQueueBase} from "./base";

/**
 * Runs 1 or more commands in parallel.
 */
export class CommandParallelExecution<T = any> extends CommandQueueBase<T> {
	/**
	 * Runs the commands in parallel and if all goes well then returns their results
	 * Successful response: [
	 *    <command[0].result>,
	 *    <command[1].result>,
	 *    ...
	 * ]
	 */
	protected _execute(): Promise<T[]> {
		const promises = this.commands.map(command => command.execute());
		return Promise.all(promises);
	}
}
