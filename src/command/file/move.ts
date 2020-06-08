/**
 * Date: 5/28/20
 * Time: 1:00 AM
 * @license MIT (see project's LICENSE file)
 */

import {ensureDir, move, MoveOptions, readdir} from "fs-extra";
import {join as joinPath} from "path";
import {CommandMetadataType} from "../../types";
import {CommandBase} from "../base";

/**
 * Moves from one path to another
 */
export class CommandMovePath extends CommandBase<void> {
	public readonly options?: MoveOptions;
	public readonly pathFrom: string;
	public readonly pathTo: string;

	/**
	 * Constructor
	 */
	constructor({id, options, pathFrom, pathTo, traceId}: {
		id?: string,
		options?: MoveOptions,
		pathFrom: string,
		pathTo: string,
		traceId?: string
	}) {
		super({id, traceId});
		this.options = options;
		this.pathFrom = pathFrom;
		this.pathTo = pathTo;
	}

	get metadata(): CommandMetadataType {
		return Object.assign(super.metadata, {
			options: this.options,
			pathFrom: this.pathFrom,
			pathTo: this.pathTo
		});
	}

	/*****************************
	 * Protected/Private Interface
	 ****************************/
	protected async _execute(): Promise<void> {
		if(this.pathFrom !== this.pathTo) {
			if(this.pathTo.startsWith(this.pathFrom)) {
				// path-from is nested with path-to. We do some fancy dancing
				await this.moveNested();
			} else {
				await move(this.pathFrom, this.pathTo, this.options);
			}
		}
	}

	/**
	 * Moves this directory into a directory that is within `pathFrom`
	 */
	private async moveNested(): Promise<void> {
		const from = (await readdir(this.pathFrom)).map(name => ({
			name,
			path: joinPath(this.pathFrom, name)
		}));
		await ensureDir(this.pathTo);
		for(const {name, path} of from) {
			// we don't want to move this file if he is the subdirectory we are targeting. Get it? Got it? Good!
			if(!this.pathTo.startsWith(path)) {
				await move(path, joinPath(this.pathTo, name));
			}

		}
	}
}
