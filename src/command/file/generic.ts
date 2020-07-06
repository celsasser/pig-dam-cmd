/**
 * Date: 5/27/20
 * Time: 9:54 PM
 * @license MIT (see project's LICENSE file)
 */

import {readFile, writeFile} from "fs-extra";
import {CommandMetadataType} from "../../types";
import {CommandFilePathBase} from "./base";

/**
 * Loads file at path and returns contents
 */
export class CommandReadFile<T = string|Buffer> extends CommandFilePathBase<T> {
	public readonly encoding: string|undefined;

	/**
	 * Constructor
	 */
	constructor({id, encoding, path, traceId}: {
		encoding?: string,
		id?: string,
		path: string,
		traceId?: string
	}) {
		super({id, path, traceId});
		this.encoding = encoding;
	}

	get metadata(): CommandMetadataType {
		return Object.assign(super.metadata, {
			encoding: this.encoding
		});
	}

	protected _execute(): Promise<T> {
		// @ts-ignore
		return readFile(this.path, this.encoding);
	}
}

/**
 * Writes object as specified path
 */
export class CommandWriteFile extends CommandFilePathBase<void> {
	public readonly encoding: string|undefined;
	public readonly object: any;

	/**
	 * Constructor
	 */
	constructor({id, encoding, object, path, traceId}: {
		encoding?: string,
		id?: string,
		object: any,
		path: string,
		traceId?: string
	}) {
		super({id, path, traceId});
		this.encoding = encoding;
		this.object = object;
	}

	get metadata(): CommandMetadataType {
		return Object.assign(super.metadata, {
			encoding: this.encoding
		});
	}

	/********************
	 * Protected Interface
	 ********************/
	protected _execute(): Promise<void> {
		return writeFile(this.path, this.object, {
			encoding: this.encoding
		});
	}
}
