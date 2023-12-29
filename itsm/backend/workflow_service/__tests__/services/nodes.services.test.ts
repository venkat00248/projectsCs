import {node} from '../../src/models/node.model'
//import { Actions } from '../../src/models/action.model'
import {NodeService} from '../../src/api/services/nodes.service'

jest.mock("../../src/models/node.model.ts")
jest.mock("../../src/models/action.model.ts")
jest.mock('../../src/utils/workflow.helper', () => {
    return {
        isWorkFlowPublished: jest.fn(() => {
              return Promise.resolve(false);
          })
    };
  });
describe('task update related test cases',()=>{
      
    /*test('cannot modify task in a published workflow',async()=>{
        const workFlowId:string = "123456";
        const taskId: string = "23456";
        const taskData: any = {
            name: "task1"
        }
        
        const nodeService = new NodeService()
        await nodeService.updateTask(workFlowId,taskId,taskData).catch(err=>{
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Workflow cannot be modified after publishing');
        })

    })*/

    test('cannot modify action in a task',async()=>{
        const workFlowId:string = "123456";
        const taskId: string = "23456";
        const taskData: any = {
            name: "task1",
            actions:[]
        }
        
        const nodeService = new NodeService()
        await nodeService.updateTask(workFlowId,taskId,taskData).catch(err=>{
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('actions cannot be updated');
        })
    })
    test('payload is not provided correctly in the update task api',async()=>{
            const workFlowId:string = "";
            const taskId: string = "23456";
            const taskData: any = {
            }
            
            const nodeService = new NodeService()
            await nodeService.updateTask(workFlowId,taskId,taskData).catch(err=>{
                expect(err).toBeInstanceOf(Error);
                expect(err.message).toBe('Insuffcient payload provided in request');
            })

    })

    test('successful updation of task',async()=>{
        const workFlowId:string = "12345";
        const taskId: string = "23456";
        const taskData: any = {
            name:"task2"
        }
        
        const nodeService = new NodeService()
        const task:any = {
            _id: taskId,
            name:"task1",
            actions: []
        }
        const updatedTask:any = {
            name: "task2"
        }
        const spy = jest.spyOn(node,'findOneAndUpdate').mockReturnValue({...task,...updatedTask});
        const res = await nodeService.updateTask(workFlowId,taskId,taskData)
        expect(spy).toHaveBeenCalled();
        expect(taskData.name).toEqual(res.name);

})
  
test('updation of task failure',async()=>{
    const workFlowId:string = "12345";
    const taskId: string = "23456";
    const taskData: any = {
        name:"task2"
    }
    
    const nodeService = new NodeService()
    const failure: any = null
    const spy = jest.spyOn(node,'findOneAndUpdate').mockReturnValue(failure);
    expect(spy).toHaveBeenCalled();
    await nodeService.updateTask(workFlowId,taskId,taskData).catch(err=>{
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Task not modified');
    })

})

})

describe('task deletion related test cases',()=>{
    test()
})