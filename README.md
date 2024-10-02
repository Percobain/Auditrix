# Auditrix - AI Smart Contract Auditor

**Auditrix** is an AI-powered tool designed to audit and optimize your Web3 smart contracts by providing detailed insights on security, performance, gas efficiency, and more! This tool leverages the Gemini AI API to analyze Solidity code and offers valuable suggestions to improve your smart contract development.

## 🚀 Features

- 🛡 **Smart Contract Auditing**: Get a comprehensive audit covering key aspects like security, performance, gas efficiency, and code quality.
- 📊 **Metric-Based Analysis**: Receive scores (0-10) for various metrics such as security, performance, documentation, and gas optimization.
- 💡 **Improvement Suggestions**: Get AI-generated recommendations for improving your contract in critical areas.
- 🖥 **CLI Tool**: Use the `auditrix-cli` to analyze contracts directly from the command line.

## 🌐 Live Web App

Check out the live web version of **Auditrix**: [Auditrix Web App](https://auditrix-five.vercel.app)

## 📦 CLI Tool on NPM

**Auditrix** also comes as a CLI tool! Check out the NPM package to audit your smart contracts right from your terminal:

[NPM: auditrix-cli](https://www.npmjs.com/package/auditrix-cli)

## 🛠 Tech Stack

- **Next.js**
- **TypeScript**
- **Gemini API**
- **Inquirer.js**
- **Commander.js**

## 💻 Installation and Usage

### For the CLI Tool:

1. Install the CLI tool globally via npm:
    ```bash
   npm install -g auditrix-cli
    ```

2. Run an audit on a smart contract:
    ```bash
    auditrix check <path-to-your-contract>
    ```
