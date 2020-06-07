/**
 * Date: 5/24/20
 * Time: 1:01 AM
 * @license MIT (see project's LICENSE file)
 */

import {createUrn} from "pig-dam-core";

/**
 * Our convention for urns in the pig-dam-cmd module is: "urn:dam:<type>:<nss>"
 */

/**
 * Creates a unique id for a command
 */
export function createCommandUrn(): string {
	return createUrn({path: "dam:command"});
}

/**
 * Creates a unique trace-id
 */
export function createTraceUrn(): string {
	return createUrn({path: "dam:trace"});
}

