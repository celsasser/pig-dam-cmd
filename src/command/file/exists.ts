/**
 * Date: 5/27/20
 * Time: 10:00 PM
 * @license MIT (see project's LICENSE file)
 */

import {pathExists} from "fs-extra";
import {CommandFilePathBase} from "./base";

/**
 * Returns true if the path exists and false if it doesn't
 */
export class CommandFilePathExists extends CommandFilePathBase<boolean> {
	async execute(): Promise<boolean> {
		return pathExists(this.path);
	}
}

/**
 * Inverts the result of CommandFilePathExists
 */
export class CommandFilePathNotExists extends CommandFilePathExists {
	async execute(): Promise<boolean> {
		return !(await super.execute());
	}
}
