'use server';
/**
 * @fileOverview Provides AI-powered best practice guidance and contextual tips to teachers
 *               while they are filling out specific fields within NAAC criterion forms.
 *
 * - teacherAIContentGuidance - A function that handles the AI content guidance process.
 * - TeacherAIContentGuidanceInput - The input type for the teacherAIContentGuidance function.
 * - TeacherAIContentGuidanceOutput - The return type for the teacherAIContentGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TeacherAIContentGuidanceInputSchema = z.object({
  criterionId: z
    .string()
    .describe('The unique identifier for the main NAAC criterion (e.g., "Criterion I").'),
  subCriterionId: z
    .string()
    .describe('The unique identifier for the specific sub-criterion (e.g., "1.1.1").'),
  currentContent: z
    .string()
    .describe('The current text content the teacher has entered into the form field.'),
});
export type TeacherAIContentGuidanceInput = z.infer<
  typeof TeacherAIContentGuidanceInputSchema
>;

const TeacherAIContentGuidanceOutputSchema = z.object({
  guidance: z.string().describe('AI-generated best practice guidance and contextual tips.'),
});
export type TeacherAIContentGuidanceOutput = z.infer<
  typeof TeacherAIContentGuidanceOutputSchema
>;

export async function teacherAIContentGuidance(
  input: TeacherAIContentGuidanceInput
): Promise<TeacherAIContentGuidanceOutput> {
  return teacherAIContentGuidanceFlow(input);
}

const teacherAIContentGuidancePrompt = ai.definePrompt({
  name: 'teacherAIContentGuidancePrompt',
  input: {schema: TeacherAIContentGuidanceInputSchema},
  output: {schema: TeacherAIContentGuidanceOutputSchema},
  prompt: `You are an expert on NAAC requirements and best practices for academic documentation. Your goal is to provide helpful, actionable guidance and contextual tips to a teacher who is filling out a specific criterion form.

The teacher is working on:
Criterion ID: {{{criterionId}}}
Sub-Criterion ID: {{{subCriterionId}}}
Current Content being entered:
{{{currentContent}}}

Based on this information, provide best practice guidance and contextual tips to help the teacher ensure their response is accurate and meets NAAC requirements. Focus on what is relevant to the given criterion and sub-criterion. If the current content looks good or is a good start, you can acknowledge that while still offering improvement suggestions or additional considerations. Ensure the guidance is concise and directly applicable.

Respond strictly in JSON format according to the output schema.`,
});

const teacherAIContentGuidanceFlow = ai.defineFlow(
  {
    name: 'teacherAIContentGuidanceFlow',
    inputSchema: TeacherAIContentGuidanceInputSchema,
    outputSchema: TeacherAIContentGuidanceOutputSchema,
  },
  async input => {
    const {output} = await teacherAIContentGuidancePrompt(input);
    if (!output) {
      throw new Error('AI did not return any guidance.');
    }
    return output;
  }
);
