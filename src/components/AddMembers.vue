<template>
<div>
  <div id="form1">
    <h2>Add a new Member !!</h2>
    <form v-if="!submitted">
        <label>ROLL NO: </label><br>
        <input type="text"   v-model="member.Rollno" required/><br>
        <label>NAME: </label><br>
        <input type="text" v-model="member.Name" required/><br>
        <label>Email:</label><br>
        <input type="email" v-model="member.Email" required/><br>
        <label>PHONE:</label><br>
        <input type="number" v-model="member.Contact" required/><br>
        <input type="image" src="../assets/cp.png">
       
       <!-- <multiselect id = "select" v-model="value" :preselect-first="true" :multiple="false" :clear-on-select="true" :close-on-select="true" :custom-label = "changeme" :options="options" label= "name" track-by= "name" :show-labels="true"  placeholder="Pick a value">
        </multiselect>
        <pre class="language-json"><code>{{ value }}</code></pre>  -->
        <label>DEPARTMENT:</label>
        <multiselect v-model="member.depart" :options="department" placeholder="Department"></multiselect><br>
       <label>SKILLS:</label>
        <multiselect v-model="member.Skill" :options="skillopt" label ="title" :multiple="true" :taggable="true" :clear-on-select="true" tag-placeholder="Add this as new tag" :close-on-select="false" @tag="addSkill" :show-labels="false" placeholder="Tell us your skills"></multiselect>   <br> 
        <label>COUNTRY:</label>
        <multiselect v-model="selectedCountries" id="ajax" label="name" track-by="code" placeholder="Type to search" open-direction="bottom" :options="countries" :multiple="false" :searchable="true" :loading="isLoading" :internal-search="false" :clear-on-select="true" :close-on-select="true"  :max-height="600" :hide-selected="true" @search-change="asyncFind">
</multiselect>  <br>
<multiselect placeholder="Pick action" :value="getvalues" :options="getoptions" :searchable="false" @input="updatevalue"></multiselect>
        <button @click.prevent="checkpost">Submit</button>      
  </form>
    </div>  
    <div v-if="submitted"><multiselect v-model="selectedCountries"  label="name" track-by="code" placeholder="Type to search" open-direction="bottom" :options="countries" :multiple="false" :searchable="true" :loading="isLoading" :internal-search="false" :clear-on-select="true" :close-on-select="true"  @search-change="asyncFind">
</multiselect>  
        <h3> Added Successfully!</h3>
    </div>
</div>
    
</template>



<script>
import Multiselect from 'vue-multiselect'
import { mapActions } from "vuex";
import { mapGetters } from "vuex"; 
import { mapState } from 'vuex'
import countries from '../../src/countries.json'
//import { ajaxFindCountry } from '../../countriesApi'
  export default {

    data(){
        return{
              items:[
                {name:"pen", price:10},
                {name:"pencil", price:5}
              ],
            people:[
              {name:"ashok",age:22},
              {name:"vino" , age:22 },
              {name:"kumaravel",age:52}      
            ],


            selectedCountries: [],
            countries:[],
      

      isLoading: false,
           /* value: '',
           // options: ['Select option', 'options', 'selected', 'mulitple', 'label', 'searchable', 'clearOnSelect', 'hideSelected', 'maxHeight', 'allowEmpty', 'showLabels', 'onChange', 'touched'],           
             options: [
        { name: 'Vue.js', language: 'JavaScript' },
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: 'Laravel', language: 'PHP' },
        { name: 'Phoenix', language: 'Elixir' }
      ],*/
            
            skillopt:[{title:"C",img:"../assets/C.png"},
                      {title:"C++",img:"../assets/C.png"},
                      {title:"Python",img:"../src/assets/C.png"},
                      {title:"HTML",img:"../assets/C.png"},
                      {title:"CSS",img:"/src/assets/C.png"},
                      {title:"JavaScript",img:"/src/assets/C.png"}],
            department:["Automobile Engineering","Biomedical Engineering","Civil Engineering","Computer Science Engineering","Electrical and Electronics Engineering", "Electronics and Communication Engineering","Instrumentation and Control Engineering","Mechanical Engineering","Metallurgical Engineering","Production Engineering","Robotics and Automation", "Bio Technology","Fashion Technology","Information Technology","Textile Technology","Electrical and Electronics Engineering(Sandwich)", "Mechanical Engineering (Sandwich)","Production Engineering (Sandwich)"],
            member:{},
            submitted:false,
            }
    },
    components: {Multiselect},
  computed:{...mapGetters(["getvalues","getoptions"]),...mapState(["value","options"])},
  created(){


let groupedPeople = this.groupBy(this.people, 'age')
console.log(groupedPeople)

        const arr=this.items.reduce((total,item)=>{
          alert(total)
            return item.price + total
        },10)
        console.log(arr)
  },


    methods:{
      groupBy(objectArray, property) {
        console.log(objectArray)
        console.log(property)
  return objectArray.reduce(function (acc, obj) {
    console.log(acc)
    console.log(obj)
    console.log(obj[property])
    let key = obj[property]
    console.log(!acc[key])
    if (!acc[key]) {
      acc[key] = []
      console.log(acc[key])
    }
    acc[key].push(obj)
    console.log(acc)
    return acc
  })
},
 
    asyncFind (query) {
      this.isLoading = true
      this.countries = countries.filter((element) => {
          console.log(element.name.toLowerCase().includes(query.toLowerCase()))
        return element.name.toLowerCase().includes(query.toLowerCase())
      })
      console.log(this.countries)
        this.isLoading = false
  
    },
    clearAll () {
      this.selectedCountries = []
    },

        ...mapActions(["postmembers","updatevalue"]),

    addSkill(skill){
        this.skillopt.push(skill)
        this.member.Skill.push(skill)
        },
/*
       post:function(){

            this.$http.post("/students",this.member,{'content type':'text/json','charset':'utf-8'}).then(function(data){
                console.log(data.body);
                this.member=data.body;
                console.log(this.member)
                this.$emit("new",this.member);
                this.submitted=true;
                this.$router.push({ path: '/home' })
                //console.log()
            });
        },
            changeme({name,language}){
                return `${name}-[${language}]`
            },*/


        checkpost:function(){
            console.log(this.member.Name)
            if(this.member.Name && this.member.Rollno && this.member.Email && this.member.Contact)
            {
                console.log("ak")
                this.postmembers(this.member);
                this.submitted=true;
                this.$router.push({ path: '/home' })

            }
            else{
                alert("Please Fill All the columns")
            }            
        }

    },
  
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
input{
 width: 100%;
  padding: 12px 20px;
  margin: 10px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
#form1{

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



</style>