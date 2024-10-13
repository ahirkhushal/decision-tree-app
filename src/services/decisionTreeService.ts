import { DecisionTree } from "../models/decisionTreeModel";

export class DecisionTreeService {
  static deserialize(json: string): DecisionTree {
    return DecisionTree.deserialize(json);
  }
}
