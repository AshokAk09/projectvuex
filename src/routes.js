import addmembers from './components/AddMembers.vue'
import home from './components/ak-class.vue'
//import singlemember from './components/single-member.vue'
import updatemember from './components/put-member.vue'
import newstoday from './components/TheorySample.vue'
export default[
{
  path:'/',redirect:'/home'
},
{path:'/news',component:newstoday},
  {path:'/home',name:'home',component:home,
  children:[
  {path:'add',component:addmembers},
  //{path:'member/:id',component: singlemember},
 {path:'memberput/:id',component: updatemember}
    
]}
 ]