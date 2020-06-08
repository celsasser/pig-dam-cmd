/**
 * Date: 6/7/20
 * Time: 10:53 PM
 * @license MIT (see project's LICENSE file)
 */

import {LogBase, LogConsole} from "pig-dam-core";

/**
 * Creates a stubbed logger
 */
export function createStubbedLogger(): LogBase {
	const logger = new LogConsole({
		applicationId: "urn:dam:application:id",
		environmentId: "urn:dam:environment:id"
	});
	logger.debug = jest.fn();
	logger.error = jest.fn();
	logger.fatal = jest.fn();
	logger.info = jest.fn();
	logger.warn = jest.fn();
	return logger;
}
