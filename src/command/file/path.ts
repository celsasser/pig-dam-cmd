/**
 * Date: 5/27/20
 * Time: 10:14 PM
 * @license MIT (see project's LICENSE file)
 */

import {ensureDir, pathExists, remove} from "fs-extra";
import {CommandFilePathBase} from "./base";


/**
 * Creates the directory if it does not exist
 */
export class CommandEnsurePath extends CommandFilePathBase<void> {
	async execute(): Promise<void> {
		return ensureDir(this.path);
	}
}

/**
 * Removes the directory if it does exist
 */
export class CommandEnsureNotPath extends CommandFilePathBase<void> {
	async execute(): Promise<void> {
		const exists = await pathExists(this.path);
		if(exists) {
			await remove(this.path);
		}
	}
}

/**
 * Removes the specified path
 */
export class CommandRemovePath extends CommandFilePathBase<void> {
	async execute(): Promise<void> {
		return remove(this.path);
	}
}

