/**
 * Date: 6/7/20
 * Time: 7:16 PM
 * @license MIT (see project's LICENSE file)
 */

import * as _ from "lodash";
import {errorToDiagnosticString, LogBase, PigError} from "pig-dam-core";
import {CommandMetadataType, ShutdownProperties} from "../../types";
import {CommandBase} from "../base";
import {exitProcess} from "./shutdown";

/**
 * Listens for the specified signal (event) and exits if received
 */
export class CommandTerminalSignal extends CommandBase<void> {
	/**
	 * Shutdown properties. Applied if signal is received
	 */
	public readonly shutdownProperties: ShutdownProperties;
	/**
	 * Signal to listen for
	 */
	public readonly signal: NodeJS.Signals;
	private readonly logger: LogBase;

	/********************
	 * Public Interface
	 ********************/
	/**
	 * Construction
	 */
	constructor({id, logger, shutdownProperties, signal, traceId}: {
		id?: string,
		logger: LogBase,
		shutdownProperties: ShutdownProperties,
		signal: NodeJS.Signals,
		traceId?: string
	}) {
		super({id, traceId});
		this.logger = logger;
		this.shutdownProperties = shutdownProperties;
		this.signal = signal;
	}

	get metadata(): CommandMetadataType {
		return Object.assign(super.metadata, {
			shutdownProperties: _.pick(this.shutdownProperties, ["delayMillis", "exitCode"]),
			signal: this.signal
		});
	}

	/********************
	 * Private Interface
	 ********************/
	protected async _execute(): Promise<void> {
		process.addListener(this.signal, (): void => {
			const message = errorToDiagnosticString(new PigError({
				message: `"${this.signal}" caught. Initiating shutdown`
			}));
			this.logger.error(message, {
				metadata: this.metadata,
				moduleId: "pig-dam-cmd",
				traceId: this.traceId
			});
			exitProcess(this.shutdownProperties, this.signal);
		});
	}
}

/**
 * SIGINT listener
 */
export class CommandTerminalInterruptSignal extends CommandTerminalSignal {
	/**
	 * Construction
	 */
	constructor({id, logger, shutdownProperties, traceId}: {
		id?: string,
		logger: LogBase,
		shutdownProperties: ShutdownProperties,
		traceId?: string
	}) {
		super({
			id,
			logger,
			shutdownProperties,
			signal: "SIGINT",
			traceId
		});
	}
}

/**
 * SIGQUIT listener
 */
export class CommandTerminalQuitSignal extends CommandTerminalSignal {
	/**
	 * Construction
	 */
	constructor({id, logger, shutdownProperties, traceId}: {
		id?: string,
		logger: LogBase,
		shutdownProperties: ShutdownProperties,
		traceId?: string
	}) {
		super({
			id,
			logger,
			shutdownProperties,
			signal: "SIGQUIT",
			traceId
		});
	}
}

/**
 * SIGTERM listener
 */
export class CommandTerminalTerminateSignal extends CommandTerminalSignal {
	/**
	 * Construction
	 */
	constructor({id, logger, shutdownProperties, traceId}: {
		id?: string,
		logger: LogBase,
		shutdownProperties: ShutdownProperties,
		traceId?: string
	}) {
		super({
			id,
			logger,
			shutdownProperties,
			signal: "SIGTERM",
			traceId
		});
	}
}
