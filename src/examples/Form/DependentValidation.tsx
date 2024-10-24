import { Controller, FormProvider, useForm } from "@/src/components/Form";
import { Button } from "@/src/components/ui/Button";
import { TextField } from "@/src/components/ui/TextField";
import { z } from "@/src/config/zod";

type FormInputs = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export const DependentValidationForm = () => {
  const form = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    window.alert(JSON.stringify(data));
  };

  return (
    <div className="p-2">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 container max-w-[500px] mx-auto"
        >
          <h3>Dependent Validation Form</h3>

          <Controller
            control={form.control}
            name="email"
            rules={{ schema: z.string().email() }}
            render={({ field }) => <TextField {...field} label="Email" />}
          />

          <Controller
            name="password"
            control={form.control}
            rules={{ schema: z.string().min(1) }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                onChange={(e) => {
                  field.onChange(e);

                  if (form.getValues("confirmPassword")) {
                    form.trigger("confirmPassword");
                  }
                }}
              />
            )}
          />

          <Controller
            control={form.control}
            name="confirmPassword"
            rules={{
              schema: z.string().min(4),
              validate: (v) =>
                v === form.getValues("password") || "Passwords do not match",
            }}
            render={({ field }) => (
              <TextField label="Confirm Password" {...field} />
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </div>
  );
};
