import PDFDocument from "pdfkit";
import { CreatePDF } from "@/common/providers/pdfcreate-provider";
import { OrderModel } from "@/orders/domain/models/orders.model";
import { injectable } from "tsyringe";

@injectable()
export class PDF implements CreatePDF {
  async generatePDF(title: string, order: OrderModel): Promise<Buffer> {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    // A Promise vai ser resolvida quando o evento 'end' for disparado
    const pdfBufferPromise = new Promise<Buffer>((resolve, reject) => {
      // Adiciona os dados ao buffer
      doc.on("data", (chunk) => buffers.push(chunk));

      // Quando o PDF terminar de ser gerado, resolve a Promise com o buffer
      doc.on("end", () => {
        try {
          const pdfBuffer = Buffer.concat(buffers); // Junta os buffers
          resolve(pdfBuffer); // Retorna o buffer gerado
        } catch (error) {
          reject(error); // Em caso de erro, rejeita a Promise
        }
      });

      // Em caso de erro na geração do PDF, rejeita a Promise
      doc.on("error", (error) => reject(error));
    });

    // Exemplo de conteúdo do PDF
    doc.text(`Pedido #${order.id}`, { align: "center" });
    doc.text(`Cliente: ${order.client.email}`);
    // Adicionar outros detalhes do pedido aqui...

    doc.end(); // Finaliza o PDF

    // Retorna o buffer quando o PDF for gerado
    return pdfBufferPromise;
  }
}
