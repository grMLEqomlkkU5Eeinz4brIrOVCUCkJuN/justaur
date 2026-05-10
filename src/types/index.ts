export interface ExecResult extends ExecStreamResult{
	stdout: string | null;
	stderr: string | null;
	success: boolean;
}

// makepkg can return 13, which means package already built, which isn't exactly a failure
export interface ExecStreamResult {
	exitCode: number
}

interface OptionalDeps {
	name: string;
	description: string | null;
	installed: boolean
}
export interface PackageInfo {
	Repository: string;
	Name: string;
	Version: string;
	Description: string;
	Architecture: string;
	URL: string;
	Licenses: string;
	Groups: string;
	Provides: string;
	DependsOn: string[];
	OptionalDeps: OptionalDeps;
	ConflictsWith: string[];
	Replaces: string[];
	DownloadSize: string; // may change this in the future if parsing of the value is needed
	InstalledSize: string; // same as the comment above
	Packager: string | null;
	BuildDate: string | null;
	ValidatedBy: string[];
}

// same as PackageInfo, but for installed packages
export interface InstalledPackageInfo extends PackageInfo{
	InstallDate: string | null;
	InstallReason: string | null;
}

// note that while this has a field called repository, when doing local searches, repository will use local isntead
export interface PacmanSearchResult extends PackageEntry{
	Repository: string;
	PackageDescription: string;
}

export interface PackageEntry {
	PackageName: string;
	PackageVersion: string;
}