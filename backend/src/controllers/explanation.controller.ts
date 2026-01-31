import { Request, Response } from 'express';
import { GeminiService } from '../services/gemini.service';
import { ExplainSchema } from '@explain-my-mess/common';

const geminiService = new GeminiService();

export class ExplanationController {
    static async explain(req: Request, res: Response) {
        try {
            // If checking multipart/form-data, req.body might contain text fields
            // and req.file might contain the image.

            const text = req.body.text;
            const file = req.file;

            // Basic validation using Zod for the text part
            // Note: Zod schema might need adjustment if we validate strict objects, 
            // but here we just check the text field manually or construct an object to validate.
            const validationResult = ExplainSchema.safeParse({
                text: text,
                // We fake the image content for validation if schema expects it, 
                // but really we care about the file buffer.
                image: file ? "present" : undefined
            });

            if (!text) {
                return res.status(400).json({ error: 'Text prompt is required' });
            }

            let imageInput = undefined;
            if (file) {
                // Convert buffer to base64
                const base64Image = file.buffer.toString('base64');
                imageInput = {
                    mimeType: file.mimetype,
                    data: base64Image
                };
            }

            const explanation = await geminiService.analyze(text, imageInput);

            res.json({
                explanation,
                suggestions: [] // Placeholder for future enhancements
            });

        } catch (error) {
            console.error('Explanation error:', error);
            res.status(500).json({ error: 'Failed to generate explanation' });
        }
    }
}
