export interface ServiceItem {
    name: string;
    description: string;
    latestVersion: string;
    releaseTime: string;
    gitlabSourceUrl: string;
}

export interface VersionItem {
    version: string;
    releaseTime: string;
    apiSpecUrl: string;
    description: string;
} 

export interface ServiceDetail {
    name: string;
    versions: Array<VersionItem>;
}
