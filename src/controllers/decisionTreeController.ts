import { Request, Response } from "express";
import { DecisionTree } from "../models/decisionTreeModel";

export const executeDecisionTree = async (req: Request, res: Response) => {
  try {
    const { decisionTreeJson } = req.body;

    const decisionTree = new DecisionTree(decisionTreeJson);
    await decisionTree.execute();
    res.status(200).send("Decision tree executed successfully.");
  } catch (error) {
    console.error("Error executing decision tree:", error);

    res.status(500).send({
      message: "Error executing decision tree",
      error: (error as Error).message || error,
    });
  }
};
