export interface AlertFeatureProperties {
  id: string;
  event: string;
  headline: string;
  description: string;
  severity: string;
  certainty: string;
  urgency: string;
  areaDesc: string;       // raw string before splitting
  sent: string;
  expires: string;
}

export interface AlertFeature {
  properties: AlertFeatureProperties;
}

export interface AlertApiResponse {
  features: AlertFeature[];
}

export interface AlertItem {
  id: string;
  event: string;
  headline: string;
  description: string;
  severity: string;
  certainty: string;
  urgency: string;
  areas: string[];
  sent: string;
  expires: string;
}
