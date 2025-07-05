// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview Provides alternative, lower-carbon options for purchases and trips.
 *
 * - suggestLowerCarbonOptions - A function that suggests lower carbon options.
 * - SuggestLowerCarbonOptionsInput - The input type for the suggestLowerCarbonOptions function.
 * - SuggestLowerCarbonOptionsOutput - The return type for the suggestLowerCarbonOptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestLowerCarbonOptionsInputSchema = z.object({
  itemDescription: z.string().describe('Description of the item or trip for which to suggest alternatives.'),
  carbonFootprint: z.string().describe('The estimated carbon footprint of the item or trip.'),
});

export type SuggestLowerCarbonOptionsInput = z.infer<typeof SuggestLowerCarbonOptionsInputSchema>;

const SuggestLowerCarbonOptionsOutputSchema = z.object({
  alternatives: z.array(z.string()).describe('A list of alternative, lower-carbon options.'),
  reasoning: z.string().describe('The reasoning behind each suggested alternative.'),
});

export type SuggestLowerCarbonOptionsOutput = z.infer<typeof SuggestLowerCarbonOptionsOutputSchema>;

export async function suggestLowerCarbonOptions(input: SuggestLowerCarbonOptionsInput): Promise<SuggestLowerCarbonOptionsOutput> {
  return suggestLowerCarbonOptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestLowerCarbonOptionsPrompt',
  input: {schema: SuggestLowerCarbonOptionsInputSchema},
  output: {schema: SuggestLowerCarbonOptionsOutputSchema},
  prompt: `You are an AI assistant designed to suggest lower-carbon alternatives for purchases and trips, with a focus on an Indian context.

  Given the following item description and its estimated carbon footprint, provide a list of alternative, lower-carbon options and the reasoning behind each suggestion.
  
  If the item is a food item, especially a meat-based dish like chicken or lamb, prioritize suggesting popular Indian vegetarian alternatives (e.g., Paneer Makhani instead of Butter Chicken, or a dal dish). Explain that vegetarian options generally have a much lower carbon footprint.

  Item Description: {{{itemDescription}}}
  Carbon Footprint: {{{carbonFootprint}}}

  Format your output as a JSON object with "alternatives" (an array of strings) and "reasoning" (a string explaining why each alternative is lower carbon).`,
});

const suggestLowerCarbonOptionsFlow = ai.defineFlow(
  {
    name: 'suggestLowerCarbonOptionsFlow',
    inputSchema: SuggestLowerCarbonOptionsInputSchema,
    outputSchema: SuggestLowerCarbonOptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
