import { createServerFn } from "@tanstack/react-start";
import process from "node:process";
import { waitlistSchema, type WaitlistInput, type PanelSchemaResponse, type PanelField } from "./panel.schema";

export const getPanelSchema = createServerFn({ method: "GET" })
  .validator((data: { panelId?: string } | undefined) => data)
  .handler(async ({ data }): Promise<PanelSchemaResponse> => {
    try {
      const panelId = data?.panelId || "caddee1a-877e-4fa2-92c0-ecda289116be";
      const apiKey = process.env.PANEL_API_KEY || "pmm_fcb6cafe_S7s5AMV2ovdNZQY6eKNeR7068s2lorMe";

      console.log(`[getPanelSchema] Fetching schema for panelId: ${panelId} with key prefix: ${apiKey.substring(0, 10)}...`);

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
        console.error(`[getPanelSchema] API Error response (${response.status}):`, errorText);
        throw new Error(`Failed to fetch schema (${response.status}): ${errorText}`);
      }

      const jsonSchema = await response.json();
      console.log("[getPanelSchema] Received schema json:", JSON.stringify(jsonSchema));

      const fields: PanelField[] = [];
      const customProps =
        jsonSchema.properties?.properties?.properties ||
        jsonSchema.properties?.properties ||
        jsonSchema.properties ||
        {};
      const requiredCustomProps =
        jsonSchema.properties?.properties?.required ||
        jsonSchema.properties?.required ||
        jsonSchema.required ||
        [];

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
          required: Array.isArray(requiredCustomProps) && requiredCustomProps.includes(key),
          options: fieldDef.enum,
          stepIndex: typeof fieldDef.stepIndex === 'number' ? fieldDef.stepIndex : 0,
        });
      }

      return { fields };
    } catch (error: any) {
      console.error("[getPanelSchema] Failed with error:", error);
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
      const apiKey = process.env.PANEL_API_KEY || "pmm_fcb6cafe_S7s5AMV2ovdNZQY6eKNeR7068s2lorMe";

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
