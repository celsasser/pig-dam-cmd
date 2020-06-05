/**
 * Date: 6/5/20
 * Time: 11:22 PM
 * @license MIT (see project's LICENSE file)
 */

import {CommandHttpRequest, createHttpDeleteRequest} from "../../../src/command";
import {findResponseBody, logResponse} from "./support";

describe("http.DELETE", function() {
	/**
	 * Creates an instance of a command and returns it and the expected result
	 */
	function createCommand(path: string, throwOnErrorStatus: boolean = false): {
		command: CommandHttpRequest,
		expected: any
	} {
		const request = createHttpDeleteRequest({
			url: `http://localhost:9000${path}`
		});
		return {
			command: new CommandHttpRequest({request, throwOnErrorStatus}),
			expected: findResponseBody("delete", path)
		};
	}

	it("should successfully DELETE JSON success", async function() {
		const {command, expected} = createCommand("/shelter/json/success");
		const result = await command.execute();
		logResponse(`DELETE JSON success`, result);
		expect(result.request.method).toEqual("DELETE");
		expect(result.status).toEqual(200);
		expect(result.data).toEqual(expected);

	});

	it("should successfully DELETE JSON failure", async function() {
		const {command, expected} = createCommand("/shelter/json/failure");
		const result = await command.execute();
		logResponse(`DELETE JSON failure`, result);
		expect(result.status).toEqual(404);
		expect(result.data).toEqual(expected);
	});

	it("should successfully DELETE text success", async function() {
		const {command, expected} = createCommand("/shelter/text/success");
		const result = await command.execute();
		logResponse(`DELETE text success`, result);
		expect(result.status).toEqual(200);
		expect(result.data).toEqual(expected);
	});

	it("should successfully DELETE text failure", async function() {
		const {command, expected} = createCommand("/shelter/text/failure");
		const result = await command.execute();
		logResponse(`DELETE text failure`, result);
		expect(result.status).toEqual(404);
		expect(result.data).toEqual(expected);
	});
});
