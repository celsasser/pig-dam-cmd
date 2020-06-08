/**
 * Date: 5/27/20
 * Time: 9:54 PM
 * @license MIT (see project's LICENSE file)
 */

import {readJson, writeJson} from "fs-extra";
import {CommandMetadataType} from "../../types";
import {CommandFilePathBase} from "./base";

/**
 * Loads file at path and parses as json
 */
export class CommandReadJsonFile<T = any> extends CommandFilePathBase<T> {
	protected async _execute(): Promise<T> {
		return readJson(this.path);
	}
}

/**
 * Writes object as json to specified path
 */
export class CommandWriteJsonFile<T = any> extends CommandFilePathBase<void> {
	public readonly object: T;

	/**
	 * Constructor
	 */
	constructor({id, object, path, traceId}: {
		id?: string,
		object: T,
		path: string,
		traceId?: string
	}) {
		super({id, path, traceId});
		this.object = object;
	}

	get metadata(): CommandMetadataType {
		return Object.assign(super.metadata, {
			object: this.object
		});
	}

	/********************
	 * Protected Interface
	 ********************/
	protected async _execute(): Promise<void> {
		return writeJson(this.path, this.object);
	}
}
