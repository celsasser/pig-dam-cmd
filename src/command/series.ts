/**
 * Date: 6/2/20
 * Time: 12:25 AM
 * @license MIT (see project's LICENSE file)
 */

import {CommandQueueBase} from "./base";

/**
 * Runs 1 or more commands in series.
 */
export class CommandSeriesExecution<T = any> extends CommandQueueBase<T> {
	/**
	 * Runs the commands in series and if all goes well then returns their results
	 * Successful response: [
	 *    <command[0].result>,
	 *    <command[1].result>,
	 *    ...
	 * ]
	 */
	async execute(): Promise<T[]> {
		const result: T[] = [];
		for(const command of this.commands) {
			result.push(await command.execute());
		}
		return result;
	}
}
