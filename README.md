# Dialogflow NPM Wrapper

A Node.js wrapper for interacting with the Dialogflow API, allowing you to create, update, and delete intents easily.

## Prerequisites

- Node.js (>=12.x)
- A Dialogflow service account with the required permissions

## Installation

Install the package using npm:

```bash
npm install dialogflow-wrapper
```

## Initialize

```bash
import DialogflowClient from 'dialogflow-wrapper';
const serviceAccountPath = './env.json';

DialogflowClient.initialize(serviceAccountPath);
```
