import { stdout } from "bun";
import type { InstalledPackageInfo, PackageEntry, PackageInfo, PacmanSearchResult } from "../types";

// -Ss -Qs
export const parseSearchResults = (stdout: string): PacmanSearchResult[] => {
	const lines = stdout.split("\n").filter(line => line.length > 0); // removes trailing newlines
	const results: PacmanSearchResult[] = [];

	for (let i = 0; i + 1 < lines.length; i += 2) {
		const origin = lines[i]!;
		const description = lines[i + 1]!;

		const slashIndex = origin.indexOf("/");
		const afterSlash = origin.substring(slashIndex + 1);
		const spaceIndex = afterSlash.indexOf(" ");

		results.push({
			Repository: origin.substring(0, slashIndex),
			PackageName: afterSlash.substring(0, spaceIndex),
			PackageVersion: afterSlash.substring(spaceIndex + 1).split(" ")[0]!,
			PackageDescription: description.trim()
		});
	}

	return results;
};

// -i
export const parseInfoBlock = (block: string): Record<string, string | string[]> => {
};

// -Si
export const parseSyncInfoContent(stdout: string): PackageInfo[] { }

// -Qi
export const parseLocalInfoContent(stdout: string): InstalledPackageInfo[] {}

// -Q -Qm
export const parseList(stdout:string): PackageEntry[] {}