import { ethers, formatUnits } from "ethers";
import { swearITContract } from "../../../utils/connection";


export const getAllMilestoneProof = async (contractAddress: string, data: any) => {
  const { milestoneId } = data
  try {
    let res = await swearITContract(contractAddress, false).getAllMilestoneProofsById(milestoneId);
   
    const milestoneProofs = res.map((proof: any) => ({
      proofId: formatUnits(proof.proofId, 0),
      milestoneId: formatUnits(proof.milestoneId, 0),
      proofName: proof.proofName,
      organizationId: formatUnits(proof.organizationId, 0),
      evidences: JSON.parse( proof.evidences),
      conditions:JSON.parse(proof.conditions),
      createdAt: ethers.decodeBytes32String(proof.createdAt),
      userId: formatUnits(proof.userId, 0),
      validationsCount: formatUnits(proof.validationsCount, 0)
    }));
    return { statusCode: 200, data: milestoneProofs };
  } catch (error: any) {
    return { statusCode: 400, error: error.reason };
  }
};