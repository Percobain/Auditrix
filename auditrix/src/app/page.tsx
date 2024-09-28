'use client';

import { useState } from "react";
import Header from "../../components/header";
import CustomCodeEditor from "../../components/contract-input";
import ResultsModal from "../../components/results-modal";
import { analyzeContract } from "../../utils/ai-prompts";

export default function Home() {

  const [contract, setContract] = useState('');
  const [results, setResults] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    console.log('call')
    setIsModalOpen(true);
    setLoading(true);
    await analyzeContract(contract, setResults, setLoading, setIsModalOpen);
  }

  return <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
      <Header />
      <CustomCodeEditor 
        analyze={analyze} 
        contract={contract} 
        setContract={setContract}
      />
      <ResultsModal
        closeModal={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        results={results}
        loading={loading}
      />
  </main>
}
