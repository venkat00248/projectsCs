const {Kafka} = require("kafkajs")
const axios = require('axios')
//run();
const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [process.env.KAFKA_TOPIC!]
});

export async function consumer() {
  try {
    const consumer = kafka.consumer({groupId: process.env.KAFKA_CONSUMER_GROUP_ID!})
    await consumer.connect();

    await consumer.subscribe({
      topic: process.env.KAFKA_TOPIC!,
      fromBeginning: false
    });

    // let msgs:any = []
    await consumer.run({
      "eachMessage": async (result:any) => {
        try{
        const actions = JSON.parse(result.message.value.toString())
        const obj = actions?.reduce((acc:any,cur:any)=>{
            if(cur['dependsOn']){
              return {...acc,...acc['depend'],depend:acc['depend']?[...new Set([...acc['depend'],cur['dependsOn']])]: acc['depend'].push(cur['dependsOn']),rest:acc['depend'].includes(cur['_id'])?[...acc.rest]:[...acc.rest,cur['_id']]}
            } else{
              return{...acc,rest:[...acc.rest,cur['_id']]}
              }
            
         },{depend:[],rest:[]})
         obj.rest = obj.rest.filter((el:any)=> !obj.depend.includes(el))
         await excecuteApiAction(obj['depend'],actions)
         await excecuteApiAction(obj['rest'],actions)
        } catch(error:any){
            console.log(error.message)
        }
    }
    });
  } catch (err) {
    console.log(err);
  }
}
async function excecuteApiAction(action:any,actions:any){
    try{
      let headers = {}
      if(!action || !Array.isArray(action)) {
        return
      }
      for(let i=0;i<action.length;i++){
        let act = actions.filter((item:any)=>item._id==action[i])
        act = act[0]
      if (act.headers){
       headers = act.headers
      }
       if(act.method === "post"){
         await axios.post(act.url,act.body,{
          headers:headers
        })
       } else {
         await axios.get(act?.url,{
          headers: headers
         })
       }
     }
     return
    } catch(error){
      //console.log('error==========',error)
      throw error
    }
  }