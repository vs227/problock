import { ethers } from "ethers";
import addresses from "../contracts/addresses.json";
import PropertyToken from "../contracts/PropertyToken.json";
import DividendDistributor from "../contracts/DividendDistributor.json";
import PrimarySale from "../contracts/PrimarySale.json";

export function getContracts(providerOrSigner) {
  if (!providerOrSigner) throw new Error("No provider/signer found");

  const token = new ethers.Contract(
    addresses.PropertyToken,
    PropertyToken.abi,
    providerOrSigner
  );

  const distributor = new ethers.Contract(
    addresses.DividendDistributor,
    DividendDistributor.abi,
    providerOrSigner
  );

  const sale = new ethers.Contract(
    addresses.PrimarySale,
    PrimarySale.abi,
    providerOrSigner
  );

  return { token, distributor, sale, addresses };
}
