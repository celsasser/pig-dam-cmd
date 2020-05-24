/**
 * Date: 5/24/20
 * Time: 1:01 AM
 * @license MIT (see project's LICENSE file)
 */
import {createUrn} from "pig-dam-core";

export function createCommandUrn(): string {
	return createUrn({path: "dam:cmd:command"});
}

export function createQueueUrn(): string {
	return createUrn({path: "dam:cmd:queue"});
}
