/**
 * Date: 5/23/20
 * Time: 7:38 PM
 * @license MIT (see project's LICENSE file)
 */

import {getTypeName, PigError} from "pig-dam-core";
import {createCommandUrn, createTraceUrn} from "../factory";
import {CommandInterface, CommandMetadataType} from "../types";

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
	public get metadata(): CommandMetadataType {
		return {
			id: this.id,
			traceId: this.traceId
		};
	}

	/**
	 * Run this command. I want every single execution to go through the base.
	 * Why? Because I want to be uniform in how we capture and report errors. I want
	 * every one of them to identify the command and associated metadata. I don't
	 * want to miss anything.
	 * @throws {PigError}
	 * @final
	 */
	public async execute(): Promise<T> {
		try {
			return await this._execute();
		} catch(error) {
			throw new PigError({
				error,
				message: `${getTypeName(this)}.execute() failed - ${error.message}`,
				metadata: this.metadata
			});
		}
	}

	/********************
	 * Protected Interface
	 ********************/
	protected abstract _execute(): Promise<T>;

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

	get metadata(): CommandMetadataType {
		return Object.assign(super.metadata, {
			commands: this.commands.map(command => command.metadata)
		});
	}
}
