import { ethers, formatUnits } from "ethers";
import { swearITContract } from "../../../utils/connection";

export const getAllMilestoneProofValidation = async (contractAddress: string, data: any) => {
  const { proofId } = data
  try {
    let res = await swearITContract(contractAddress, false).getProofValidationsByProofId(proofId);
   
    const milestoneProofs = res.map((proof: any) => ({
      proofId: formatUnits(proof.proofId, 0),
      milestoneId: formatUnits(proof.milestoneId, 0),
      productId: formatUnits(proof.productId, 0),
      status: proof.status,
      verifierId: formatUnits(proof.verifierId, 0),
      verifierName:proof. verifierName,
      verifiedAt: ethers.decodeBytes32String(proof.verifiedAt),
      userId: formatUnits(proof.userId, 0),
     
    }));
  
    return { statusCode: 200, data: milestoneProofs };
  } catch (error: any) {
    return { statusCode: 400, error: error.reason };
  }
};