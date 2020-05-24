/**
 * Date: 5/24/20
 * Time: 1:17 AM
 * @license MIT (see project's LICENSE file)
 */

import {CommandHistoryInterface, CommandResponse} from "../types";
import {CommandBase} from "./base";

/**
 * A command we and you may use for testing.
 */
export class CommandTest extends CommandBase {
	public readonly response: Promise<CommandResponse>;

	/**
	 * Construction
	 */
	constructor({id, response = Promise.resolve({result: "success"})}: {
		id?: string,
		response?: Promise<CommandResponse>
	} = {}) {
		super(id);
		this.response = response;
	}

	/********************
	 * Public Interface
	 ********************/
	execute(history: CommandHistoryInterface): Promise<CommandResponse> {
		return this.response;
	}
}

