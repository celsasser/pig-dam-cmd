/**
 * Date: 5/27/20
 * Time: 9:54 PM
 * @license MIT (see project's LICENSE file)
 */

import {readJson, writeJson} from "fs-extra";
import {CommandHistoryInterface, CommandResponse} from "../../types";
import {CommandFilePathBase} from "./base";

/**
 * Loads file at path and parses as json
 */
export class CommandReadJsonFile extends CommandFilePathBase {
	async execute(history: CommandHistoryInterface): Promise<CommandResponse> {
		return {
			result: await readJson(this.path)
		};
	}
}

/**
 * Writes object as json to specified path
 */
export class CommandWriteJsonFile extends CommandFilePathBase {
	public readonly object: any;

	/**
	 * Constructor
	 */
	constructor({id, object, path, traceId}: {
		id?: string,
		object: any,
		path: string,
		traceId?: string
	}) {
		super({id, path, traceId});
		this.object = object;
	}

	get metadata(): object {
		return {
			object: this.object,
			...super.metadata
		};
	}

	async execute(history: CommandHistoryInterface): Promise<CommandResponse> {
		return {
			result: await writeJson(this.path, this.object)
		};
	}
}
