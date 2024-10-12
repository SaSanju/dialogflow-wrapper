import DialogflowClient from '../clients/dialogflowClient';
import { IntentRequest, IntentResponse } from '../interfaces/intentInterface';
import * as dialogflow from '@google-cloud/dialogflow';

export async function updateIntent(request: IntentRequest, intentId: string): Promise<IntentResponse> {
  const client = DialogflowClient.getInstance();
  const intentPath = `projects/${request.projectId}/agent/intents/${intentId}`;

  const trainingPhrases = request.trainingPhrasesParts.map(phrase => ({
    type: dialogflow.protos.google.cloud.dialogflow.v2.Intent.TrainingPhrase.Type.EXAMPLE, // Ensure type is an enumerated type
    parts: [{ text: phrase }],
  }));

  const message = {
    text: { text: request.messageTexts },
  };

  const intent = {
    name: intentPath,
    displayName: request.displayName,
    trainingPhrases: trainingPhrases,
    messages: [message],
  };

  const apiRequest = { intent };

  try {
    const [response] = await client.updateIntent(apiRequest);
    if (response) {
      return {
        name: response?.name,
        displayName: response?.displayName,
        webhookState: response?.webhookState,
        messages: response?.messages,
        action: response?.action,
      };
    } else {
      throw new Error(`No response found.`);
    }
  } catch (error) {
    throw new Error(`Failed to update Intent. Error: ${JSON.stringify(error)}`);
  }
}
