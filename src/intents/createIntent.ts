import DialogflowClient from '../clients/dialogflowClient';
import { IntentRequest, IntentResponse } from '../interfaces/intentInterface';
import * as dialogflow from '@google-cloud/dialogflow';

export async function createIntent(request: IntentRequest): Promise<IntentResponse> {
    const client = DialogflowClient.getInstance();
    const agentPath = client.projectAgentPath(request.projectId);

    const trainingPhrases: dialogflow.protos.google.cloud.dialogflow.v2.Intent.ITrainingPhrase[] = request.trainingPhrasesParts.map(phrase => ({
        type: dialogflow.protos.google.cloud.dialogflow.v2.Intent.TrainingPhrase.Type.EXAMPLE,
        parts: [{ text: phrase }],
    }));

    const message: dialogflow.protos.google.cloud.dialogflow.v2.Intent.IMessage = {
        text: { text: request.messageTexts },
    };

    const intent = {
        displayName: request.displayName,
        trainingPhrases: trainingPhrases,
        messages: [message],
    };

    const apiRequest: dialogflow.protos.google.cloud.dialogflow.v2.ICreateIntentRequest = {
        parent: agentPath,
        intent: intent,
    };

    try {
        const [response] = await client.createIntent(apiRequest);
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
        throw new Error(`Failed to create Intent. Error: ${JSON.stringify(error)}`);
    }

}
