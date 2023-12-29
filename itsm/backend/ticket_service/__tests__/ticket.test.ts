import {TicketDetails}  from '../src/modals/TicketDetails'; 
import {createTicket,  updateTicket} from '../src/api/controllers/ticketDetails.controller'


jest.mock('../src/modals/TicketDetails')
export const mockResponse = () => {
  const res:any = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}
export const mockRequest = () => {
  const req:any = {};
  req.body = jest.fn().mockReturnValue(req);

  req.params = jest.fn().mockReturnValue(req);

  req.query = jest.fn().mockReturnValue(req);

  return req;

}

    test('create A ticket',async()=>{
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
      const request = mockRequest()
      const response = mockResponse()
        const spy = jest.spyOn(TicketDetails,'create').mockImplementation(()=>{
         return  result
        })
       await createTicket(request, response)
        expect(spy).toHaveBeenCalled();
        expect(response.json).toHaveBeenCalledWith({
          message: "created Ticket   successfully."
      })
  
    })
  

    test('getting Error while creating A ticket',async()=>{
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
      const request = mockRequest()
      const response = mockResponse()
        const spy = jest.spyOn(TicketDetails,'create').mockImplementation(()=>{
         return  result
        })
        await createTicket(request, response).catch(() => { 
          expect(spy).toHaveBeenCalled();
          expect(response.json).toHaveBeenCalledWith({
            error: "An error occurred while creating Ticket."
        })
        })
        
    })
    test('getting Error while updating  A ticket',async()=>{
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
      const request = mockRequest()
      const response = mockResponse()
        const spy = jest.spyOn(TicketDetails,'update').mockImplementation(()=>{
         return  result
        })
        await updateTicket(request, response).catch(() => { 
          expect(spy).toHaveBeenCalled();
          expect(response.json).toHaveBeenCalledWith({ error: "An error occurred while updating the ticket." })
        })
        
    })

    test('update a ticket', async () => {
      const Ticket = {
        from: "emailId",
        Ticket_ID: "11",
        tickettypeid: "null",
        priority: "null",
        customer_ticket_ref_id: "null",
        subject: "subject",
        description: "description",
        serverInfo: "null",
        instance_type: "description",
        customer_attachment_url: "attach"
      };
    
      const request = mockRequest();
      const response = mockResponse();
    
      const spy = jest.spyOn(TicketDetails, 'findOne').mockImplementation(()=>{
        return Ticket
       })
       const spyUpdate = jest.spyOn(TicketDetails,'update').mockImplementation(()=>{
        return  Ticket
       })
      await updateTicket(request, response);
      expect(spy).toHaveBeenCalled();
      expect(spyUpdate).toHaveBeenCalled(); // Verify that saveTicket was called with the updated ticket
      expect(response.json).toHaveBeenCalledWith({ message: "Ticket updated successfully." });
    });
    
