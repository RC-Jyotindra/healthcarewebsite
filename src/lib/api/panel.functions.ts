import { createServerFn } from "@tanstack/react-start";
import process from "node:process";
import { waitlistSchema, type WaitlistInput, type PanelSchemaResponse, type PanelField } from "./panel.schema";

export const getPanelSchema = createServerFn({ method: "GET" })
  .validator((data: { panelId?: string } | undefined) => data)
  .handler(async ({ data }): Promise<PanelSchemaResponse> => {
    try {
      const panelId = data?.panelId || "caddee1a-877e-4fa2-92c0-ecda289116be";
      const apiKey = process.env.PANEL_API_KEY || "pmm_79c1f781_zxGuOqI7HVKHgJHhaeg5tDJEc3HL2uxu";

      const response = await fetch(
        `https://surveybuilder.io/api/pmm/ingest/${panelId}/schema`,
        {
          headers: {
            "X-Panel-Api-Key": apiKey.trim(),
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch schema: ${errorText}`);
      }

      const jsonSchema = await response.json();
      const fields: PanelField[] = [];
      const customProps = jsonSchema.properties?.properties?.properties || {};
      const requiredCustomProps = jsonSchema.properties?.properties?.required || [];

      for (const [key, fieldDef] of Object.entries<any>(customProps)) {
        let type: "TEXT" | "NUMBER" | "DATE" | "SINGLE_SELECT" | "MULTI_SELECT" | "TRUE_FALSE" | "EMAIL" = "TEXT";
        if (fieldDef.enum) {
          type = "SINGLE_SELECT";
        } else if (fieldDef.format === "date") {
          type = "DATE";
        } else if (fieldDef.type === "number") {
          type = "NUMBER";
        }

        fields.push({
          key,
          label: fieldDef.title || key,
          type,
          required: requiredCustomProps.includes(key),
          options: fieldDef.enum,
          stepIndex: typeof fieldDef.stepIndex === 'number' ? fieldDef.stepIndex : 0,
        });
      }

      return { fields };
    } catch (error: any) {
      console.error("Error in getPanelSchema:", error);
      return { fields: [] };
    }
  });

export const submitWaitlistForm = createServerFn({ method: "POST" })
  .validator((data: { panelId?: string; formData?: WaitlistInput } & Partial<WaitlistInput>) => {
    if (data.formData) {
      const parsedData = waitlistSchema.parse(data.formData);
      return { panelId: data.panelId, formData: parsedData };
    }
    const parsedData = waitlistSchema.parse(data);
    return { panelId: data.panelId, formData: parsedData };
  })
  .handler(async ({ data }) => {
    try {
      const panelId = data.panelId || "caddee1a-877e-4fa2-92c0-ecda289116be";
      const apiKey = process.env.PANEL_API_KEY || "pmm_79c1f781_zxGuOqI7HVKHgJHhaeg5tDJEc3HL2uxu";

      const payload = {
        firstName: data.formData.firstName,
        lastName: data.formData.lastName,
        email: data.formData.email,
        phone: data.formData.phone,
        password: data.formData.password,
        properties: data.formData.properties || {},
      };

      const response = await fetch(
        `https://surveybuilder.io/api/pmm/ingest/${panelId}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Panel-Api-Key": apiKey.trim(),
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        return { success: false, error: `Failed to submit waitlist form: ${errorText}` };
      }

      return { success: true };
    } catch (error: any) {
      console.error("Waitlist submission error:", error);
      return { success: false, error: error.message || "Failed to submit form" };
    }
  });
