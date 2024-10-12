import * as dialogflow from '@google-cloud/dialogflow';

export interface IntentRequest {
    projectId: string;
    displayName: string;
    trainingPhrasesParts: string[];
    messageTexts: string[];
}

export interface IntentResponse {
    name: string | null | undefined;
    displayName: string | null | undefined;
    webhookState: 'WEBHOOK_STATE_UNSPECIFIED' | 'WEBHOOK_STATE_ENABLED' | 'WEBHOOK_STATE_ENABLED_FOR_SLOT_FILLING' | dialogflow.protos.google.cloud.dialogflow.v2.Intent.WebhookState | null | undefined;
    messages: dialogflow.protos.google.cloud.dialogflow.v2.Intent.IMessage[] | null | undefined;
    action: string | null | undefined;
}

