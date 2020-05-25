/**
 * Date: 5/23/20
 * Time: 7:37 PM
 * @license MIT (see project's LICENSE file)
 */

import {PigError} from "pig-dam-core";
import {CommandHistoryInterface, CommandInterface, CommandResponse} from "../types";
import {CommandBase} from "./base";


/**
 * Runs 1 or more commands in parallel.
 * Important Note: we do not support runtime command line expansion when commands are run in parallel.
 *    Execution will throw an exception if commands are expanded
 */
export class CommandParallelExecution extends CommandBase {
	public readonly commands: CommandInterface[];

	/**
	 * Construction
	 */
	constructor({commands, id, traceId}: {
		commands: CommandInterface,
		id?: string,
		traceId?: string
	}) {
		super({id, traceId});
		this.commands = commands;
	}

	get metadata(): object {
		return {
			commands: this.commands.map(command => command.metadata),
			...super.metadata
		}
	}

	/**
	 * Runs the commands in parallel and if all goes well then transforms their results
	 * into an array of results:
	 * Successful response: {
	 *     results: [
	 *         <command[0].result>,
	 *         <command[1].result>,
	 *         ...
	 *     ]
	 * }
	 */
	execute(history: CommandHistoryInterface): Promise<CommandResponse> {
		const promises = this.commands.map(command => command.execute(history));
		return Promise.all(promises)
			.then(responses => {
				return {
					result: responses.map(response => {
						if(response.commands === undefined) {
							return response.result;
						} else {
							throw new PigError({
								message: "command line expansion is not support when run in parallel",
								metadata: this.metadata
							});
						}
					})
				}
			});
	}
}
