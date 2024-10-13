interface Action {
  type: string;
  params: any;
  nextAction?: Action;
}

interface DecisionNode {
  type: "condition" | "action" | "loop";
  expression?: string;
  trueAction?: Action;
  falseAction?: Action;
  action?: Action;
  loopNode?: DecisionNode;
  iterations?: number;
}

export class DecisionTree {
  private root: DecisionNode;

  constructor(root: DecisionNode) {
    this.root = root;
  }

  serialize(): string {
    return JSON.stringify(this.root);
  }

  static deserialize(json: string | DecisionNode): DecisionTree {
    const root: DecisionNode =
      typeof json === "string" ? JSON.parse(json) : json;
    return new DecisionTree(root);
  }

  async execute(): Promise<void> {
    console.log("Executing Decision Tree...");
    await this.executeNode(this.root);
  }

  private async executeNode(node: DecisionNode): Promise<void> {
    switch (node.type) {
      case "condition": {
        const conditionMet: boolean = this.evaluateCondition(
          node.expression || ""
        );
        console.log(`Evaluating condition: ${conditionMet}`);
        if (conditionMet && node.trueAction) {
          console.log("Condition met, executing trueAction...");
          await this.performAction(node.trueAction);
        } else if (!conditionMet && node.falseAction) {
          console.log("Condition not met, executing falseAction...");
          await this.performAction(node.falseAction);
        }
        break;
      }
      case "action": {
        console.log(`Executing action...`);
        if (node.action) {
          await this.performAction(node.action);
        }
        break;
      }
      case "loop": {
        console.log(`Starting loop, iterations: ${node.iterations}`);
        if (node.iterations && node.loopNode) {
          for (let i = 0; i < node.iterations; i++) {
            console.log(`Iteration ${i + 1} of ${node.iterations}`);
            await this.executeNode(node.loopNode);
          }
        }
        break;
      }
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  }

  private evaluateCondition(expression: string): boolean {
    try {
      const result = eval(expression);
      return result;
    } catch (error) {
      console.error(`Error evaluating condition: ${expression}`, error);
      return false;
    }
  }

  private async performAction(action: Action): Promise<void> {
    if (!action) {
      console.log(`No action defined.`);
      return;
    }

    switch (action.type) {
      case "send_sms":
        console.log(`Sending SMS to: ${action.params.phoneNumber}`);
        break;
      case "send_email":
        console.log(
          `Sending Email from: ${action.params.sender} to: ${action.params.receiver}`
        );
        break;
      default:
        console.log(`Unknown action type: ${action.type}`);
    }

    if (action.nextAction) {
      await this.performAction(action.nextAction);
    }
  }
}
