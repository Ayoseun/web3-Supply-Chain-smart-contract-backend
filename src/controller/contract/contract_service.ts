import { Request, Response } from 'express'; // Importing the Request and Response interfaces from Express
import { createAProduct } from './products/create_product';
import { getProductByID } from './products/get_product_by_id';
import { getAllProducts } from './products/get_all_product';
import { createAProductMilestone } from './milestones/create_milestone';
import { getAProductMilestoneByID } from './milestones/get_milestone_by_id';
import { getAllProductMilestone } from './milestones/get_all_product_milestone';
import { updateAProductMilestone } from './milestones/update_milestone';
import { validateAProductMilestoneProof } from './proofs/validate_proof';
import { createAProductMilestoneProof } from './proofs/create_proof';
import { getAProductMilestoneProofByID } from './proofs/get_milestone_proof_by_id copy 2';
import { getAllMilestoneProof } from './proofs/get_all_milestone_proof_by_id';


export class ContractService {
  // Defining a class named ProductService

  public createProduct = async (req: Request, res: Response) => {
    const contractAddress = req.params.contractAddress;

    // Extract the payload (staking details) from the request body
    const payload = req.body;
    try {
    
      const result = await createAProduct(contractAddress,payload);
      res.send(result );
    } catch (error) {
      res.send(error); 
    }
  };


  public getProductById = async (req: Request, res: Response) => {
    const contractAddress = req.params.contractAddress;

    // Extract the payload (staking details) from the request body
    const payload = req.body;
    try {
      const result = await getProductByID(contractAddress,payload);
      res.send(result );
    } catch (error) {
      res.send(error); 
    }
  };


  public getAllProducts = async (req: Request, res: Response) => {
    const contractAddress = req.params.contractAddress;

 
    try {
      const result = await getAllProducts(contractAddress);
      res.send(result );
    } catch (error) {
      res.send(error); 
    }
  };

  public createProductMilestone = async (req: Request, res: Response) => {
    const contractAddress = req.params.contractAddress;

    // Extract the payload (staking details) from the request body
    const payload = req.body;
    try {
    
      const result = await createAProductMilestone(contractAddress,payload);
      res.send(result );
    } catch (error) {
      res.send(error); 
    }
  };


  public getProductMilestoneById = async (req: Request, res: Response) => {
    const contractAddress = req.params.contractAddress;

    // Extract the payload (staking details) from the request body
    const payload = req.body;
    try {
      const result = await getAProductMilestoneByID(contractAddress,payload)
      res.send(result );
    } catch (error) {
      res.send(error); 
    }
  };

  public getAllProductMilestones = async (req: Request, res: Response) => {
    const contractAddress = req.params.contractAddress;

    // Extract the payload (staking details) from the request body
    const payload = req.body;
    try {
      const result = await getAllProductMilestone(contractAddress,payload)
      res.send(result );
    } catch (error) {
      res.send(error); 
    }
  };
  public updateAProductMilestone = async (req: Request, res: Response) => {
    const contractAddress = req.params.contractAddress;

    // Extract the payload (staking details) from the request body
    const payload = req.body;
    try {
      const result = await updateAProductMilestone(contractAddress,payload)
      res.send(result );
    } catch (error) {
      res.send(error); 
    }
  };


  public createProductMilestoneProof = async (req: Request, res: Response) => {
    const contractAddress = req.params.contractAddress;

    // Extract the payload (staking details) from the request body
    const payload = req.body;
    try {
    
      const result = await createAProductMilestoneProof(contractAddress,payload);
      res.send(result );
    } catch (error) {
      res.send(error); 
    }
  };

  public vaidateAProductMilestoneProof = async (req: Request, res: Response) => {
    const contractAddress = req.params.contractAddress;

    // Extract the payload (staking details) from the request body
    const payload = req.body;
    try {
    
      const result = await validateAProductMilestoneProof(contractAddress,payload);
      res.send(result );
    } catch (error) {
      res.send(error); 
    }
  };



  public getProductMilestoneProofById = async (req: Request, res: Response) => {
    const contractAddress = req.params.contractAddress;

    // Extract the payload (staking details) from the request body
    const payload = req.body;
    try {
      const result = await getAProductMilestoneProofByID(contractAddress,payload)
      res.send(result );
    } catch (error) {
      res.send(error); 
    }
  };

  public getAllMilestonesProof = async (req: Request, res: Response) => {
    const contractAddress = req.params.contractAddress;

    // Extract the payload (staking details) from the request body
    const payload = req.body;
    try {
      const result = await getAllMilestoneProof(contractAddress,payload)
      res.send(result );
    } catch (error) {
      res.send(error); 
    }
  };

}