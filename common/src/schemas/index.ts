import { z } from 'zod';

export const ExampleSchema = z.object({
    id: z.string(),
});

export const ExplainSchema = z.object({
    text: z.string().min(1, "Text is required"),
    // Image handling might vary (e.g., separate file upload), so we can make this optional or string for now
    image: z.string().optional(),
    mimeType: z.string().optional(),
});
