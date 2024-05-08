import { ethers, formatUnits } from "ethers";

import { swearITContract } from "../../../utils/connection";


export const createAProduct = async (contractAddress:string,data: any) => {

  try {


    let productSigner = await swearITContract(contractAddress, true);
    const createdAtbyte32 = ethers.encodeBytes32String(data["createdAt"])

    await productSigner.createProduct(data["productId"], data["productName"], createdAtbyte32, data["organizationId"], data["organizationName"], data["productUrl"]);

    // Create a Promise to wait for the "ContractCreated" event
    const productCreatedPromise = new Promise<{ productId: any, productName: any, createdAt: any, organizationId: any, organizationName: any, productUrl: any ,milestoneCount:any,proofCount:any,validatedProofsCount:any}>((resolve, reject) => {
      const listener = async (productId: any, productName: any, createdAt: any, organizationId: any, organizationName: any, productUrl: any,milestoneCount:any,proofCount:any,validatedProofsCount:any, event: any) => {

        resolve({ productId, productName, createdAt, organizationId, organizationName, productUrl,milestoneCount,proofCount,validatedProofsCount }); // Resolve the Promise with both name and address
        event.removeListener();
      };

      swearITContract(contractAddress, false).on("ProductCreated", listener);
    });


    // Wait for the Promise to be resolved (i.e., the "ContractCreated" event to be emitted)
    const { productId, productName, createdAt, organizationId, organizationName, productUrl,milestoneCount,proofCount,validatedProofsCount } = await productCreatedPromise;
    const createdAtString = ethers.decodeBytes32String(createdAt)

    const product = {
      productId: formatUnits(productId, 0),
      productName: productName,
      createdAt: createdAtString,
      organizationName: organizationName,
      organizationId: formatUnits(organizationId, 0),
      productUrl: productUrl,
      milestoneCount:formatUnits(milestoneCount, 0),
      proofCount:formatUnits(proofCount, 0),
      validatedProofsCount:formatUnits(validatedProofsCount, 0)
    }
    // Now you can return both the contract name and address
    return { statusCode: 200, data: product };
  } catch (error: any) {
    // Return an object with statusCode 500 and the error
    return { statusCode: 400, error: error.reason };
  }
};