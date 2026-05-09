import type { ExecResult, ExecStreamResult } from "../types";

export const exec = async (
	cmd: string[],
	opts?: { cwd?: string }
): Promise<ExecResult> => {
	const proc = Bun.spawn([
		...cmd
	], {
		cwd: opts?.cwd,
		stderr: "pipe",
		stdout: "pipe" // this should be done by default, but I like to be explicit
	});

	const stdout = await proc.stdout.text();
	const stderr = await proc.stderr.text();

	// need to wait for the exit so that the process is actually finished
	// and not have zombie processes or edge cases where a stream might close before
	// a proc is fully cleaned
	const exitCode = await proc.exited;

	// success can possibly be ignored in some other parts but the exitcode could be used to do other things
	// rare tho since the user ain't gonna see this and make those decisions
	const output: ExecResult = {
		stdout: stdout.length > 0 ? stdout : null,
		stderr: stderr.length > 0 ? stderr : null,
		exitCode,
		success: exitCode === 0
	}

	return output;
}

export const stream = async (
	cmd: string[],
	opts?: { cwd?: string }
): Promise<ExecStreamResult> => {
	const proc = Bun.spawn(cmd, {
		cwd: opts?.cwd,
		stderr: "pipe",
		stdout: "pipe"
	});

	const decoder = new TextDecoder();

	const stdoutTask = (async () => {
		for await (const chunk of proc.stdout) {
			// Using write instead of log prevents double-newlines
			process.stdout.write(`STDOUT: ${decoder.decode(chunk)}`);
		}
	})();

	const stderrTask = (async () => {
		for await (const chunk of proc.stderr) {
			process.stderr.write(`STDERR: ${decoder.decode(chunk)}`);
		}
	})();

	// Capture the exitCode directly from the Promise.all results
	const [, , exitCode] = await Promise.all([stdoutTask, stderrTask, proc.exited]);

	return { exitCode };
}
