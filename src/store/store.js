import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//hello ashok kumar n k k
Vue.use(Vuex);

export const store=new Vuex.Store({
    state:{
        members:[],
        value: 'Vuex',
        options: ['Vuex', 'Vue', 'Vuelidate', 'Vue-Multiselect', 'Vue-Router']
        //allow:null
    },

    getters:{
        //allmembers:(state)=>state.members
        allmembers(state){
            console.log("done")
            return state.members
        },
        getoptions(state){
            return state.options
        },
        getvalues(state){
                console.log(state.value)
            return state.value
        }
    },
    mutations:{

        updatevalue(state,val){
            console.log(val)
            state.value=val
        },
            




        getmembers(state,payload){
            console.log(payload)
            state.members.push(...payload)
            console.log(state.members)
            //state.forget=0;
            console.log(state.forget)
            return(state.members);  
            
        },
        /*getmembers:(state,payload)=>{
            state.members=payload;
        }*/
        postmembers(state,payload){
            console.log("Payload : "+ JSON.stringify(payload))
            state.members.unshift(payload);            
        },
        putmembers(state,payload){
            console.log(payload)
            let ind =  state.members.findIndex(members=>members.id==payload.cid)
            state.members.splice(ind,1,payload.res);
        },
        deletemembers(state,payload){
            let ind = state.members.findIndex(members=>members.id==payload)
            state.members.splice(ind,1)
        }
      
      

            
    },
    actions:{

            updatevalue(context,payload){
                context.commit('updatevalue',payload)
            },

   getmembers(context,payload){
       return new Promise((resolve,reject)=>{
    
        //if(payload.pn<=payload.page)
        {
        
       try{ 
            console.log("entering")
            axios.get('/user?_page='+payload.pn+'&_limit='+payload.lt)
           .then (
                (data)=>{
                    console.log(data)
                    if(data.status == 200 && data.statusText == 'OK')
                          { 
                            console.log("Message" + data.data)
                            context.commit('getmembers',data.data)
                            resolve(true)
                            //return (data.data)
                            
                               }//Math.floor((Math.random() * 10) + 1)*1000) 
                    else{
                           reject(console.log(data.status))
                           
                       }
                       })
        
            .catch(function (error){
                if (error.response) {
                          // Request made and server responded
                          console.log(error.response.data);
                          console.log(error.response.status);
                          console.log(error.response.headers);
                          if(error.response.status >= 400)
                          {
                              console.log(payload)  
                              resolve(payload)
                              
                          }
                        }
                else if (error.request) {
                          // The request was made but no response was received
                          console.log(error.request);
                        } 
                else {
                          // Something happened in setting up the request that triggered an Error
                          console.log('Error', error.message);
                        }
                    
                    })           
           
                }
   catch(error)
   {
   console.log(error)
    }
    }}
    
    )

  
},

        postmembers:(context,payload)=>{
            axios.post('/user',payload)
            .then(
                data =>{
                    console.log(data.data)
                    context.commit('postmembers',data.data)
                }
            )
        },
        putmembers:(context,payload)=>{
            axios.put('/user/'+payload.cid,payload.res)
            .then(
                data=>{
                    console.log(data.data)
                    let payload={
                        cid:data.data.id,
                        res:data.data
                    }
                    context.commit('putmembers',payload)
                }
            )
        },
        deletemembers:(context,payload)=>{
            axios.delete('/user/'+payload)
            .then(
                context.commit('deletemembers',payload)
            )
        }
    
    }
        
}) 