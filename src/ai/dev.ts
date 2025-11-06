/**
 * @fileoverview This file is the entrypoint for the Genkit developer UI.
 *
 * This file is not used in production.
 **/

import {dev} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import './flows/chat';
import {genkit} from 'genkit';

dev({
  plugins: [googleAI()],
});
