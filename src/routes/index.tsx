import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/src/components/ui/Button";
import { TextField } from "@/src/components/ui/TextField";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>

      <div className="grid grid-cols-2 gap-4 container max-w-screen-sm mx-auto">
        <div>
          <TextField label="Email"/>
        </div>
        <div>
          <TextField label="Name" />
        </div>
        <div>
          <TextField label="Password" />
        </div>
        <div>
          <TextField label="Confirm Password" />
        </div>
        <Button className="col-span-2">Test Button</Button>
      </div>
    </div>
  );
}
