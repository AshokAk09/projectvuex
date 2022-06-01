<template>
    <div  v-colors:colorful="choose" id="show-members">
     <!-- <input v-focus type="text" v-model="choose" placeholder="Search">
      <input v-bfocus type="text" v-model="bchoose" placeholder="bSearch"> -->

        <h1>CLASS MEMBERS </h1>
       <ul v-scroll="handleScroll">
           
        <li v-for="member in allmembers" :key="member.id"> 
            
            <router-link  v-bind:to ="'/home/member/'+member.id" exact>{{member.Name}}</router-link>
            <router-link v-bind:to ="'/home/memberput/'+member.id" exact><button class="upd">U</button>
</router-link>
            <button class="del " @click="deletemembers(member.id)">x</button>
        </li>
        <img id="load" v-if="check" src="../assets/loading-buffering.gif" height="40px">
        </ul>
     
    </div>
</template>  

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex"; 

//import axios from 'axios';

export default {
  data(){
    return{
      temp:0,
      fornow:null,
      check:true,
      choose:"",
      bchoose:"",
      payload:{
        pn:1,
        lt:9  ,
        to:null,
        page:null
      }
    }
  },
  created() {
     this.$http.get('/user?_page=1')
            .then(
                (data)=>{
                let head=data.headers.get('x-total-count')
                this.payload.page = Math.ceil((head)/3)
                console.log(this.payload.page)
                this.payload.to=parseInt(head);
                console.log(this.payload)
                this.callme(this.payload);
               
                this.payload.pn=3

                })
    try {
      console.log("ok");
    } catch (err) {
      console.log(err);
    }
          
  },
 /* watch: {
      allmembers() {
       
        this.check = 0
    }
  },*/
  computed:mapGetters(["allmembers"]),
  methods: { 
  callme(payload){
     this.$store.dispatch('getmembers',payload).then((data)=>{
       console.log(data)
        if(data == true){
          this.check=false
        }else{
          this.callme(this.payload)
        }
      })  
     
        
    },
      handleScroll(el){
      console.log(typeof(this.allmembers.length))
      console.log(this.allmembers.__ob__.value)
      let scrollTop = el.scrollTop
      let docHeight = el.scrollHeight;
      let winHeight = el.offsetHeight;
      let scrollPercent = scrollTop / (docHeight-winHeight);
      let scrollPercentRounded = Math.round(scrollPercent * 100);
      //console.log("scp="+scrollPercent)
      console.log("total= "+scrollPercentRounded)
      //console.log("scrool"+scrollTop)
      //console.log("body="+docHeight)
      //console.log("window="+winHeight)
     // if(scrollPercentRounded >= 97 && (this.$store.state.forget==0))
     console.log("control = "+ this.check)
     //console.log(scrollPercentRounded >= 97) 
     console.log(scrollPercentRounded >= 97 && this.check == false)
      if(scrollPercentRounded >= 97 && this.check == false && this.payload.pn<this.payload.page)
      {
      this.check = true;
      console.log(this.check == 0)
      this.payload.pn+=1;
      this.payload.lt=3;  
      this.callme(this.payload);
      }
    
      /*if(scrollPercentRounded == 100 && (this.payload.pn != this.payload.page) && this.check==1)
      { 
       
        this.check=true;
                console.log(this.check)

      }
      else{
        
        this.check=false;
        console.log(this.check)
      }
        */  
        this.temp+=this.payload.lt
        console.log(this.payload.to),
        console.log(this.temp)
        console.log(this.payload.pn==this.payload.page)
       
        return this.payload.pn==this.payload.page
      },
      
      ...mapActions(["getmembers",
                    "deletemembers"]),
     
  },
    directives:{
    colors:{
  update(el,binding){
    if(binding.arg == 'colorful'){
      el.style.background=binding.value;
    }
  }
}
  }
};
</script>
<style scoped>
h4{
    color: black;
}
#show-members{
    max-width: 50%;
    color: black;
    height: 100%;
}
ul{
    display: inline-block;
    background:rgb(255, 209, 149);
    margin: 20px;
    padding:20px;
    width: 50%;
    max-height: 400px;
    overflow: auto;
}
li{
  display: block; 
  padding: 20px; 
  margin: 20px 0;
  text-align: left;

}

ul li {
  background: rgb(254, 249, 242);
  color: rgb(221, 221, 232);
  margin: 5px;
  }

li:hover{
    background:rgb(255, 209, 149);
    display: block;
}

li:hover .del{
  background: rgb(254, 249, 242);
display:inline-block;
}
li:hover .upd{
  background: rgb(254, 249, 242);
display:inline-block;
}

.del{
    display: none;
    width: 20px;
    background: #000;
    cursor: pointer;
    color: #000;
}
.upd{
        display: none;
    width: 20px;
    color: #000;
}
</style>