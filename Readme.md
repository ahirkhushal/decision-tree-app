# Decision Tree Processing Backend

## Overview

This project is a decision tree processing backend implemented in TypeScript. The decision tree allows users to define business logic that can be serialized into JSON, deserialized from JSON, and executed. The system currently supports actions such as sending SMS, sending emails, evaluating conditions, and running loops.

## Features

- **Serialization Support**: Convert a decision tree into JSON and back to a `DecisionTree` object.
- **Supported Actions**:
  - **Send SMS**: Send SMS messages by providing a phone number.
  - **Send Email**: Send emails by specifying sender and receiver email addresses.
  - **Condition**: Evaluate a JavaScript expression and execute `trueAction` or `falseAction`.
  - **Loop**: Execute a subtree for a specified number of iterations.
- **Extensibility**: New action types can be easily added to the decision tree.

## API Endpoints

### POST /api/decision-tree

This endpoint accepts a JSON representation of a decision tree, deserializes it, and executes it.

#### Request

- **URL**: `http://localhost:3000/api/decision-tree`
- **Method**: POST
- **Headers**:
  - `Content-Type: application/json`

#### Example Payloads and Outputs

1. **Loop with Condition**

   **Payload**:

```json
{
  "decisionTreeJson": {
    "type": "loop",
    "iterations": 10,
    "loopNode": {
      "type": "condition",
      "expression": "true",
      "trueAction": {
        "type": "send_sms",
        "params": {
          "phoneNumber": "1234567890"
        }
      },
      "falseAction": {
        "type": "action",
        "action": null
      }
    }
  }
}
```

**Output (Postman):**:

```bash
Decision tree executed successfully.
```

**Log in Terminal:**

```bash
Executing Decision Tree...
Starting loop, iterations: 10
Iteration 1 of 10
Evaluating condition: true
Condition met, executing trueAction...
Sending SMS to: 1234567890
Iteration 2 of 10
Evaluating condition: true
Condition met, executing trueAction...
Sending SMS to: 1234567890
Iteration 3 of 10
Evaluating condition: true
Condition met, executing trueAction...
Sending SMS to: 1234567890
Iteration 4 of 10
Evaluating condition: true
Condition met, executing trueAction...
Sending SMS to: 1234567890
Iteration 5 of 10
Evaluating condition: true
Condition met, executing trueAction...
Sending SMS to: 1234567890
Iteration 6 of 10
Evaluating condition: true
Condition met, executing trueAction...
Sending SMS to: 1234567890
Iteration 7 of 10
Evaluating condition: true
Condition met, executing trueAction...
Sending SMS to: 1234567890
Iteration 8 of 10
Evaluating condition: true
Condition met, executing trueAction...
Sending SMS to: 1234567890
Iteration 9 of 10
Evaluating condition: true
Condition met, executing trueAction...
Sending SMS to: 1234567890
Iteration 10 of 10
Evaluating condition: true
Condition met, executing trueAction...
Sending SMS to: 1234567890
```

2. **Send Email and SMS Sequentially**

   **Payload**:

```json
{
  "decisionTreeJson": {
    "type": "action",
    "action": {
      "type": "send_email",
      "params": {
        "sender": "no-reply@example.com",
        "receiver": "user@example.com"
      }
    },
    "nextAction": {
      "type": "send_sms",
      "params": {
        "phoneNumber": "1234567890"
      },
      "nextAction": {
        "type": "send_email",
        "params": {
          "sender": "no-reply@example.com",
          "receiver": "user@example.com"
        }
      }
    }
  }
}
```

**Output (Postman):**:

```bash
Decision tree executed successfully.
```

**Log in Terminal:**

```bash
Executing action...
Sending Email from: no-reply@example.com to: user@example.com
```

3. **Condition Based on Date**

   **Payload**:

```json
{
  "decisionTreeJson": {
    "type": "condition",
    "expression": "new Date().getDate() === 1 && new Date().getMonth() === 0",
    "trueAction": {
      "type": "send_sms",
      "params": {
        "phoneNumber": "1234567890"
      }
    },
    "falseAction": null
  }
}
```

**Output (Postman):**:

```bash
Decision tree executed successfully.
```

**Log in Terminal:**

```bash
Executing Decision Tree...
Evaluating condition: false
```

## Installation and Usage

**Clone the repository:**

```bash
git clone <repository-url>
cd decision-tree-app
```

Install dependencies:

```bash
npm install
```

**Run the application:**

```bash
npm run start
```

**Test the API using Postman:**

- **Use the POST request to**: `http://localhost:3000/api/decision-tree`
