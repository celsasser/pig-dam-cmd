/**
 * Date: 5/23/20
 * Time: 7:38 PM
 * @license MIT (see project's LICENSE file)
 */

import * as _ from "lodash";
import {PigError} from "pig-dam-core";
import {CommandBase} from "./command/base";
import {
	CommandHistoryFilter,
	CommandHistoryInterface,
	CommandInterface,
	CommandResult
} from "./types";

interface HistoryItem {
	command: CommandInterface;
	result: CommandResult;
}

export class CommandHistory implements CommandHistoryInterface {
	private readonly queue: HistoryItem[] = [];

	/********************
	 * Public Interface
	 ********************/
	/**
	 * Adds the results for <param>command</param> to the queue
	 */
	public add(command: CommandInterface, result: CommandResult): void {
		this.queue.push({command, result});
	}

	/**
	 * Gets the result of the last command.
	 */
	public last(filter?: CommandHistoryFilter): CommandResult {
		if(this.queue.length === 0) {
			throw new PigError({
				instance: this,
				message: "history queue is empty",
				method: this.last
			});
		}
		if(filter === undefined) {
			return this.queue[this.queue.length-1].result;
		} else {
			return this.findLastOfType(filter.type).result;
		}
	}

	/********************
	 * Private Interface
	 ********************/
	private findLastOfType(type: typeof CommandBase): HistoryItem {
		const item = _.findLast(this.queue, item => item.command instanceof type);
		if(item) {
			return item.result;
		} else {
			throw new PigError({
				instance: this,
				message: `could not find history of type ${type}`,
				method: this.findLastOfType
			});
		}
	}
}
