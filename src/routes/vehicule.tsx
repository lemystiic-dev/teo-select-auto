import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/vehicule")({
  component: VehiculeLayout,
});

function VehiculeLayout() {
  return <Outlet />;
}