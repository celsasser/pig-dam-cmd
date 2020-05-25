/**
 * Date: 5/23/20
 * Time: 7:38 PM
 * @license MIT (see project's LICENSE file)
 */

import {PigError} from "pig-dam-core";
import {createCommandUrn, createTraceUrn} from "../factory/urn";
import {CommandHistoryInterface, CommandInterface, CommandResponse} from "../types";

/**
 * Base class for commands. We do use interfaces so you don't have to inherit from
 * this guy. But probably should.
 */
export abstract class CommandBase implements CommandInterface {
	public readonly id: string;
	public readonly traceId: string;

	/**
	 * Construction
	 */
	constructor({
		id = createCommandUrn(),
		traceId = createTraceUrn()
	}: {
		id?: string,
		traceId?: string
	} = {}) {
		this.id = id;
		this.traceId = traceId;
	}

	/********************
	 * Public interface
	 ********************/
	/**
	 * Fundamental data that describes this object. To be included with logging and
	 * as error details.  Should not include recursive references.
	 */
	get metadata(): object {
		return {
			id: this.id,
			traceId: this.traceId
		};
	}

	/**
	 * Run this command
	 * @throws {Error}
	 * @abstract
	 */
	execute(history: CommandHistoryInterface): Promise<CommandResponse> {
		throw new PigError({
			message: "must implement",
			metadata: this.metadata
		});
	}
}
