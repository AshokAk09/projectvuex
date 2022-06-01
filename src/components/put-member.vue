<template>
<div>

  <div id="form2">
    <h2>Add a new Member !!</h2>
    <form v-if="!submitted">
        <label>ROLL NO: </label><br>
        <input type="text" v-model="member.Rollno" required/><br>
        <label>NAME: </label><br>
        <input type="text" v-model="member.Name" required/><br>
        <label>Email:</label><br>
        <input type="email" v-model="member.Email" required/><br>
        <label>PHONE:</label><br>
        <input type="number" v-model="member.Contact" required/><br>
         <label>DEPARTMENT:</label>
        <multiselect v-model="member.depart" :options="department" placeholder="Department"></multiselect><br>
       <label>SKILLS:</label>
        <multiselect v-model="member.Skill" :options="skillopt" :allow-empty="false" :multiple="true" :taggable="true" :clear-on-select="true" tag-placeholder="Add this as new tag" :close-on-select="false" @tag="addSkill" :show-labels="false" placeholder="Tell us your skills"></multiselect>   <br> 
        <button v-on:click.prevent="checkput">Submit</button>
    </form>
    </div>

</div>
    
</template>
<script>
import Multiselect from 'vue-multiselect'
import { mapGetters } from "vuex";
export default{
    //props:['members'],
    data(){
        return{
               member:null,
               submitted:false,
        }
    },
  computed:{
        Multiselect,
      ...mapGetters(["allmembers"])
      },
       
    methods:{   
        
  
        singleget(){
            
            let ind =  this.allmembers.findIndex(members=>members.id==this.$route.params.id)
            console.log(this.allmembers[ind])
            //console.log(typeof(JSON.stringify(this.members[ind])))
            //console.log(JSON.parse(JSON.stringify(this.members[ind])))
            this.member=JSON.parse(JSON.stringify(this.allmembers[ind]))
            console.log(this.member)
        },
       /* put:function(){
            this.$http.put("/students/"+this.$route.params.id,this.member).then(function(data){
                    console.log(data.body);   
                    this.$emit("edit",this.member);            
                this.$router.push({ path: '/home' })    
            });
        },*/
        checkput:function(){
            let pp = JSON.stringify(this.member)
            alert(pp)
            if(this.member.Name && this.member.Rollno && this.member.Email && this.member.Contact)
            {
                let payload={cid:this.$route.params.id,res:this.member}
                this.putmembers(payload);
                this.$router.push({ path: '/home' })   
                
            }
            else{
                alert("Please Fill All the columns")
            }            
        },
      
    },
     created(){
         console.log("created")
        this.singleget()
        this.$watch(
         ()=>this.$route.params,this.singleget)
}
}



</script>


<style>

input {
 width: 100%;
  padding: 12px 20px;
  margin: 10px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
#form2{

  border-radius: 5px;
  background-color: #dedede;
  padding: 20px;
  width: 50%;
  margin: auto  ;
  float: right;
}
button{
    width: 50%;
  background-color: #525252;
  color: white;
  padding: 14px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.putshow{
    width: 30%;
    text-align: center;
    position: absolute;

}



</style>