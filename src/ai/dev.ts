import { config } from 'dotenv';
config();

import '@/ai/flows/estimate-carbon-footprint.ts';
import '@/ai/flows/suggest-lower-carbon-options.ts';
import '@/ai/flows/analyze-bill.ts';
