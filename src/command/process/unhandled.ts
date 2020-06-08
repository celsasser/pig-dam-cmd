/**
 * Date: 6/7/20
 * Time: 7:15 PM
 * @license MIT (see project's LICENSE file)
 */

import * as _ from "lodash";
import {errorToDiagnosticString, LogBase, PigError} from "pig-dam-core";
import {CommandMetadataType, ShutdownProperties} from "../../types";
import {CommandBase} from "../base";
import {exitProcess} from "./shutdown";

/**
 * Looks for unhandled exceptions and unhandled promise errors
 */
export class CommandUnhandledError extends CommandBase<void> {
	public readonly shutdownProperties: ShutdownProperties;
	private readonly logger: LogBase;

	/********************
	 * Public Interface
	 ********************/
	/**
	 * Construction
	 */
	constructor({id, logger, shutdownProperties, traceId}: {
		id?: string,
		logger: LogBase,
		shutdownProperties: ShutdownProperties,
		traceId?: string
	}) {
		super({id, traceId});
		this.logger = logger;
		this.shutdownProperties = shutdownProperties;
	}

	get metadata(): CommandMetadataType {
		return Object.assign(super.metadata, {
			shutdownProperties: _.pick(this.shutdownProperties, ["delayMillis", "exitCode"])
		});
	}

	/********************
	 * Private Interface
	 ********************/
	protected async _execute(): Promise<void> {
		this.setupUncaughtExceptionListener();
		this.setupUnhandledRejectionListener();
	}

	/**
	 * Sets up a listener for `event` and exits if we experience it
	 */
	private setupUncaughtExceptionListener(): void {
		process.addListener("uncaughtException", (error: Error): void => {
			const message = errorToDiagnosticString(new PigError({
				error,
				message: `Caught uncaught exception. Initiating shutdown`
			}));
			this.logger.error(message, {
				metadata: this.metadata,
				moduleId: "pig-dam-cmd",
				traceId: this.traceId
			});
			exitProcess(this.shutdownProperties, error);
		});
	}

	/**
	 * Sets up a listener for `event` and warns if we experience it
	 */
	private setupUnhandledRejectionListener(): void {
		process.addListener("unhandledRejection", (reason: any): void => {
			const message = errorToDiagnosticString(new PigError({
				details: JSON.stringify(reason),
				message: `Caught unhandled promise rejection`
			}));
			this.logger.warn(message, {
				metadata: this.metadata,
				moduleId: "pig-dam-cmd",
				traceId: this.traceId
			});
		});
	}
}
