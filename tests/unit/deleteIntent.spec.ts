import { deleteIntent } from '../../src/intents/deleteIntent';

test('should delete an intent', async () => {
  const projectId = 'your-project-id';
  const intentId = 'your-intent-id';

  await deleteIntent(projectId, intentId);
});
