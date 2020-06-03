/**
 * Date: 5/23/20
 * Time: 7:38 PM
 * @license MIT (see project's LICENSE file)
 */

import {PigError} from "pig-dam-core";
import {createCommandUrn, createTraceUrn} from "../factory/urn";
import {CommandInterface} from "../types";

/**
 * Base class for commands. We do use interfaces so you don't have to inherit from
 * this guy. But probably should.
 */
export abstract class CommandBase<T> implements CommandInterface<T> {
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
	 * @immutable
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
	execute(): Promise<T> {
		throw new PigError({
			message: "must implement",
			metadata: this.metadata
		});
	}
}


/**
 * Base class for running one or more commands from within a command
 */
export abstract class CommandQueueBase<T> extends CommandBase<T[]> {
	public readonly commands: CommandInterface<T>[];

	/**
	 * Construction
	 */
	constructor({commands, id, traceId}: {
		commands: CommandInterface<T>[],
		id?: string,
		traceId?: string
	}) {
		super({id, traceId});
		this.commands = commands;
	}

	get metadata(): object {
		return Object.assign(super.metadata, {
			commands: this.commands.map(command => command.metadata)
		});
	}
}
