// import { connect } from '../../src/config/database.config';
import { Message } from '../../src/models/message';
import { getUnreadMessages } from '../../src/services/message.service';

jest.mock('../../src/models/message')


describe('Get all unread messages', () => {
    test('testing unread messages', async () => {
        const data = {
            title: 'Testing tweet',
            message: "test",
            status: "UNREAD"
        }
        const msgsArray = [{ ...data, createdAt: '2023-05-31', updatedAt: '2023-05-31' }, { ...data, createdAt: '2023-05-31', updatedAt: '2023-05-31' }];
        let findResponse:any = { msgsArray }
        findResponse.where = jest.fn((str) => {
            findResponse = { ...findResponse, wh: str }
            return findResponse
        });
        findResponse.equals = jest.fn((str) => findResponse.msgsArray.filter(item => {
            return item[findResponse.wh] === str
        }))
        const spy = jest.spyOn(Message, 'find').mockImplementation(() => {
            return findResponse;
        });
        const msgs = await getUnreadMessages();
        expect(spy).toHaveBeenCalled();
        expect(msgs).toEqual(expect.arrayContaining(msgsArray))
    })

    test('should not fetch unread messages and throw exception',async()=>{
        const spy = jest.spyOn(Message,'find').mockImplementation(()=>{
            throw new Error('error in fetching messages')
        })
        expect(spy).toHaveBeenCalled();
        const msg = await getUnreadMessages().catch(err => {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('error in fetching messages')
        })
    })
})