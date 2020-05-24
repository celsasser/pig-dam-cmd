/**
 * Date: 5/23/20
 * Time: 10:00 PM
 * @license MIT (see project's LICENSE file)
 */
import {CommandHistoryInterface} from "./history";

export type CommandResult = any;

export interface CommandInterface {
	/**
	 * Unique identifier of this command
	 */
	readonly id: string;

	/**
	 * Fundamental data that describes this object. To be included with logging and
	 * as error details.  Should not include recursive references.
	 */
	metadata: object;

	/**
	 * Execute this command
	 */
	execute(history: CommandHistoryInterface): Promise<CommandResponse>;
}

export interface CommandResponse {
	commands?: CommandInterface[];
	result?: CommandResult;
}
