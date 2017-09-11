export interface Form {
  custom_name: string;
  form_name: string;
  schema_name: string;
  user_id: string;
}

export interface FormField {
  custom_name: string;
  field_name: string;
  field_type: string;
  form_name: string;
  schema_name: string;
  user_id: string;
}
