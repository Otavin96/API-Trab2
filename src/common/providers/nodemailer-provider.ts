export interface SendMail {
    sendMail(to: string): Promise<void>
}