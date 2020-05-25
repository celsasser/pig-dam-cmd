/**
 * Date: 5/23/20
 * Time: 7:38 PM
 * @license MIT (see project's LICENSE file)
 */


import {getTypeName, PigError} from "pig-dam-core";
import {CommandHistory} from "./history";
import {
	CommandInterface,
	CommandQueueInterface,
	CommandResponse,
	CommandResultType
} from "./types";

/**
 * This guy processes a queue of commands and returns the successful results
 * or the failure.
 */
export class CommandProcessor {
	private readonly queue: CommandQueueInterface;
	private readonly history: CommandHistory;

	/**
	 * Construction
	 */
	constructor(queue: CommandQueueInterface) {
		this.queue = queue.clone();
		this.history = new CommandHistory();
	}

	/********************
	 * Public Interface
	 ********************/
	/**
	 * Processes all commands in the queue and when done returns the results
	 * @throws {PigError}
	 */
	public async execute(): Promise<CommandResultType> {
		let result: CommandResultType;
		while(this.queue.isNext()) {
			result = await this.executeCommand(this.queue.next());
		}
		return result;
	}

	/********************
	 * Private Interface
	 ********************/
	private async executeCommand(command: CommandInterface): Promise<CommandResultType> {
		try {
			const response = await command.execute(this.history);
			this.processCommandResponse(command, response);
			return response.result;
		} catch(error) {
			// we want to make sure we capture the details of the command that failed.
			// the actual error will lurk within. We will need to provide some good support
			// for being able to dive into and out of an error
			throw new PigError({
				error,
				message: `${getTypeName(command)}.execute() failed - ${error.message}`,
				metadata: {
					command: getTypeName(command),
					details: command.metadata
				}
			});
		}
	}

	/**
	 * Processes the commands response
	 * @throws {Error} only for unexpected conditions
	 */
	private processCommandResponse(command: CommandInterface, response: CommandResponse): void {
		if(response.commands !== undefined) {
			this.queue.insert(response.commands, command);
			if(response.result!==undefined) {
				throw new PigError({
					message: "unexpected result with command expansion"
				});
			}
		} else {
			this.history.add(command, response.result);
		}
	}
}
