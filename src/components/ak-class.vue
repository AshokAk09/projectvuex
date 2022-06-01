<template>
<div> 
  <add-header></add-header>
    <router-view></router-view>
  <show-members ></show-members>
</div>
</template>

    

<script>
import addHeader from './class-header.vue'
import showMembers from './ShowMembers.vue'
//import showmembers from './show-members.vue'


export default {
    beforeUpdate(){
        console.log("Before update " + this.members)
    },
    updated(){
        console.log("after update " + this.members)
    },
    methods:{
        newMember(value){
        console.log(value)
        this.members.unshift(value);

        },

       addArray(value){
            this.members=value
            console.log(value);
            console.log(this.members)
        },
        putArray(value){
            
       
           let ind =  this.members.findIndex(members=>members.id==this.$route.params.id)
           this.members.splice(ind,1,value);
        }

},
    data(){
        return{
            members:[]
        }
    },
    
    components:{
            //'add-blog':addBlog,
          'show-members':showMembers,
          'add-header':addHeader,
      
       
    }
    
}
</script>
        
        
<style>
.addshow{
    width: 30%;
    text-align: center;
    position: absolute;

}


</style>