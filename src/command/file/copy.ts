/**
 * Date: 5/27/20
 * Time: 10:46 PM
 * @license MIT (see project's LICENSE file)
 */

import {copy, CopyOptions} from "fs-extra";
import {CommandHistoryInterface, CommandResponse} from "../../types";
import {CommandBase} from "../base";

/**
 * Copies from one path to another
 */
export class CommandCopyPath extends CommandBase {
	public readonly options?: CopyOptions;
	public readonly pathFrom: string;
	public readonly pathTo: string;

	/**
	 * Constructor
	 */
	constructor({id, options, pathFrom, pathTo, traceId}: {
		id?: string,
		options?: CopyOptions,
		pathFrom: string,
		pathTo: string,
		traceId?: string
	}) {
		super({id, traceId});
		this.options = options;
		this.pathFrom = pathFrom;
		this.pathTo = pathTo;
	}

	get metadata(): object {
		return {
			options: this.options,
			pathFrom: this.pathFrom,
			pathTo: this.pathTo,
			...super.metadata
		};
	}

	async execute(history: CommandHistoryInterface): Promise<CommandResponse> {
		return {
			result: await copy(this.pathFrom, this.pathTo, this.options)
		};
	}
}
