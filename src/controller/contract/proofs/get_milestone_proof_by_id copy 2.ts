import { ethers, formatUnits } from "ethers";
import { swearITContract } from "../../../utils/connection";

//THis function is for getting individual proof
export const getAProductMilestoneProofByID = async (contractAddress: string, data: any) => {
  const { proofId } = data
  try {
    let res = await swearITContract(contractAddress, false).getMilestoneProofById(proofId);
    const milestoneProof = {
      proofId: formatUnits(res[0], 0),
      milestoneId: formatUnits(res[1], 0),
      proofName: res[2],
      organizationId: formatUnits(res[3], 0),
      evidences: JSON.parse( res[4]),
      conditions:JSON.parse(res[5]),
      createdAt: ethers.decodeBytes32String(res[6]),
      userId: formatUnits(res[7], 0),
      validationsCount: formatUnits(res[8], 0)

    }
    return { statusCode: 200, data: milestoneProof };
  } catch (error: any) {
    return { statusCode: 400, error: error.reason };
  }
};