import {
  FieldValues,
  FieldPath,
  ControllerProps,
  useController,
  FieldPathValue,
  useForm as useReactHookForm,
  UseFormProps,
} from "react-hook-form";
export { FormProvider } from "react-hook-form";
import { z } from "@/src/config/zod";
import { isFunction } from "lodash";

/**
 * A utility function to validate a value against a Zod schema.
 * @param schema - The Zod schema to validate against.
 * @returns A function that takes a value and returns a validation error message or undefined if the value is valid.
 */
const zodValidate = <S extends z.ZodType<any, any>>({
  schema,
}: {
  schema: S;
}) => {
  return (value: z.infer<S>) => {
    const result = schema.safeParse(value);
    return result.success || result.error.format()._errors[0];
  };
};

/**
 * A custom Controller component that extends react-hook-form's Controller with Zod schema validation.
 *
 * @example
 * <Controller
 *   name="email"
 *   control={form.control}
 *   schema={z.string().email()}
 *   render={({ field }) => <TextField {...field} label="Email" />}
 * />
 */
const Controller = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: ControllerProps<TFieldValues, TName> & {
    rules?: ControllerProps<TFieldValues, TName>["rules"] & {
      /**
       * A Zod schema to validate the field value against.
       */
      schema?: z.ZodType<FieldPathValue<TFieldValues, TName>, any>;
    };
  }
) => {
  const defaultValidateObject = () => {
    const validate = props.rules?.validate;

    if (isFunction(validate)) {
      return { default: validate };
    }

    if (!validate) {
      return {};
    }

    return validate;
  };

  const newRules = {
    ...(props.rules || {}),
    validate: {
      ...defaultValidateObject(),
      ...(props.rules?.schema ? { zod: zodValidate({ schema: props.rules.schema }) } : {}),
    },
  };

  // Add the new rules to the controller
  const controller = useController<TFieldValues, TName>({
    ...props,
    rules: newRules,
  });

  // Add additional props to the field
  const newField = {
    ...controller.field,
    isInvalid: controller.fieldState.invalid,
    errorMessage: controller.fieldState.error?.message,
  };

  return props.render({
    ...controller,
    field: newField,
  });
};

/**
 * A custom hook that extends react-hook-form's useForm hook
 */
const useForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
>(
  props: UseFormProps<TFieldValues, TContext> = {}
) => {
  return useReactHookForm({ mode: "onTouched", ...props });
};

export { zodValidate, Controller, useForm };
