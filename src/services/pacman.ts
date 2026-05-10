import { type PackageInfo, type PacmanSearchResult } from "../types"
import { parseSearchResults } from "../utils/parsePacmanOutput";
import { exec } from "../utils/spawn"

/********
 * EXEC *
 ********/
// - syncSearch(query) → pacman -Ss <query>
// - syncInfo(name) → pacman -Si <name>
// - listInstalled() → pacman -Q
// - listForeign() → pacman -Qm

/**********
 * STREAM *
 **********/
// - install(pkgPaths) → sudo pacman -U <paths...>
// - refresh() → sudo pacman -Sy

export const syncSearch = async (query: string): Promise<PacmanSearchResult[]> => {
	const execSearchCmd = await exec(["pacman", "-Ss", query]);
	if (execSearchCmd.stdout === null) {
		return [];
	} else if (execSearchCmd.exitCode !== 0) {
		throw new Error(execSearchCmd.stderr ?? "pacman search failed");
	} else {
		return parseSearchResults(execSearchCmd.stdout);
	}
}

export const syncInfo = (name: string): PackageInfo | null => {}


export const listInstalled = (): PackageInfo[] => {
}
export const listInstalledSingle = (name: string): PackageInfo => {}
export const listForeign = (): PackageInfo[] => {
}
export const install = (pkgPath: string[]) => {}
export const refresh = () => {}