import DialogflowClient from '../clients/dialogflowClient';

export async function deleteIntent(projectId: string, intentId: string): Promise<void> {
  const client = DialogflowClient.getInstance();
  
  // Manually constructing the intent path
  const intentPath = `projects/${projectId}/agent/intents/${intentId}`;

  const request = { name: intentPath };
  
  try {
    await client.deleteIntent(request);
  } catch (error) {
    throw new Error(`Unable to delete intent Error: ${JSON.stringify(error)}`);
  }
}
