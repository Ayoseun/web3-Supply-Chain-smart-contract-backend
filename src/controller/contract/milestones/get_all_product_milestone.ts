import { ethers, formatUnits } from "ethers";
import { swearITContract } from "../../../utils/connection";

export const getAllProductMilestone = async (contractAddress: any,data:any) => {
  const { productId } = data
  try {
    const res = await swearITContract(contractAddress, false).getProductMilestones(productId);
    const milestones = res.map((productMilestone: any) => ({
      productId: formatUnits(productMilestone.productId, 0),
      milestoneId: formatUnits(productMilestone.milestoneId, 0),
      milestoneName: productMilestone.milestoneName,
      createdAt: ethers.decodeBytes32String(productMilestone.createdAt),
      userId: formatUnits(productMilestone.userId, 0),
      completed:productMilestone.completed,
      proofCount: formatUnits(productMilestone.proofCount, 0),
    }));
    return { statusCode: 200, data: milestones};
  } catch (error: any) {
    return { statusCode: 400, error: error.reason };
  }
};