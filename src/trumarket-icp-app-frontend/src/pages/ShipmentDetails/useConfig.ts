import { useEffect, useState } from 'react';

interface Config {
  evmChainId: string;
  blockchainExplorer: string;
  investmentTokenAddress: string;
  investmentTokenSymbol: string;
  investmentTokenDecimals: string;
  dealsManagerAddress: string;
}

export const useConfig = () => {
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    const storedConfig = localStorage.getItem('config');
    if (storedConfig) {
      setConfig(JSON.parse(storedConfig));
    } else {
      fetch(`${process.env.CANISTER_API_URL}/config`)
        .then((res) => res.json())
        .then((data) => {
          setConfig(data);
          localStorage.setItem('config', JSON.stringify(data));
        });
    }
  }, []);

  return config;
};
