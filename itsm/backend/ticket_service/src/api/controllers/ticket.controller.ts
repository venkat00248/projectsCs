import { Request, Response } from "express";
import { Ticket } from "../../models/ticket.model";
import { TicketType } from "../../models/ticketType.model";
import { TicketTypeWFMapping } from "../../models/ticketWorkflowMapping.model";
import _ from "lodash"
/*export const createTicket = async (req:Request, res:Response) => {
 const {
      from,
      Ticket_ID,
      tickettypeid,
      priority,
      customer_ticket_ref_id,
      subject,
      description,
      serverInfo,
      instance_type,
      customer_attachment_url
      } = req.body;
    try {
      await Ticket.create({
        from,
        Ticket_ID,
        tickettypeid,
        priority,
        customer_ticket_ref_id,
        subject,
        description,
        serverInfo,
        instance_type,
        customer_attachment_url
      });
      
      res.status(201).json({ message: "created Ticket   successfully." });
    } catch (error) {
      
      res.status(500).json({ error: "An error occurred while creating Ticket." });
    }
  }
  export const saveTicket = async (ticket:any) => {
    await ticket.save();
  };

 
    export const updateTicket = async (req: Request, res: Response) => {
      const {
        ticketId,
        ticketPayload
      } = req.body;
      try {
        const result = await Ticket.findOneAndUpdate(
          { _id: ticketId },
          { $set: {...ticketPayload} },
          { new: true }
        );
       
      return res.status(200).json({ ticket: result });
      } catch (error) {
        
        return res.status(500).json({ error: "Internal server error." });
      }
    };*/

export const createTicket = async (req: Request, res: Response) => {

  let {
    from,
    Ticket_ID,
    tickettypeid,
    priority,
    customer_ticket_ref_id,
    name,
    description,
    serverInfo,
    instance_type,
    customer_attachment_url
  } = req.body;
  try {
    if (!priority || !name || !description || !tickettypeid) throw new Error('required fields missing')
    const result = await Ticket.create({
      from: from ? from : "",
      Ticket_ID: Ticket_ID ? Ticket_ID : "",
      tickettypeid: tickettypeid,
      priority: priority,
      customer_ticket_ref_id: customer_ticket_ref_id ? customer_ticket_ref_id : "",
      name: name,
      description: description,
      serverInfo: serverInfo ? serverInfo : "",
      instance_type: instance_type ? instance_type : "",
      customer_attachment_url: customer_attachment_url ? customer_attachment_url : ""
    });

    res.status(201).json({ success: true, data: result, message: "created Ticket successfully." });
  } catch (error: any) {
    console.log("error", error)
    res.status(500).send({ success: false, message: "An error occurred while creating Ticket.", error: error.message });
  }
}

export const updateTicket = async (req: Request, res: Response) => {
  const {
    id,
    ticketPayload
  } = req.body;
  try {
    if (!ticketPayload || !id) throw new Error('required fields missing')
    const result = await Ticket.findOneAndUpdate({ _id: id }, { $set: { ...ticketPayload } }, { new: true })
    return res.status(200).json({ success: true, data: result, message: "Ticket updated successfully." });
  } catch (error: any) {
    // console.error(error); // Log the error for debugging purposes
    return res.status(500).send({ success: false, message: "An error occurred while updating the ticket.", error: error.message });
  }
};

export const getAllTickets = async (_: Request, res: Response) => {
  try {
    const tickets = await Ticket.find({})
    if (!tickets) throw new Error('no tickets found')
    res.status(200).json({
      success: true,
      data: tickets,
      error: ""
    })
  } catch (error: any) {
    res.status(500).send({
      success: false,
      data: "",
      error: error.message
    })
  }
}

export const getTicketById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) throw new Error('ticketId required')
    const ticket = await Ticket.findById(id)
    if (!ticket) throw new Error('no ticket found')
    res.status(200).json({
      success: true,
      data: ticket,
      error: ""
    })
  } catch (error: any) {
    res.status(500).send({
      success: false,
      data: "",
      error: error.message
    })
  }
}

export const createTicketTypes = async (req: Request, res: Response) => {
  try {
    const { type } = req.body
    const ticketType = await TicketType.create({
      type
    })
    res.send({
      success: true,
      data: ticketType,
      error: ""
    })
  } catch (error: any) {
    res.send({
      success: false,
      data: "",
      error: error.message
    })
  }
}

export const listAllTicketTypes = async (_: Request, res: Response) => {
  try {
    const ticketTypes = await TicketType.find({})
    if (!ticketTypes) throw new Error('no ticket types found')
    res.json({
      success: true,
      data: ticketTypes,
      error: ""
    })
  } catch (error: any) {
    res.send({
      success: false,
      data: "",
      error: error.message
    })
  }
}

export const listAllMappings = async (_: Request, res: Response) => {
  try {
    let ticketTypeMappings: any = await TicketTypeWFMapping.find({})
    ticketTypeMappings = ticketTypeMappings.map((type: any) => {
      return type.toObject()
    })
    if (!Array.isArray(ticketTypeMappings) || ticketTypeMappings.length === 0) throw new Error('no ticket type Mappings found')
    for (let i = 0; i < ticketTypeMappings.length; i++) {
      let ticketType: any = await TicketType.findById(ticketTypeMappings[i].ticketTypeId)
      ticketTypeMappings[i] = { ...ticketTypeMappings[i], type: ticketType.type }
    }
    res.json({
      success: true,
      data: ticketTypeMappings,
      error: ""
    })
  } catch (error: any) {
    res.send({
      success: false,
      data: "",
      error: error.message
    })
  }
}



export const mapWorkFlowToTicketType = async (req: Request, res: Response) => {
  try {
    const { ticketTypeId, workFlowId } = req.body
    if (!ticketTypeId || !workFlowId) throw new Error('mandatory fields missing')
    const mappedTicketType = await TicketTypeWFMapping.create({
      ticketTypeId,
      workFlowId
    })
    res.json({
      success: true,
      data: mappedTicketType,
      error: ""
    })
  } catch (error: any) {
    res.send({
      success: false,
      data: "",
      error: error.message
    })
  }
}



