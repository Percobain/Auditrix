#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import { analyzeContract } from "./src/ai-prompt.js";
import fs from "fs";
import path from "path";

const program = new Command();

program.name('auditrix').description('A CLI tool for AI-powered smart contract auditing using Gemini').version('1.0.0')

const getApiKey = async () => {
  const { apiKey } = await inquirer.prompt([
    {
      type: "input",
      name: "apiKey",
      message: "Enter your Gemini API key:",
      validate: (input) => input.length > 0 || "API key is required",
    },
  ]);
  return apiKey;
};

program
  .command("check <file>")
  .description("Analyze a smart contract")
  .action(async (file) => {
    try {
      const apiKey = await getApiKey();

      const contractPath = path.resolve(process.cwd(), file);
      console.log(`Checking file at path: ${contractPath}`);

      if (!fs.existsSync(contractPath)) {
        console.error(`File not found: ${contractPath}`);
        process.exit(1);
      }

      if (fs.statSync(contractPath).isDirectory()) {
        console.error(`Path is a directory, not a file: ${contractPath}`);
        process.exit(1);
      }

      const contract = fs.readFileSync(contractPath, "utf8");
      await analyzeContract(contract, apiKey);
    } catch (error) {
      console.error("Error during analysis:", error.message);
    }
  });

program.parse(process.argv);