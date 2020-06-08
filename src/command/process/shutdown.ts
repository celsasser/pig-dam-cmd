/**
 * Date: 6/7/20
 * Time: 7:45 PM
 * @license MIT (see project's LICENSE file)
 */

import * as _ from "lodash";
import {Server as NetServer} from "net";
import {ShutdownCallback, ShutdownProperties} from "../../types";

/**
 * Simple factory with some suggested defaults
 */
export function createShutdownProperties({
	callback, server,
	delayMillis = 0,
	exitCode = 1
}: {
	callback?: ShutdownCallback;
	delayMillis?: number;
	exitCode?: number;
	server?: NetServer;
} = {}): ShutdownProperties {
	return {
		callback,
		delayMillis,
		exitCode,
		server
	};
}

/**
 * Exits the process as per directions in <paam>properties</param>
 */
export function exitProcess(properties: ShutdownProperties, cause: Error|NodeJS.Signals): void {
	if(properties.callback) {
		properties.callback(cause);
	}
	if(properties.server) {
		_.attempt(properties.server.close.bind(properties.server));
	}
	setTimeout(process.exit.bind(null, properties.exitCode), properties.delayMillis);
}
