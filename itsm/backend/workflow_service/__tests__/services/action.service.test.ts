import {node} from '../../src/models/node.model'
import { Actions } from '../../src/models/action.model'
import {ActionService} from '../../src/api/services/actions.service'

jest.mock("../../src/models/node.model.ts")
jest.mock("../../src/models/action.model.ts")

describe('testing delete operations for actions',()=>{
    test('check if request body is supplied correctly', async()=>{
        const actionService = new ActionService()
            await actionService.deleteActionFromTask("","123456").catch(err=>{
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Missing TaskId or actionId')
        })

    })

    test('successfull deletion of action', async()=>{

      const actionService = new ActionService();
      const actionId:any = "123456";
      const taskId:any = "23456";
      const spy = jest.spyOn(node,'findOneAndUpdate').mockReturnValue(taskId);
      (Actions.prototype.updateOne).mockImplementation(()=>{
        return actionId
      });
      const res = await actionService.deleteActionFromTask(taskId,actionId);
      expect(spy).toHaveBeenCalled();
      expect(res).toEqual(actionId);

    })

    test('failure in deletion of action', async()=>{

        const actionService = new ActionService();
        const actionId:any = "123456";
        const taskId:any = "23456";
        const response:any = "";
        const spy = jest.spyOn(node,'findOneAndUpdate').mockReturnValue(response);
        (Actions.prototype.updateOne).mockImplementation(()=>{
          return actionId
        });
        expect(spy).toHaveBeenCalled();
        await actionService.deleteActionFromTask(taskId,actionId).catch(err=>{
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Removing actions from task failed');
      })
    })
})

describe('testing update operation on action', ()=>{
    test('wrong request body provided in the request', async()=>{
      const taskId:any = "123456";
      const actionId: any = "23456";
      const actionPayload: any = {};
      const actionService = new ActionService();
      await actionService.editActionInTask(taskId,actionId,actionPayload).catch(err=>{
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Missing TaskId or actionId');
      })
    })

    test('check correct updation of action', async()=>{
        const taskId:any = "123456";
        const actionId: any = "23456";
        const actionPayload:any = {payload: {
            email: "shanmukha.gadigi@cloud4c.com"
        }}
        const action:any = {
            _id: actionId,
            type:"email",
            payload:{
                email: "shanmukha.gadigi@gmail.com"
            }
        }
        const updatedAction:any = {
            type: "email",
            payload: {
                email: "shanmukha.gadigi@cloud4c.com"
            }
        }
        const actionService = new ActionService()
        const spy = jest.spyOn(Actions,'findOneAndUpdate').mockReturnValue({...action,...updatedAction});
        const res = await actionService.editActionInTask(taskId,actionId,actionPayload)
        expect(spy).toHaveBeenCalled();
        expect(res).toEqual(actionId);
    })

    test('failure in updation of action', async()=>{
        const taskId:any = "123456";
        const actionId: any = "23456";
        const actionPayload:any = {payload: {
            email: "shanmukha.gadigi@cloud4c.com"
        }}
        const wrongResponse:any = null
        const actionService = new ActionService()
        const spy = jest.spyOn(Actions,'findOneAndUpdate').mockReturnValue(wrongResponse);
        expect(spy).toHaveBeenCalled();
        await actionService.editActionInTask(taskId,actionId,actionPayload).catch(err=>{
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Editing action failed');
        })
    })
})

describe('testing adding actions to workflow',()=>{
    test('check if taskId or workFlowId are provided in request payload', async()=>{
        const taskId:string = "123456";
        const workFlowId: string = "";
        const actionData:any = {
            type:"email",
            payload: {
                email:"shanmukha.gadigi@gmail.com"
            }
        }
        const actionService = new ActionService()
        await actionService.addActionInTask(workFlowId,taskId,actionData).catch(err=>{
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Missing TaskId or actionId');
        })
    })

    test('action data payload not provided correctly in the request body', async()=>{
        const taskId:string = "123456";
        const workFlowId: string = "23456";
        const actionData:any = {
            type:"email",
            payload: {
            }
        }
        const actionService = new ActionService()
        await actionService.addActionInTask(workFlowId,taskId,actionData).catch(err=>{
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Action payload should be provided');
        })
    })

    test('task fetching failed to which action has to be attached', async()=>{
        const taskId:string = "123456";
        const workFlowId: string = "23456";
        const actionData:any = {
            type:"email",
            payload: {
                email:"shanmukha.gadigi@gmail.com"
            }
        };
        const actionService = new ActionService();
        node.findOne = jest.fn().mockResolvedValue(null)
        await actionService.addActionInTask(workFlowId,taskId,actionData).catch(err=>{
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Task not found');
        })
    })

    test('successful creation of action and attaching it to the task', async()=>{
        const taskId:string = "123456";
        const workFlowId: string = "23456";
        const actionData:any = {
            type:"email",
            payload: {
                email:"shanmukha.gadigi@gmail.com"
            }
        };
        const createdAction:any = {
            _id:"456789",
            ...actionData
        }
        const actionService = new ActionService();
        node.findOne = jest.fn().mockResolvedValue({
            _id:"123456",
            name:"task1",
            actions: [],
            save: jest.fn().mockResolvedValue({})
        })
        Actions.create = jest.fn().mockResolvedValue({
            _id: "456789",
            type:"email",
            payload: {
                email: "shanmukha.gadigi@gmail.com"
            },
            save: jest.fn().mockResolvedValue({})
        })
        const res = await actionService.addActionInTask(workFlowId,taskId,actionData)
        expect(res._id).toEqual(createdAction._id)
    })
})