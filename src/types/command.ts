/**
 * Date: 5/23/20
 * Time: 10:00 PM
 * @license MIT (see project's LICENSE file)
 */

export type CommandExecuteType<T> = () => Promise<T>;
export type CommandMetadataType = {
	[key: string]: any
};

export interface CommandInterface<T> {
	/**
	 * Unique identifier of this command
	 */
	readonly id: string;

	/**
	 * Unique identifier of this command
	 */
	readonly traceId: string;

	/**
	 * Fundamental data that describes this object. To be included with logging and
	 * as error details.  Should not include recursive references.
	 */
	metadata: CommandMetadataType;

	/**
	 * Execute this command
	 */
	execute: CommandExecuteType<T>;
}

