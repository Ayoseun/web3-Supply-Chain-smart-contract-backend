import { ethers, formatUnits } from "ethers";

import { swearITContract } from "../../../utils/connection";


export const createAProductMilestone = async (contractAddress:string,data: any) => {

  try {


    let milestoneSigner = await swearITContract(contractAddress, true);
    const createdAtbyte32 = ethers.encodeBytes32String(data["createdAt"])

    await milestoneSigner.createMilestone(data["productId"], data["milestoneId"],data["milestoneName"], createdAtbyte32,data["userId"]);

    // Create a Promise to wait for the "ContractCreated" event
    const milestoneCreatedPromise = new Promise<{ productId: any,milestoneId:any, milestoneName: any, createdAt: any, userId: any,completed:boolean,proofCount:any }>((resolve, reject) => {
      const listener = async (productId: any,milestoneId:any, milestoneName: any, createdAt: any, userId: any,completed:boolean,proofCount:any, event: any) => {

        resolve({productId,milestoneId, milestoneName, createdAt, userId,completed,proofCount}); // Resolve the Promise with both name and address
        event.removeListener();
      };

      swearITContract(contractAddress, false).on("MilestoneCreated", listener);
    });


    // Wait for the Promise to be resolved (i.e., the "ContractCreated" event to be emitted)
    const { productId,milestoneId,milestoneName, createdAt, userId,completed,proofCount } = await milestoneCreatedPromise;
    const createdAtString = ethers.decodeBytes32String(createdAt)

    const milestone = {
      productId: formatUnits(productId, 0),
      milestoneId:formatUnits(milestoneId,0),
      milestoneName:milestoneName,
      createdAt: createdAtString,
     userId:formatUnits(userId,0),
     completed: completed,
     proofCount: formatUnits(proofCount, 0),

    }
    // Now you can return both the contract name and address
    return { statusCode: 200, data: milestone  };
  } catch (error: any) {
    // Return an object with statusCode 500 and the error
    return { statusCode: 400, error: error.reason };
  }
};