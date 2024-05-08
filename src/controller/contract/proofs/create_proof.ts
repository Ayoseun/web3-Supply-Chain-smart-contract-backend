import { ethers, formatUnits } from "ethers";

import { swearITContract } from "../../../utils/connection";


export const createAProductMilestoneProof = async (contractAddress: string, data: any) => {

  try {


    let proofSigner = await swearITContract(contractAddress, true);
    const createdAtbyte32 = ethers.encodeBytes32String(data["createdAt"])

    await proofSigner.createProof(data["proofId"], data["milestoneId"], data["proofName"], data["organizationId"], JSON.stringify(data["evidences"]), JSON.stringify(data["conditions"]), createdAtbyte32, data["userId"]);

    // Create a Promise to wait for the "ContractCreated" event
    const proofCreatedPromise = new Promise<{ proofId: any, milestoneId: any, proofName: any, organizationId: any, evidences: any, conditions: any, createdAt: any, userId: any }>((resolve, reject) => {
      const listener = async (proofId: any, milestoneId: any, proofName: any, organizationId: any, evidences: any, conditions: any, createdAt: any, userId: any, event: any) => {

        resolve({ proofId, milestoneId, proofName, organizationId, evidences, conditions, createdAt, userId }); // Resolve the Promise with both name and address
        event.removeListener();
      };

      swearITContract(contractAddress, false).on("ProofCreated", listener);
    });


    // Wait for the Promise to be resolved (i.e., the "ContractCreated" event to be emitted)
    const { proofId, milestoneId, proofName, organizationId, evidences, conditions, createdAt, userId } = await proofCreatedPromise;
    const createdAtString = ethers.decodeBytes32String(createdAt)

    const proof = {
      proofId: formatUnits(proofId, 0),
      milestoneId: formatUnits(milestoneId, 0),
      organizationId:formatUnits( organizationId,0),
      proofName: proofName,
      createdAt: createdAtString,
      userId: formatUnits(userId, 0),
      evidences: JSON.parse(evidences),
      conditions:JSON.parse( conditions)


    }
 
    return { statusCode: 200, data: proof };
  } catch (error: any) {
    // Return an object with statusCode 500 and the error
    return { statusCode: 400, error: error.reason };
  }
};