import { ethers, formatUnits } from "ethers";

import { swearITContract } from "../../../utils/connection";


export const validateAProductMilestoneProof = async (contractAddress: string, data: any) => {

  try {


    let validateProofSigner = await swearITContract(contractAddress, true);
    const verifiedAtbyte32 = ethers.encodeBytes32String(data["verifiedAt"])

    await validateProofSigner.validateProof(data["proofId"], data["productId"], data["status"], data["verifierId"], data["verifierName"], verifiedAtbyte32, data["userId"]);

    // Create a Promise to wait for the "ContractCreated" event
    const proofValidatedPromise = new Promise<{
      proofId: any, milestoneId: any,
      productId: any,
      status: any,
      verifierId: any,
      verifierName: any,
      verifiedAt: any,
      userId: any
    }>((resolve, reject) => {
      const listener = async (proofId: any, milestoneId: any,
        productId: any,
        status: any,
        verifierId: any,
        verifierName: any,
        verifiedAt: any,
        userId: any, event: any) => {

        resolve({ proofId, milestoneId, productId, status, verifierId, verifierName, verifiedAt, userId }); // Resolve the Promise with both name and address
        event.removeListener();
      };

      swearITContract(contractAddress, false).on("ProofValidated", listener);
    });


    // Wait for the Promise to be resolved (i.e., the "ContractCreated" event to be emitted)
    const { proofId, milestoneId, productId, status, verifierId, verifierName, verifiedAt, userId } = await proofValidatedPromise;
    const verifiedAtString = ethers.decodeBytes32String(verifiedAt)

    const proofValidated = {
      proofId: formatUnits(proofId, 0),
      milestoneId: formatUnits(milestoneId, 0),
      productId: formatUnits(productId, 0),
      status: status,
      verifierId: formatUnits(verifierId, 0),
      verifierName: verifierName,
      verifiedAt: verifiedAtString,
      userId: formatUnits(userId, 0)
    }

    return { statusCode: 200, data: proofValidated };
  } catch (error: any) {
 
    // Return an object with statusCode 500 and the error
    return { statusCode: 400, error: error.reason };
  }
};