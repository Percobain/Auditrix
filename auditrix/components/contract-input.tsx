import React from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-solidity";
import "prismjs/themes/prism-tomorrow.css";
import { IconChecklist, IconPaperclip } from "@tabler/icons-react";
import { ShootingStars } from "./ui/shooting-stars";

interface CustomCodeEditorProps {
    contract: string;
    setContract: React.Dispatch<React.SetStateAction<string>>;
    analyze: () => Promise<void>;
}

const highlightWithPrism = (code: string) => {
    return Prism.highlight(code, Prism.languages.solidity, "solidity");
};

const isValidSolidity = (code: string) => {
const SPDXRegex = /\/\/\s*SPDX-License-Identifier:\s*[^\s]+/;
const pragmaRegex = /pragma\s+solidity\s+[^;]+;/;

    return SPDXRegex.test(code) && pragmaRegex.test(code);
};

const CustomCodeEditor: React.FC<CustomCodeEditorProps> = ({
    contract,
    setContract,
    analyze,
    }) => {
    const handleAnalyze = async () => {
        if (!isValidSolidity(contract)) {
        alert("Invalid Solidity Contract");
        return;
        }
        analyze();
    };

    const handleClear = () => {
        setContract("");
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto mb-20">
        <style>
            {`
            .editor-scrollbar::-webkit-scrollbar {
                width: 12px;
            }
            .editor-scrollbar::-webkit-scrollbar-track {
                background: #2d3748;
            }
            .editor-scrollbar::-webkit-scrollbar-thumb {
                background-color: #4a5568;
                border-radius: 6px;
                border: 3px solid #2d3748;
            }
            .editor-scrollbar::-webkit-scrollbar-thumb:hover {
                background-color: #718096;
            }
        `}
        </style>
        <div
            className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-900 text-neutral-200"
            style={{ height: "650px" }}
        >
            <div className="h-full overflow-auto p-4 editor-scrollbar">
            <Editor
                value={contract}
                onValueChange={(code) => setContract(code)}
                highlight={(code) => highlightWithPrism(code)}
                padding={15}
                textareaId="code-editor"
                textareaClassName="outline-none bg-transparent"
                style={{
                fontFamily: '"Fira Mono", monospace',
                fontSize: 16,
                minHeight: "100%",
                color: "inherit",
                }}
            />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-neutral-900 border-t border-neutral-800">
            <div className="flex justify-between items-center">
                <button
                type="button"
                className="text-neutral-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
                aria-label="Attach File"
                >
                <IconPaperclip size={20} />
                </button>
                <div className="flex space-x-2">
                {/* <button
                    onClick={handleClear}
                    type="button"
                    className="text-neutral-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md p-2"
                    aria-label="Clear Editor"
                >
                    <IconX size={20} />
                </button> */}
                <button
                    onClick={handleAnalyze}
                    type="button"
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <span>Audit</span>
                    <IconChecklist size={20} />
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default CustomCodeEditor;
