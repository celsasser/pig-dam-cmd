/**
 * Date: 5/23/20
 * Time: 7:38 PM
 * @license MIT (see project's LICENSE file)
 */


import {getTypeName, PigError} from "pig-dam-core";
import {CommandInterface} from "./types";

/**
 * He's a very simple guy who executes the command and captures informative information
 * should he fail in one way or another
 */
export async function executeCommand<T>(command: CommandInterface<T>): Promise<T> {
	try {
		return await command.execute();
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
