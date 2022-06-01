<template>

    <div id="singlemember">
        
        <h1>Detailed View : </h1>
        <ul id="view">
        <li>NAME    : {{member.Name}}</li>
        <li>ROLL NO : {{member.Rollno}}</li>
        <li>EMAIL   : {{member.Email}}</li>
        <li>CONTACT : {{member.Contact}}</li>

        </ul>
        
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
      computed: mapGetters(["allmembers"]),

    methods:{
         singleget(){
            
            let ind =  this.allmembers.findIndex(members=>members.id==this.$route.params.id)
            console.log(this.allmembers[ind])
            //console.log(typeof(JSON.stringify(this.members[ind])))
            //console.log(JSON.parse(JSON.stringify(this.members[ind])))
            this.member=JSON.parse(JSON.stringify(this.allmembers[ind]))
            console.log(this.member)
        },
    },

    data(){
        return{
            member:{}           
    }
    },
    created(){
        this.singleget()
        this.$watch(
           ()=>this.$route.params,this.getsingle)
    }
}

</script>

<style>

#view{
    display: inline-block;
    background:rgb(255, 209, 149);
    margin: 20px;
    padding:20px
}
#singlemember{
 margin: auto;
  width: 50%;
  padding: 10px;
  position: absolute;
  left: 40%;
}
#singlemember li{
   color: black;
    display: block; 
  padding: 20px; 
  margin: 20px 0;
    
}
#view li{
    background: rgb(254, 249, 242);
    color: black;
  margin: 5px;
  text-align:start;;
}


</style>