import { WavyBackground } from "./ui/wavy-bg";
import { IconArrowDown } from "@tabler/icons-react";

const bounceAnimation = `
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-15px);
    }
    60% {
        transform: translateY(-7px);
    }
  }
`;

export default function Header() {
  return (
    <WavyBackground className="flex flex-col justify-center items-center h-screen max-w-4xl mx-auto pb-20">
      <p className="text-4xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
        Auditrix, AI Smart Contract Auditor
      </p>
      <p className="text-base md:text-2xl mt-4 text-white font-normal inter-var text-center">
        Leverage the power of AI to audit your smart contracts
      </p>
      <div className="absolute bottom-8 flex flex-col items-center gap-x-0.5">
        <IconArrowDown className="text-white w-8 h-8 animate-bounce" />
        <p className="text-white text-sm mt-2 animate-bounce">
          Seeyuh!
        </p>
      </div>
      <style jsx>{`
        @media (min-width: 640px) {
          .animate-bounce {
            animation: ${bounceAnimation} 2s ease infinite;
          }
        }
      `}</style>
    </WavyBackground>
  );
}
