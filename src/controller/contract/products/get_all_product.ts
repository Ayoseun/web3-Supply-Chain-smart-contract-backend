import { ethers, formatUnits } from "ethers";
import { swearITContract } from "../../../utils/connection";

export const getAllProducts = async (contractAddress: any) => {

  try {
    const res = await swearITContract(contractAddress, false).getAllProducts();
    const products = res.map((product: any) => ({
      id: formatUnits(product.productId, 0),
      productName: product.productName,
      createdAt:ethers.decodeBytes32String( product.createdAt),
      organizationId: formatUnits(product.organizationId, 0),
      organizationName: product.organizationName,
      productUrl: product.productUrl,
      milestoneCount: formatUnits(product.milestoneCount, 0),
      proofCount: formatUnits(product.proofCount, 0),
      validatedProofsCount: formatUnits(product.validatedProofsCount, 0),
    }));
    return { statusCode: 200, data: products };
  } catch (error: any) {
    return { statusCode: 400, error: error.reason };
  }
};