
export interface ExecResult extends ExecStreamResult{
	stdout: string | null;
	stderr: string | null;
	success: boolean;
}

// makepkg can return 13, which means package already built, which isn't exactly a failure
export interface ExecStreamResult {
	exitCode: number
}

// @ts-ignore: not implemented yet
export type PackageInfo = any;
export const packageInfoTodo = (): any => {
	throw new Error("not implemented");
}