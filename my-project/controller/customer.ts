import { Customer } from "../db/entities/Customer.js";
import { AppError } from "../Errors/AppError.js";

const createCustomer = async (payload: Customer) => {
  const existingCustomer = await Customer.findOne({
    where: { mobilePhone: payload.mobilePhone }
  });

  if (existingCustomer) {
    throw new AppError("Customer with this mobile phone already exists", 409, true);
  }

  const newCustomer = Customer.create(payload);
  return newCustomer.save();
};

const getCustomer = async (id: number) => {
  const customer = await Customer.findOne({ where: { id: id } });

  if (!Customer) {
    throw new AppError("Customer not found", 404, true);
  }

  return customer;
};

const getAllCustomers = async () => {
  return Customer.find();
};

const deleteCustomer = async (id: number) => {
  const customer = await Customer.findOne({ where: { id: id } });

  if (!Customer) {
    throw new AppError("Customer not found", 404, true);
  }

  return customer.remove();
};

const editCustomer = async (id: number, payload: Partial<Customer>) => {
  const customer = await Customer.findOne({ where: { id: id } });

  if (!Customer) {
    throw new AppError("Customer not found", 404, true);
  }

  if (payload.name !== undefined) {
    customer.name = payload.name;
  }

  if (payload.balance !== undefined) {
    customer.balance = payload.balance;
  }

  return customer.save();
};

export { createCustomer, getCustomer, getAllCustomers, deleteCustomer, editCustomer };