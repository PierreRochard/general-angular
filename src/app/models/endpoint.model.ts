export interface EndpointProperty {
  name: string;
  endpoint_name: string;
  type: string;
  format: string;
  required: boolean;
  tag: string;
}

export interface Endpoint {
  name: string;
  type: string;
  tag:  string;
}
