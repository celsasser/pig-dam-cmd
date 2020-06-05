/**
 * Date: 5/23/20
 * Time: 11:01 PM
 * @license MIT (see project's LICENSE file)
 */

import {CommandProxy} from "../../../src/command";
import {CommandExecuteType} from "../../../src/types";

export const defaultExecuteResolveValue: string = "success";
export const defaultExecuteRejectValue: string = "failed";

export const defaultExecuteResolve: CommandExecuteType<string> = () => Promise.resolve(defaultExecuteResolveValue);
export const defaultExecuteReject: CommandExecuteType<void> = () => Promise.reject(new Error(defaultExecuteRejectValue));

/**
 * Creates an instance of our internal test command
 */
export function createResolveTestCommand(execute: CommandExecuteType<string> = defaultExecuteResolve): CommandProxy<string> {
	return new CommandProxy<string>({
		execute,
		id: "urn:dam:command:id",
		traceId: "urn:dam:trace:id"
	});
}

/**
 * Creates an instance of our internal test command
 */
export function createRejectTestCommand(execute: CommandExecuteType<void> = defaultExecuteReject): CommandProxy<void> {
	return new CommandProxy({
		execute,
		id: "urn:dam:command:id",
		traceId: "urn:dam:trace:id"
	});
}
