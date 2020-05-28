/**
 * Date: 5/27/20
 * Time: 10:14 PM
 * @license MIT (see project's LICENSE file)
 */

import {ensureDir, pathExists, remove} from "fs-extra";
import {CommandHistoryInterface, CommandResponse} from "../../types";
import {CommandFilePathBase} from "./base";


/**
 * Creates the directory if it does not exist
 */
export class CommandEnsurePath extends CommandFilePathBase {
	async execute(history: CommandHistoryInterface): Promise<CommandResponse> {
		return {
			result: await ensureDir(this.path)
		};
	}
}

/**
 * Removes the directory if it does exist
 */
export class CommandEnsureNotPath extends CommandFilePathBase {
	async execute(history: CommandHistoryInterface): Promise<CommandResponse> {
		const exists = await pathExists(this.path);
		if(exists) {
			await remove(this.path);
		}
		return {};
	}
}

/**
 * Removes the specified path
 */
export class CommandRemovePath extends CommandFilePathBase {
	async execute(history: CommandHistoryInterface): Promise<CommandResponse> {
		return {
			result: await remove(this.path)
		};
	}
}

