import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY!);

export const analyzeContract = async (
    contract: string,
    setResults: (results: any) => void,
    setLoading: (loading: boolean) => void
) => {
    setLoading(true);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Your role and goal is to be an AI Smart Contract Auditor. Your job is to perform an audit on the given smart contract. Here is the smart contract: ${contract}.
    
    Ensure that your response is a valid JSON array. Do not include any additional text before or after the JSON array. 
    Do not use any Markdown formatting (such as **, *, or #) in your response.

    Please provide the results in the following array format for easy front-end display:
    [
      {
        "section": "Audit Report",
        "details": "A detailed audit report of the smart contract, covering security, performance, and any other relevant aspects."
      },
      {
        "section": "Metric Scores",
        "details": [
          {
            "metric": "Security",
            "score": 0-10
          },
          {
            "metric": "Performance",
            "score": 0-10
          },
          {
            "metric": "Other Key Areas",
            "score": 0-10
          },
          {
            "metric": "Gas Efficiency",
            "score": 0-10
          },
          {
            "metric": "Code Quality",
            "score": 0-10
          },
          {
            "metric": "Documentation",
            "score": 0-10
          }
        ]
      },
      {
        "section": "Suggestions for Improvement",
        "details": "Suggestions for improving the smart contract in terms of security, performance, and any other identified weaknesses."
      }
    ]
    
    Thank you.`;

    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const cleanResponse = responseText.replace(/[\*\#\`\_\-\**]/g, ''); // Remove Markdown characters
        const auditResults = JSON.parse(cleanResponse);

        setResults(auditResults);
    } catch (error) {
        console.error("Error analyzing contract:", error);
    } finally {
        setLoading(false);
    }
};

export const fixIssues = async (
    contract: string,
    suggestions: string,
    setContract: (contract: string) => void,
    setLoading: (loading: boolean) => void
) => {
    setLoading(true);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Here is the smart contract with the following issues: ${suggestions}. Please provide a fixed version of the contract:\n\n${contract}`;

    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const cleanResponse = responseText.replace(/[\*\#\`\_\-\**]/g, ''); // Remove Markdown characters

        setContract(cleanResponse);
    } catch (error) {
        console.error("Error fixing contract issues:", error);
    } finally {
        setLoading(false);
    }
};
