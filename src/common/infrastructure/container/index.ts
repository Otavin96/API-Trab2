import "@/categories/infrastructure/container";
import "@/clients/infrastructure/container";
import "@/payments/infrastructure/container";
import "@/products/infrastructure/container";
import "@/itemOrders/infrastructure/container";
import "@/orders/infrastructure/container";
import { container } from "tsyringe";
import { NodeMailer } from "../providers/nodemailer/nodemailer-provider";
import { PDF } from "../providers/pdf/create-pdf-provider";
import { BcryptjsHashProvider } from "../providers/hash-provider/bcryptjs-hash.provider";
import { JwtAuthProvider } from "../providers/auth-provider/auth-provider.jwt";

container.registerSingleton("NodeMailer", NodeMailer);
container.registerSingleton("PDFCreate", PDF);
container.registerSingleton("HashProvider", BcryptjsHashProvider);
container.registerSingleton("AuthProviderJwt", JwtAuthProvider);
