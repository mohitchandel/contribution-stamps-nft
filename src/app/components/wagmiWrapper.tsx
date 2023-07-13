import { polygonMumbai } from "wagmi/chains";
import { WagmiConfig, createConfig } from "wagmi";
import { createPublicClient, http } from "viem";

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: polygonMumbai,
    transport: http(),
  }),
});

export default function WagmiWrapper({
  children,
}: {
  children: React.ReactElement;
}) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
