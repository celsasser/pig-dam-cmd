/**
 * Date: 5/25/20
 * Time: 9:09 PM
 * @license MIT (see project's LICENSE file)
 */

import {CommandExecuteType} from "../types";
import {CommandBase} from "./base";

/**
 * It proxies a promise. There will be times when we want to do stuff but don't want to create
 * commands for them. This is your man. You must supply the guy who will do the work.
 */
export class CommandProxy<T> extends CommandBase<T> {
	protected _execute: CommandExecuteType<T>;

	constructor({execute, id, traceId}: {
		execute: CommandExecuteType<T>,
		id?: string,
		traceId?: string
	}) {
		super({id, traceId});
		this._execute = execute;
	}
}
