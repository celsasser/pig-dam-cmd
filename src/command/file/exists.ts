/**
 * Date: 5/27/20
 * Time: 10:00 PM
 * @license MIT (see project's LICENSE file)
 */

import {pathExists} from "fs-extra";
import {CommandHistoryInterface, CommandResponse} from "../../types";
import {CommandFilePathBase} from "./base";

/**
 * Returns true if the path exists and false if it doesn't
 */
export class CommandFilePathExists extends CommandFilePathBase {
	async execute(history: CommandHistoryInterface): Promise<CommandResponse> {
		return {
			result: await pathExists(this.path)
		};
	}
}

/**
 * Inverts the result of CommandFilePathExists
 */
export class CommandFilePathNotExists extends CommandFilePathExists {
	async execute(history: CommandHistoryInterface): Promise<CommandResponse> {
		const response = await super.execute(history);
		return {
			result: !response.result
		};
	}
}
