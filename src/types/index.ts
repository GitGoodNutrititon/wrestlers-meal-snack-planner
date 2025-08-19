// Export all types from a central location
export * from './recipe';

// Additional utility types
export interface AppConfig {
  siteName: string;
  siteDescription: string;
  allowedDomains: string[];
  isDevelopment: boolean;
}

export interface IframeMessage {
  type: 'resize' | 'ready' | 'error';
  height?: number;
  data?: any;
}
