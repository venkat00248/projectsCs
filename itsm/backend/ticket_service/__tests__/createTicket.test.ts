import { ITicket, Ticket } from '../src/models/ticket.model';
import { createTicket } from '../src/api/controllers/ticket.controller';
import { Request, Response } from 'express';
import { Document, ObjectId, Types } from 'mongoose';

jest.mock('../src/models/ticket.model');

export const mockRequest = (): Request => {
  const req: any = {};
  req.body = jest.fn().mockReturnValue(req);
  req.params = jest.fn().mockReturnValue(req);
  req.query = jest.fn().mockReturnValue(req);
  return req as Request;
};

export const mockResponse = (): Response => {
  const res: any = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res as Response;
};

test('create a ticket', async () => {
  const ticketData: ITicket = {
    from: 'emailId',
    Ticket_ID: '11',
    tickettypeid: 'null',
    priority: 'null',
    customer_ticket_ref_id: 'null',
    subject: 'subject',
    description: 'description',
    serverInfo: 'null',
    instance_type: 'description',
    customer_attachment_url: 'attactch',
    name: '',
    id: undefined
  };

  const consoleErrorMock = jest.fn();

  try {
    const originalConsoleError = console.error;
    console.error = consoleErrorMock;

    if (!ticketData.priority || !ticketData.name || !ticketData.description || !ticketData.tickettypeid) {
      console.error('Required fields missing');
      return;
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    console.error = originalConsoleError;
  }

  const mockTicketDocument = new Ticket({
    _id: new Types.ObjectId(),
    ...ticketData,
  }) as Document<unknown, {}, ITicket> & Omit<ITicket & { _id: Types.ObjectId }, never>;

  const createMock = jest.spyOn(Ticket, 'create').mockResolvedValue([mockTicketDocument]);
  const request = mockRequest();
  const response = mockResponse();

  await createTicket(request, response);

  expect(createMock).toHaveBeenCalledWith(ticketData);
  expect(response.json).toHaveBeenCalledWith({
    message: 'Created Ticket successfully.',
  });
});
function originalConsoleError(...data: any[]): void {
  throw new Error('Function not implemented.');
}

test('getting Error whilecreating A ticket',async()=>{
  const result ={
    from: "emailId",
    Ticket_ID: "11",
    tickettypeid: "null",
    priority: "null",
    customer_ticket_ref_id: "null",
    subject: "subject",
    description: "description",
    serverInfo: "null",
    instance_type: "description",
    customer_attachment_url: "attactch"
  }
 const request = mockRequest();
 const response = mockResponse();
  const spy = jest
    .spyOn(Ticket, 'create')
    .mockImplementation(() => {
      const result: (Document<unknown, {}, ITicket> & Omit<ITicket & { _id: Types.ObjectId }, never>)[] = [];
      return Promise.resolve(result);
    });
  
await createTicket(request, response).catch(() => { 
      expect(spy).toHaveBeenCalled();
      expect(response.json).toHaveBeenCalledWith({
        error: "An error occurred while creating Ticket."
    })
    })
    
})
