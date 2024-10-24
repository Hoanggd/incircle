import { Controller, useForm } from "@/src/components/Form";
import { Button } from "@/src/components/ui/Button";
import { TextField } from "@/src/components/ui/TextField";
import { z } from "@/src/config/zod";

type FormInputs = {
  email: string;
  name: string;
};

export const BasicForm = () => {
  const form = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    window.alert(JSON.stringify(data));
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid gap-4 container max-w-[500px] mx-auto"
    >
      <h2>Basic Form</h2>

      <Controller
        name="email"
        control={form.control}
        rules={{ schema: z.string().email() }}
        render={({ field }) => <TextField {...field} label="Email" />}
      />

      <Controller
        name="name"
        control={form.control}
        rules={{ schema: z.string().min(4) }}
        render={({ field }) => <TextField {...field} label="Name" />}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};
