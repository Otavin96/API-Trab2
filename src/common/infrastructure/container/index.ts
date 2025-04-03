import "@/categories/infrastructure/container";
import "@/clients/infrastructure/container";
import "@/payments/infrastructure/container";
import "@/products/infrastructure/container";
import "@/itemOrders/infrastructure/container";
import "@/orders/infrastructure/container";
import { container } from "tsyringe";
import { NodeMailer } from "../providers/nodemailer/nodemailer-provider";
import { PDF } from "../providers/pdf/create-pdf-provider";

container.registerSingleton("NodeMailer", NodeMailer);
container.registerSingleton("PDFCreate", PDF);
