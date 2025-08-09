import { useState, useCallback } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

type ValidationResult = string | boolean;

type ValidationRule<T> = {
  validator: (value: T[keyof T], values?: T) => ValidationResult;
  message: string;
};

type ValidationRules<T> = Partial<{
  [K in keyof T]: ValidationRule<T>[];
}>;

type FormErrors<T> = Partial<Record<keyof T, string>>;
type FormTouched<T> = Partial<Record<keyof T, boolean>>;

interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validationRules?: ValidationRules<T>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

interface FieldProps {
  name: string;
  value: any;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
}

const useForm = <T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validationRules = {},
  validateOnChange = true,
  validateOnBlur = true,
}: UseFormOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<FormTouched<T>>({});

  const validateField = useCallback(
    (name: keyof T, value: T[keyof T]): string => {
      if (!validationRules?.[name]) return '';
      
      const fieldRules = validationRules[name]!;
      const fieldErrors: string[] = [];

      for (const rule of fieldRules) {
        const result = rule.validator(value, values);
        if (result !== true) {
          fieldErrors.push(result || rule.message);
          // Return on first error if you want to show only one error at a time
          break;
        }
      }

      return fieldErrors[0] || '';
    },
    [validationRules, values]
  );

  const validateForm = useCallback(() => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(values).forEach((key) => {
      const fieldName = key as keyof T;
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, type } = e.target;
      const fieldName = name as keyof T;
      
      // We need to cast the value to the expected type
      // This assumes the form values are strings or booleans
      const fieldValue = type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked as unknown as T[keyof T]
        : (e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value as unknown as T[keyof T];

      setValues((prev) => ({
        ...prev,
        [fieldName]: fieldValue,
      }));

      if (validateOnChange) {
        const error = validateField(fieldName, fieldValue);
        setErrors((prev) => ({
          ...prev,
          [fieldName]: error,
        }));
      }
    },
    [validateField, validateOnChange]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const fieldName = e.target.name as keyof T;
      
      setTouched((prev) => ({
        ...prev,
        [fieldName]: true,
      }));

      if (validateOnBlur) {
        const error = validateField(fieldName, values[fieldName]);
        setErrors((prev) => ({
          ...prev,
          [fieldName]: error,
        }));
      }
    },
    [validateField, validateOnBlur, values]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      
      const isValid = validateForm();
      if (!isValid) {
        // Mark all fields as touched to show validation errors
        const allTouched = Object.keys(values).reduce((acc, key) => ({
          ...acc,
          [key]: true,
        }), {} as FormTouched<T>);
        setTouched(allTouched);
        return;
      }

      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
        // Handle form submission error (e.g., show error message to user)
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSubmit, validateForm, values]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const getFieldProps = (name: keyof T): FieldProps => {
    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      handleBlur(e);
    };
    
    return {
      name: name as string,
      value: values[name],
      onChange: handleChange,
      onBlur: onBlurHandler,
      error: touched[name] ? errors[name] : undefined,
    };
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    getFieldProps,
    setFieldValue: <K extends keyof T>(name: K, value: T[K]) => {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    setFieldTouched: (name: keyof T, isTouched = true) => {
      setTouched((prev) => ({
        ...prev,
        [name]: isTouched,
      }));
    },
    setFieldError: (name: keyof T, error: string) => {
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    },
  };
};

export { useForm };
export type { FieldProps, ValidationRule, ValidationRules };
