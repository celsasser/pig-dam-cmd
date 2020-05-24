/**
 * Date: 5/23/20
 * Time: 7:38 PM
 * @license MIT (see project's LICENSE file)
 */

import {createCommandUrn} from "../factory/urn";
import {CommandHistoryInterface, CommandInterface, CommandResponse} from "../types";

/**
 * Base class for commands. We do use interfaces so you don't have to inherit from
 * this guy. But probably should.
 */
export abstract class CommandBase implements CommandInterface {
	readonly id: string;

	/**
	 * Construction
	 */
	constructor(id = createCommandUrn()) {
		this.id = id;
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
			id: this.id
		};
	}

	/**
	 * Run this command
	 * @abstract
	 */
	execute(history: CommandHistoryInterface): Promise<CommandResponse> {
		throw new Error("must implement");
	}
}
