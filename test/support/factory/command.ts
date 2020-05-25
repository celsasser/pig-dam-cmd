/**
 * Date: 5/23/20
 * Time: 11:01 PM
 * @license MIT (see project's LICENSE file)
 */

import {CommandProxy} from "../../../src/command/proxy";
import {CommandExecuteType, CommandInterface, CommandResponse} from "../../../src/types";

export const defaultExecuteResolveValue: CommandResponse = {
	result: "success"
};
export const defaultExecuteRejectValue: Error = new Error("failed");

export const defaultExecuteResolve: CommandExecuteType = () => Promise.resolve(defaultExecuteResolveValue);
export const defaultExecuteReject: CommandExecuteType = () => Promise.reject(defaultExecuteRejectValue);

/**
 * Creates an instance of our internal test command
 */
export function createResolveTestCommand(execute = defaultExecuteResolve): CommandInterface {
	return new CommandProxy({execute});
}

/**
 * Creates an instance of our internal test command
 */
export function createRejectTestCommand(execute = defaultExecuteReject): CommandInterface {
	return new CommandProxy({execute});
}
