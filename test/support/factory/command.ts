/**
 * Date: 5/23/20
 * Time: 11:01 PM
 * @license MIT (see project's LICENSE file)
 */

import {CommandTest} from "../../../src/command/test";
import {CommandInterface} from "../../../src/types";

/**
 * Creates an instance of our internal test command
 */
export function createTestCommand(): CommandInterface {
	return new CommandTest();
}
