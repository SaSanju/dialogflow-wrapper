import { createIntent } from '../../src/intents/createIntent';
import { updateIntent } from '../../src/intents/updateIntent';
import { deleteIntent } from '../../src/intents/deleteIntent';
import DialogflowClient from '../../src/clients/dialogflowClient';

const mockServiceAccountPath = './env.json'; // Mock service account for testing
const projectId = '<PROJECT_ID>'; // Replace with your actual project ID
let createdIntentId: string | undefined;

beforeAll(() => {
    DialogflowClient.initialize(mockServiceAccountPath);
});

describe('Dialogflow Intent E2E Tests', () => {
    test('should create, update, and delete an intent', async () => {
        const intentRequest = {
            projectId,
            displayName: 'E2E Test Intent',
            trainingPhrasesParts: ['Hello', 'Hi'],
            messageTexts: ['Greetings!'],
        };

        // Step 1: Create Intent
        const createdIntent = await createIntent(intentRequest);
        expect(createdIntent).toBeDefined();
        expect(createdIntent?.displayName).toBe(intentRequest.displayName);
        createdIntentId = createdIntent?.name?.split('/').pop(); // Extract the intent ID from the response

        // // Step 2: Update Intent
        const updateRequest = {
            projectId,
            displayName: 'E2E Test Intent Updated',
            trainingPhrasesParts: ['Hello there', 'Hi there'],
            messageTexts: ['Greetings updated!'],
        };

        const updatedIntent = await updateIntent(updateRequest, createdIntentId!);
        expect(updatedIntent).toBeDefined();
        expect(updatedIntent?.displayName).toBe(updateRequest.displayName);

        // Step 3: Delete Intent
        await deleteIntent(projectId, createdIntentId!);
        
       // Step 4: Verify that the intent was deleted
       await expect(deleteIntent(projectId, createdIntentId!)).rejects.toThrow();
    });
});
