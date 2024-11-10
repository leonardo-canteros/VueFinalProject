const rules = {
  required: (value: any) => !!value || "This field is required",
  minLength: (min: number) => (value: string) =>
    value.length >= min || `This field must be at least ${min} characters`,
};

export default rules;