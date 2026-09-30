import { Divider } from "@/components/og/divider";
import type { ControlConfig } from "@/registry/lib/customizer-config";

export const dividerDemoConfig: ControlConfig = {
  color: { default: "#a78bfa", label: "Color", type: "color" },
  label: { default: "New collection", label: "Label", type: "text" },
  variant: {
    default: "dashed",
    label: "Variant",
    options: ["solid", "dashed"],
    type: "select",
  },
};

export const DividerDemo = ({
  color,
  label,
  variant,
}: {
  color: string;
  label: string;
  variant: "solid" | "dashed";
}) => (
  <div
    style={{
      alignItems: "center",
      backgroundColor: "#09090b",
      display: "flex",
      flexDirection: "column",
      gap: "64px",
      height: "100%",
      justifyContent: "center",
      padding: "80px",
      width: "100%",
    }}
  >
    <Divider color={color} variant={variant} />
    <Divider color={color} label={label} thickness={2} variant={variant} />
  </div>
);
