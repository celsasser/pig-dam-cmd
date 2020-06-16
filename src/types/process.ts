import {Server as NetServer} from "net";

/**
 * Date: 6/7/20
 * Time: 7:33 PM
 * @license MIT (see project's LICENSE file)
 */

export type ShutdownCallback = (cause: Error|NodeJS.Signals) => void;

export interface ShutdownProperties {
	/**
	 * Will be called back upon processing
	 */
	callback?: ShutdownCallback;
	/**
	 * Optional delay to wait before exiting
	 */
	delayMillis: number;
	/**
	 * Exit code
	 */
	exitCode: number;
	/**
	 * Optional server which we will shutdown if included
	 */
	server?: NetServer;
}
