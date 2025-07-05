'use server';
/**
 * @fileOverview Analyzes a bill/receipt from an image and estimates its carbon footprint.
 *
 * - analyzeBill - A function that analyzes a bill image.
 * - AnalyzeBillInput - The input type for the analyzeBill function.
 * - AnalyzeBillOutput - The return type for the analyzeBill function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeBillInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a bill or receipt, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeBillInput = z.infer<typeof AnalyzeBillInputSchema>;

const AnalyzeBillOutputSchema = z.object({
  vendorName: z.string().describe('The name of the vendor or store from the bill.'),
  items: z.array(z.object({
    name: z.string().describe('The name of the purchased item.'),
    quantity: z.number().describe('The quantity of the item purchased.'),
  })).describe('A list of items extracted from the bill.'),
  totalAmount: z.number().describe('The total amount of the transaction in INR.'),
  carbonFootprintKg: z
    .number()
    .describe('The estimated total carbon footprint of the transaction in kilograms of CO2.'),
  breakdown: z.string().describe('A detailed breakdown of how the carbon footprint was estimated for the entire bill.'),
  comparisonRanking: z
    .string()
    .describe('How the entire transaction compares to similar purchases in terms of carbon footprint.'),
});
export type AnalyzeBillOutput = z.infer<typeof AnalyzeBillOutputSchema>;

export async function analyzeBill(input: AnalyzeBillInput): Promise<AnalyzeBillOutput> {
  return analyzeBillFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeBillPrompt',
  input: {schema: AnalyzeBillInputSchema},
  output: {schema: AnalyzeBillOutputSchema},
  prompt: `You are an AI assistant that analyzes receipts and estimates the carbon footprint of the entire purchase. You are an expert in the Indian context.

  Given the following image of a receipt, perform the following tasks:
  1. Extract the vendor's name.
  2. Identify all items purchased and their quantities. Do not extract prices.
  3. Extract the total transaction amount in INR.
  4. Estimate the total carbon footprint for all items on the receipt in kilograms of CO2.
  5. Provide a breakdown of how you arrived at the total estimate.
  6. Provide a comparison ranking for the entire purchase against similar types of purchases (e.g., "Higher than average for a grocery bill").

  Image of the bill: {{media url=photoDataUri}}

  Ensure that the carbonFootprintKg and totalAmount are numbers.
  `,
});

const analyzeBillFlow = ai.defineFlow(
  {
    name: 'analyzeBillFlow',
    inputSchema: AnalyzeBillInputSchema,
    outputSchema: AnalyzeBillOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
