import { ethers, formatUnits } from "ethers";
import { swearITContract } from "../../../utils/connection";


export const getProductByID = async (contractAddress:string,data: any) => {
    const { productId} = data

   
    try {
        let res = await swearITContract(contractAddress, false).getProductById(productId);
        const product = {
            productId: formatUnits(res[0], 0),
            productName: res[1],
            createdAt:ethers.decodeBytes32String(  res[2]),
            organizationId: formatUnits(res[3], 0),
            organizationName: res[4],
            productUrl: res[5],
            milestoneCount: formatUnits(res[6], 0),
            proofCount: formatUnits(res[7], 0),
            validatedProofsCount: formatUnits(res[8], 0),
        }
        return { statusCode: 200, data: product };
    } catch (error: any) {
        return { statusCode: 400, error: error.reason };
    }
};