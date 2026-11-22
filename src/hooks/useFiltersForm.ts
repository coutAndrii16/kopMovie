import { useFormik } from 'formik'
import { initialFilterValues, type FilterValues } from '../types/filters'

// Formik ховається за простим контрактом { values, setField, reset, isDirty }:
// компоненти форми нічого не знають про бібліотеку.
export function useFiltersForm() {
  const formik = useFormik<FilterValues>({
    initialValues: initialFilterValues,
    onSubmit: () => {}, // фільтри застосовуються «на льоту», сабміт не потрібен
  })

  const setField = <K extends keyof FilterValues>(field: K, value: FilterValues[K]) => {
    void formik.setFieldValue(field, value)
  }

  return {
    values: formik.values,
    setField,
    reset: () => formik.resetForm(),
    isDirty: formik.dirty,
  }
}
