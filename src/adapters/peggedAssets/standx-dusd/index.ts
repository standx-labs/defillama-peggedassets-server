import { addChainExports } from "../helper/getSupply";
import { ChainContracts, PeggedIssuanceAdapter } from "../peggedAsset.type";

// Native DUSD issuance points, keyed by DefiLlama chain id.
//
// `issued` is intentionally handled by the shared `addChainExports` helper
// instead of a local implementation:
//   * on EVM chains it batches `erc20:totalSupply` and `erc20:decimals`, so the
//     on-chain decimals are always used rather than a hardcoded assumption;
//   * on Solana it reads the SPL mint supply, which is already decimal-adjusted;
//   * in both cases the amount is attributed to native issuance ("issued"),
//     not to a bridge lookup. The previous implementation routed the Solana
//     mint through `solanaMintedOrBridged`, which resolves the mint address
//     against the bridge registry in src/peggedData/bridgeData.ts. That mint is
//     not registered as a bridge, so the supply was filed under a "not-found"
//     bridge in the chain breakdown.
const chainContracts: ChainContracts = {
  solana: {
    issued: ["DUSDt4AeLZHWYmcXnVGYdgAzjtzU5mXUVnTMdnSzAttM"],
  },
  bsc: {
    issued: ["0xaf44A1E76F56eE12ADBB7ba8acD3CbD474888122"],
  },
};

const adapter: PeggedIssuanceAdapter = addChainExports(chainContracts);

export default adapter;
