/**
 * Date: 5/23/20
 * Time: 10:03 PM
 * @license MIT (see project's LICENSE file)
 */
import {CommandInterface, CommandResult} from "./command";

export interface CommandHistoryFilter {
	type: typeof CommandInterface
};

export interface CommandHistoryInterface {
	/**
	 * Adds the results for <param>command</param> to the queue
	 */
	add(command: CommandInterface, result: CommandResult): void;

	/**
	 * Gets the result of the last command.
	 */
	last(filter?: CommandHistoryFilter): CommandResult;
}
