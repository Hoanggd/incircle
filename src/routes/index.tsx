import { BasicForm } from "@/src/examples/Form/Basic";
import { DependentValidationForm } from "@/src/examples/Form/DependentValidation";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="p-2 space-y-10">
      <DependentValidationForm />
      <BasicForm />
    </div>
  );
}
