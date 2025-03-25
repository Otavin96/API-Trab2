import "@/categories/infrastructure/container";
import "@/clients/infrastructure/container";
import "@/payments/infrastructure/container";
import "@/products/infrastructure/container";
import { container } from "tsyringe";
import { NodeMailer } from "../http/nodemailer/nodemailer-provider";

container.registerSingleton("NodeMailer", NodeMailer)
