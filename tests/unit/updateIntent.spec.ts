import { updateIntent } from '../../src/intents/updateIntent';
import { IntentRequest } from '../../src/interfaces/intentInterface';

test('should update an intent', async () => {
  const request: IntentRequest = {
    projectId: 'your-project-id',
    displayName: 'Updated Intent',
    trainingPhrasesParts: ['Updated phrase'],
    messageTexts: ['Updated response'],
  };

  const intentId = 'your-intent-id';
  const response = await updateIntent(request, intentId);
  expect(response).toBe('Updated Intent');
});
