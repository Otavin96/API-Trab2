import PDFDocument from "pdfkit";
import { OrderModel } from "@/orders/domain/models/orders.model";
import { injectable } from "tsyringe";
import { CreatePDF } from "@/common/domain/providers/pdfcreate-provider";

@injectable()
export class PDF implements CreatePDF {
  async generatePDF(title: string, order: OrderModel): Promise<Buffer> {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    // Mapeia os produtos corretamente
    const products = order.itemOrders.map((item) => {
      return item.product_id;
    });

    // Criando a Promise para capturar o buffer do PDF
    const pdfBufferPromise = new Promise<Buffer>((resolve, reject) => {
      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => {
        try {
          resolve(Buffer.concat(buffers));
        } catch (error) {
          reject(error);
        }
      });
      doc.on("error", (error) => reject(error));
    });

    // Adicionando conteúdo ao PDF
    doc
      .fontSize(16)
      .text(`Pedido #${order.id}`, { align: "center" })
      .moveDown(2);

    doc
      .fontSize(14)
      .font("Times-Roman")
      .text("Dados do Cliente:", { underline: true })
      .moveDown();
    doc.fontSize(12).text(`Razão Social: ${order.client.social_reason}`);
    doc.text(`CNPJ: ${order.client.cnpj}`);
    doc.text(`Email: ${order.client.email}`);
    doc.text(`Telefone: ${order.client.phone}`).moveDown(2);

    doc
      .fontSize(14)
      .font("Times-Roman")
      .text("Itens do Pedido:", { underline: true })
      .moveDown();
    products.forEach((product) => {
      doc.fontSize(12).text(`Produto: ${product.name}`);
      doc
        .fontSize(12)
        .text(
          `Valor: ${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.price)}`
        );
      doc.fontSize(12).text(`Quantidade: ${product.quantity}`).moveDown(2);
    });

    doc
      .fontSize(12)
      .text(
        `Valor Total: ${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(order.valueTotal)}`
      );

    doc.end();

    return pdfBufferPromise;
  }
}
