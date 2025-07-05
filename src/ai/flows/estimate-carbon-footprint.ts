'use server';
/**
 * @fileOverview Estimates the carbon footprint of a transaction based on its description.
 *
 * - estimateCarbonFootprint - A function that estimates the carbon footprint of a transaction.
 * - EstimateCarbonFootprintInput - The input type for the estimateCarbonFootprint function.
 * - EstimateCarbonFootprintOutput - The return type for the estimateCarbonFootprint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateCarbonFootprintInputSchema = z.object({
  transactionDescription: z
    .string()
    .describe('The description of the transaction, including the items purchased, travel details, etc.'),
});
export type EstimateCarbonFootprintInput = z.infer<typeof EstimateCarbonFootprintInputSchema>;

const EstimateCarbonFootprintOutputSchema = z.object({
  carbonFootprintKg: z
    .number()
    .describe('The estimated carbon footprint of the transaction in kilograms of CO2.'),
  breakdown: z.string().describe('A detailed breakdown of how the carbon footprint was estimated.'),
  comparisonRanking: z
    .string()
    .describe('How the transaction compares to similar transactions in terms of carbon footprint.'),
});
export type EstimateCarbonFootprintOutput = z.infer<typeof EstimateCarbonFootprintOutputSchema>;

export async function estimateCarbonFootprint(input: EstimateCarbonFootprintInput): Promise<EstimateCarbonFootprintOutput> {
  return estimateCarbonFootprintFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateCarbonFootprintPrompt',
  input: {schema: EstimateCarbonFootprintInputSchema},
  output: {schema: EstimateCarbonFootprintOutputSchema},
  prompt: `You are an AI assistant that estimates the carbon footprint of transactions.

  Given the following transaction description, estimate its carbon footprint in kilograms of CO2.
  Also, provide a breakdown of how you arrived at the estimate and a comparison ranking to similar transactions.

  Transaction Description: {{{transactionDescription}}}

  Ensure that the carbonFootprintKg is a number.
  `,
});

const estimateCarbonFootprintFlow = ai.defineFlow(
  {
    name: 'estimateCarbonFootprintFlow',
    inputSchema: EstimateCarbonFootprintInputSchema,
    outputSchema: EstimateCarbonFootprintOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
