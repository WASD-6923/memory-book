export default function useFieldHasError(
  errors: Object,
  fieldName: string | number | symbol,
) {
  return fieldName in errors
}
