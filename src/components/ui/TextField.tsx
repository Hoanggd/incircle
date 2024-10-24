import React from "react";
import {
  TextField as AriaTextField,
  TextFieldProps as AriaTextFieldProps,
  ValidationResult,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import {
  Description,
  FieldError,
  Input,
  Label,
  fieldBorderStyles,
} from "./Field";
import { composeTailwindRenderProps, focusRing } from "./utils";

const inputStyles = tv({
  base: "border-[1px] focus:border-blue-500 rounded-md",
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    ...fieldBorderStyles.variants,
  },
});

export interface TextFieldProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, description, errorMessage, ...props }, ref) => {
    return (
      <AriaTextField
        validationBehavior="aria"
        {...props}
        className={composeTailwindRenderProps(
          props.className,
          "flex flex-col gap-1"
        )}
      >
        {label && <Label>{label}</Label>}
        <Input ref={ref} className={inputStyles} />
        {description && <Description>{description}</Description>}
        <FieldError>{errorMessage}</FieldError>
      </AriaTextField>
    );
  }
);

TextField.displayName = 'TextField';
