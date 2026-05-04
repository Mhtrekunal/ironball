'use server';
/**
 * @fileOverview This file implements a Genkit flow that suggests relevant supporting documents
 * based on the content of a criterion form entry for teachers.
 *
 * - teacherAIDocumentSuggestion - A function that handles the document suggestion process.
 * - TeacherAIDocumentSuggestionInput - The input type for the teacherAIDocumentSuggestion function.
 * - TeacherAIDocumentSuggestionOutput - The return type for the teacherAIDocumentSuggestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TeacherAIDocumentSuggestionInputSchema = z.object({
  formContent: z.string().describe('The current content entered into the criterion form by the teacher.'),
});
export type TeacherAIDocumentSuggestionInput = z.infer<typeof TeacherAIDocumentSuggestionInputSchema>;

const TeacherAIDocumentSuggestionOutputSchema = z.object({
  suggestedDocuments: z.array(z.string()).describe('A list of suggested relevant supporting document types.'),
});
export type TeacherAIDocumentSuggestionOutput = z.infer<typeof TeacherAIDocumentSuggestionOutputSchema>;

export async function teacherAIDocumentSuggestion(input: TeacherAIDocumentSuggestionInput): Promise<TeacherAIDocumentSuggestionOutput> {
  return teacherAIDocumentSuggestionFlow(input);
}

const teacherAIDocumentSuggestionPrompt = ai.definePrompt({
  name: 'teacherAIDocumentSuggestionPrompt',
  input: { schema: TeacherAIDocumentSuggestionInputSchema },
  output: { schema: TeacherAIDocumentSuggestionOutputSchema },
  prompt: `You are an AI assistant specialized in academic accreditation documentation.
Given the content from a NAAC criterion form, suggest a concise list of relevant supporting document types that a teacher might need to upload.
Focus on general categories of documents rather than specific file names.

Form Content: {{{formContent}}}

Suggested Documents:`,
});

const teacherAIDocumentSuggestionFlow = ai.defineFlow(
  {
    name: 'teacherAIDocumentSuggestionFlow',
    inputSchema: TeacherAIDocumentSuggestionInputSchema,
    outputSchema: TeacherAIDocumentSuggestionOutputSchema,
  },
  async (input) => {
    const { output } = await teacherAIDocumentSuggestionPrompt(input);
    return output!;
  }
);
