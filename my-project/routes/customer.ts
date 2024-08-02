import { Router, Request, Response, NextFunction } from "express";
import {
  createCustomer,
  getCustomer,
  getAllCustomers,
  deleteCustomer,
  editCustomer,
} from "../controller/customer.js";
import { logRequestMiddleware } from "../Middleware/printInfoMiddleware.js";
import { Customer } from "../db/entities/Customer.js";

const router = Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = Number(req.params.id);
    const customer = await getCustomer(customerId);

    res.json({
      message: "Customer retrieved successfully",
      success: true,
      customer,
    });
  } catch (error) {
    console.log("Error: " + error);
    next(error);
  }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = Number(req.params.id);
    await deleteCustomer(customerId);

    res.json({
      message: "Customer deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error: " + error);
    next(error);
  }
});

router.get("/", logRequestMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customers = await getAllCustomers();
    res.json({
      message: "Customers retrieved successfully",
      success: true,
      customers,
    });
  } catch (error) {
    console.log("Error: " + error);
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { name, mobilePhone, balance } = req.body;

  if (!name || !mobilePhone || balance === undefined) {
    return res.status(400).json({
      message: "Some fields are missing",
      success: false,
    });
  }

  try {
    const customer = await createCustomer(req.body);
    res.json({
      message: "Customer created successfully",
      success: true,
      customer,
    });
  } catch (error) {
    console.log("Error: " + error);
    next(error);
  }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const customerId = Number(req.params.id);
  const payload: Partial<Customer> = req.body;

  try {
    const customer = await editCustomer(customerId, payload);

    res.json({
      message: "Customer edited successfully",
      success: true,
      customer,
    });
  } catch (error) {
    console.log("Error: " + error);
    next(error);
  }
});

export default router;