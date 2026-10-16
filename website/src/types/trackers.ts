/** Telemetry feed payload records for application and accessory updates. */
export interface AppUpdateItem {
  name: string;
  versionName: string;
  iconUrl: string;
  playStoreUrl: string;
  changelog: string;
  publishedAt: string;
  discoveredAt: string;
  updatedAt?: string;
}

export interface AudioUpdateItem {
  modelId: string;
  name: string;
  brand: 'Nothing' | 'CMF';
  codename: string;
  version: string;
  size?: string;
  changelog: string;
  downloadUrl?: string;
  updatedAt: string;
}
