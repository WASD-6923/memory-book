import { PropertyType } from '@/generated/graphqlOperations.js'
import { IEnumObject } from '@/types/IEnumObject.ts'
export const usePropertyTypeNames: IEnumObject[] = [
  {
    label: 'property.types.string',
    value: PropertyType.String,
    severity: 'success',
  },
  {
    label: 'property.types.text',
    value: PropertyType.Text,
    severity: 'info',
  },
  {
    label: 'property.types.boolean',
    value: PropertyType.Boolean,
    severity: 'secondary',
  },
  {
    label: 'property.types.integer',
    value: PropertyType.Integer,
    severity: 'secondary',
  },
  {
    label: 'property.types.float',
    value: PropertyType.Float,
    severity: 'secondary',
  },
  {
    label: 'property.types.array',
    value: PropertyType.Array,
    severity: 'secondary',
  },
  {
    label: 'property.types.file',
    value: PropertyType.File,
    severity: 'secondary',
  },
]
