const rules = {
  required: (value: any) => !!value || "Este campo es requerido",
  minLength: (min: number) => (value: string) =>
    value.length >= min || `Debe tener al menos ${min} caracteres`,
};

export default rules;