'use client';

import { useState } from "react";
import Header from "../../components/header";
import CustomCodeEditor from "../../components/contract-input";

export default function Home() {

  const [contract, setContract] = useState('');
  const [results, setResults] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {}

  return <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
      <Header />
      <CustomCodeEditor analyze={analyze} contract={contract} setContract={setContract}/>
  </main>
}
