import { ethers, formatUnits } from "ethers";
import { swearITContract } from "../../../utils/connection";


export const getAProductMilestoneByID = async (contractAddress: string, data: any) => {
  const { milestoneId } = data
  try {
    let res = await swearITContract(contractAddress, false).getMilestoneById(milestoneId);
   
    const milestone = {
      productId: formatUnits(res[0], 0),
      milestoneId: formatUnits(res[1], 0),
      milestoneName: res[2],
      createdAt: ethers.decodeBytes32String(res[3]),
      userId: formatUnits(res[4], 0),
      completed: res[5],
      proofCount: formatUnits(res[6], 0),

    }
    return { statusCode: 200, data: milestone };
  } catch (error: any) {
    return { statusCode: 400, error: error.reason };
  }
};