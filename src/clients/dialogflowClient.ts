import * as dialogflow from '@google-cloud/dialogflow';

class DialogflowClient {
    private static instance: dialogflow.IntentsClient;
    private static serviceAccountPath: string;

    private constructor() { }

    public static initialize(serviceAccountPath: string): void {
        if (!serviceAccountPath) {
            throw new Error('Service Account Path is required to initialized DialogflowClient');
        }
        if (!DialogflowClient.instance) {
            DialogflowClient.serviceAccountPath = serviceAccountPath;
            DialogflowClient.instance = new dialogflow.IntentsClient({
                keyFilename: serviceAccountPath,
            });
        }
    }

    public static getInstance(): dialogflow.IntentsClient {
        if (!DialogflowClient.instance) {
            throw new Error('DialogflowClient is not initialized. Call initialize() first.');
        }
        return DialogflowClient.instance;
    }
}

export default DialogflowClient;
