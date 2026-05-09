import { packageInfoTodo, type PackageInfo } from "../types"

// - search(query) → pacman -Ss <query>
// - info(name) → pacman -Si <name>
// - listInstalled() → pacman -Q
// - listForeign() → pacman -Qm
// - install(pkgPaths) → sudo pacman -U <paths...>
// - refresh() → sudo pacman -Sy

export const search = (query: string): PackageInfo[] => {
	return packageInfoTodo();
}
export const info = (name: string): PackageInfo | null => {}
export const listInstalled = (): PackageInfo[] => {
	return packageInfoTodo();
}
export const listInstalledSingle = (name: string): PackageInfo => {}
export const listForeign = (): PackageInfo[] => {
	return packageInfoTodo();
}
export const install = (pkgPath: string[]) => {}
export const refresh = () => {}