/**
 * Date: 6/4/20
 * Time: 11:22 PM
 * @license MIT (see project's LICENSE file)
 */

import {CommandHttpRequest, createHttpGetRequest} from "../../../src/command";
import {findResponseBody, logResponse} from "./support";

describe("http.GET", function() {
	/**
	 * Creates an instance of a command and returns it and the expected result
	 */
	function createCommand(path: string, throwOnErrorStatus: boolean = false): {
		command: CommandHttpRequest,
		expected: any
	} {
		const request = createHttpGetRequest({
			url: `http://localhost:9000${path}`
		});
		return {
			command: new CommandHttpRequest({request, throwOnErrorStatus}),
			expected: findResponseBody("get", path)
		};
	}

	it("should successfully GET JSON success", async function() {
		const {command, expected} = createCommand("/shelter/json/success");
		const result = await command.execute();
		logResponse(`GET JSON success`, result);
		expect(result.request.method).toEqual("GET");
		expect(result.status).toEqual(200);
		expect(result.data).toEqual(expected);

	});

	it("should successfully GET JSON failure", async function() {
		const {command, expected} = createCommand("/shelter/json/failure");
		const result = await command.execute();
		logResponse(`GET JSON failure`, result);
		expect(result.status).toEqual(404);
		expect(result.data).toEqual(expected);
	});

	it("should successfully GET text success", async function() {
		const {command, expected} = createCommand("/shelter/text/success");
		const result = await command.execute();
		logResponse(`GET text success`, result);
		expect(result.status).toEqual(200);
		expect(result.data).toEqual(expected);
	});

	it("should successfully GET text failure", async function() {
		const {command, expected} = createCommand("/shelter/text/failure");
		const result = await command.execute();
		logResponse(`GET text failure`, result);
		expect(result.status).toEqual(404);
		expect(result.data).toEqual(expected);
	});

	it("should throw error if we don't prevent it", async function() {
		const request = createHttpGetRequest({
			url: "http://localhost:9000/shelter/json/failure"
		});
		const command = new CommandHttpRequest({request});
		expect(command.execute())
			.rejects.toThrow();
	});
});
