import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { Ticket } from '../src/models/ticket.model';
import { updateTicket } from '../src/api/controllers/ticket.controller';
jest.mock('../src/models/ticket.model');
// Mock functions
const mockRequest = (): Request => {
  const req: any = {};
  req.body = jest.fn().mockReturnValue(req);
  req.params = jest.fn().mockReturnValue(req);
  req.query = jest.fn().mockReturnValue(req);
  return req as Request;
};

const mockResponse = (): Response => {
  const res: any = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res as Response;
};
describe('updateTicket', () => {
  let req: Partial<Request> = mockRequest();
let res: Partial<Response> = mockResponse();
  

  beforeEach(() => {
   req = {
      body: {
        id: "649bcb1e9e3a132c0c020888",
        ticketPayload: {
          _id: new ObjectId("649bcb1e9e3a132c0c020888"),
          from: 'from1',
          Ticket_ID: '7',
          priority: 'high',
          customer_ticket_ref_id: '1',
          subject: 'test',
          description: 'test',
          serverInfo: 'test Info',
          instance_type: 'test',
          customer_attachment_url: 'test url',
          
        },
      },
    };

    res = mockResponse();
  });

  
   

  it('should handle required fields missing error', async () => {
    req = {
      body: {
        id: null,
        ticketPayload: {
          _id: new ObjectId("649bcb1e9e3a132c0c020888"),
          from: 'from1',
          Ticket_ID: '7',
          priority: 'high',
          customer_ticket_ref_id: '1',
          subject: 'test',
          description: 'test',
          serverInfo: 'test Info',
          instance_type: 'test',
          customer_attachment_url: 'test url'
          
        },
      },
    };
    await updateTicket(req as Request, res as Response);

   
  expect(res.send).toHaveBeenCalledWith({
    success: false,
    message: 'An error occurred while updating the ticket.',
    error: 'required fields missing',
  });
  });


  it('should mock findone and update method', async () => {
    const result = {
      _id: new ObjectId("649bcb1e9e3a132c0c020888"),
      from: 'from1',
      Ticket_ID: '7',
      priority: 'high',
      customer_ticket_ref_id: '1',
      subject: 'test',
      description: 'test',
      serverInfo: 'test Info',
      instance_type: 'test',
      customer_attachment_url: 'test url'
      
    };

    
    const findOneAndUpdateMock = jest.spyOn(Ticket, 'findOneAndUpdate');
    findOneAndUpdateMock.mockResolvedValueOnce(result as any);

    await updateTicket(req as Request, res as Response);

 

    // expect(Ticket.findOneAndUpdate).toHaveBeenCalledWith(
    //   { _id: req.body.id },
    //   {
    //     $set: {
    //       ticketPayload: {
    //         _id: new ObjectId("649bcb1e9e3a132c0c020888"),
    //         from: 'from1',
    //         Ticket_ID: '7',
    //         priority: 'high',
    //         customer_ticket_ref_id: '1',
    //         subject: 'test',
    //         description: 'test',
    //         serverInfo: 'test Info',
    //         instance_type: 'test',
    //         customer_attachment_url: 'test url'
            
    //       },
    //     },
    //   },
    //   { new: true }
    // );
    // expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: result,
      message: "Ticket updated successfully.",
    });
 
  });

  it('should mock catch block', async () => {
    const error = new Error('Mock error');
    jest.spyOn(Ticket,'findOneAndUpdate').mockRejectedValueOnce(error);

    await updateTicket(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: 'Mock error',
      success: false,
      message: 'An error occurred while updating the ticket.',
    });
  });



});
