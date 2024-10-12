import { createIntent } from '../../src/intents/createIntent';
import DialogflowClient from '../../src/clients/dialogflowClient';
import { IntentRequest } from '../../src/interfaces/intentInterface';

const mockServiceAccountPath = './create-chat-bot-436006-b89d42b40e01.json'; // Mock service account for testing

beforeAll(() => {
  DialogflowClient.initialize(mockServiceAccountPath);
});

test('should create an intent', async () => {
  const request: IntentRequest = {
    projectId: 'create-chat-bot-436006',
    displayName: 'new.order',
    trainingPhrasesParts: ['new order', 'Place new order'],
    messageTexts: ['OK, starting a new order. You can say things like "I want two pizzas and one mango lassi". Make sure to specify a quantity for every food item! Also, we have only the following items on our menu: Pav Bhaji, Chole Bhature, Pizza, Mango Lassi, Masala Dosa, Biryani, Vada Pav, Rava Dosa, and Samosa.',
      'Starting new order. Specify food items and quantities. For example, you can say, "I would like to order two pizzas and one mango lassi. Also, we have only the following items on our menu: Pav Bhaji, Chole Bhature, Pizza, Mango Lassi, Masala Dosa, Biryani, Vada Pav, Rava Dosa, and Samosa.!'],
  };

  const response = await createIntent(request);
  expect(response.displayName).toBe(request.displayName);
});
