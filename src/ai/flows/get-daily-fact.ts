'use server';
/**
 * @fileOverview Generates a daily eco-friendly fact.
 *
 * - getDailyFact - A function that returns a daily fact.
 * - GetDailyFactOutput - The return type for the getDailyFact function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetDailyFactOutputSchema = z.object({
  fact: z.string().describe('A surprising and interesting fact about sustainability, carbon footprint, or eco-friendly practices, with a focus on an Indian context.'),
});
export type GetDailyFactOutput = z.infer<typeof GetDailyFactOutputSchema>;

export async function getDailyFact(): Promise<GetDailyFactOutput> {
  return getDailyFactFlow();
}

const prompt = ai.definePrompt({
  name: 'getDailyFactPrompt',
  output: {schema: GetDailyFactOutputSchema},
  prompt: `You are an AI assistant that provides users with a daily, surprising, and interesting fact about sustainability, carbon footprint, or eco-friendly practices.

  The fact should be concise and easy to understand for a general audience.
  Whenever possible, try to make the fact relevant to an Indian context.

  For example: "Did you know? Traditional Indian earthen pots, or 'matkas', cool water naturally through evaporation, making them a zero-energy alternative to refrigerators for drinking water!"

  Generate one such fact.
  `,
});

const getDailyFactFlow = ai.defineFlow(
  {
    name: 'getDailyFactFlow',
    outputSchema: GetDailyFactOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
