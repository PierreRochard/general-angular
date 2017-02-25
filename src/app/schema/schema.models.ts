export interface Property {
  name?: string,
  required?: boolean;
  format: string,
  type: string,
}

export interface Definition {
  required?: string[];
  properties: { [name: string]: Property[] };
  type:  string;
}

export interface Path {
  get?: Endpoint;
  post?: Endpoint;
  delete?: Endpoint;
  patch?: Endpoint;
}

export interface Endpoint {
  tags: string[];
  produces: string[];
  consumes?: string[];
  parameters: Parameter[];
  responses: { [code: number]: Response}

}

export interface Parameter {
  required: boolean;
  in: string;
  name: string;
  type: string;
  description: string;
  enum?: string[];
  schema?: {$ref: string};
}

export interface Response {
  description: string;
}
