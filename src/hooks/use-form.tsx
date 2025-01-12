import { z } from 'zod';
import { useState, useTransition } from 'react';
import { blogSchema } from '@/features/blog/schema';
import { FormFields, TouchedFields } from '@/types/types';

export function useBlogForm(initialFields?: FormFields) {
  const [fields, setFields] = useState<FormFields>({
    title: initialFields?.title ?? '',
    content: initialFields?.content ?? '',
    date: initialFields?.date,
  });
  const [touched, setTouched] = useState<TouchedFields>({
    title: false,
    content: false,
    date: false,
  });
  const [clientErrors, setClientErrors] = useState<z.ZodError | null>(null);
  const [isPending, startTransition] = useTransition();

  const validateField = (field: keyof TouchedFields, value: any) => {
    const dataToValidate = {
      ...fields,
      [field]: value,
      date:
        value instanceof Date
          ? value.toISOString()
          : fields.date?.toISOString() ?? '',
    };

    const validationResult = blogSchema.safeParse(dataToValidate);

    if (!validationResult.success) {
      const fieldError = validationResult.error.errors.find((err) =>
        err.path.includes(field)
      );
      if (fieldError) {
        setClientErrors(validationResult.error);
      } else {
        updateErrors(field);
      }
    } else if (touched[field]) {
      updateErrors(field);
    }
  };

  const updateErrors = (field: keyof TouchedFields) => {
    const newErrors = clientErrors?.errors.filter(
      (err) => !err.path.includes(field)
    );
    setClientErrors(newErrors?.length ? new z.ZodError(newErrors) : null);
  };

  const handleChange = (
    field: keyof FormFields,
    value: string | Date | undefined
  ) => {
    setFields((prev) => ({ ...prev, [field]: value }));
    if (touched[field as keyof TouchedFields]) {
      validateField(field as keyof TouchedFields, value);
    }
  };

  const handleBlur = (field: keyof TouchedFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, fields[field]);
  };

  const validateForm = () => {
    const validationResult = blogSchema.safeParse({
      ...fields,
      date: fields.date?.toISOString() ?? '',
    });

    if (!validationResult.success) {
      setClientErrors(validationResult.error);
      setTouched({ title: true, content: true, date: true });
      return false;
    }
    return true;
  };

  return {
    fields,
    touched,
    clientErrors,
    isPending,
    handleChange,
    handleBlur,
    validateForm,
    startTransition,
  };
}
