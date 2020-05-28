/**
 * Date: 5/27/20
 * Time: 10:17 PM
 * @license MIT (see project's LICENSE file)
 */

import {CommandBase} from "../base";

/**
 * Base class for all file commands that operate on a single path
 */
export abstract class CommandFilePathBase extends CommandBase {
	public readonly path: string;

	/**
	 * Constructor
	 */
	constructor({id, path, traceId}: {
		id?: string,
		path: string,
		traceId?: string
	}) {
		super({id, traceId});
		this.path = path;
	}

	get metadata(): object {
		return {
			path: this.path,
			...super.metadata
		};
	}
}
