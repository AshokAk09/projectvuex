import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false

import VueResources from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes'
import { store } from './store/store';

Vue.use(VueResources);
Vue.use(VueRouter);
/*
Vue.directive('scroll', {
  bind(){
    console.log(store.getters)
  },
  inserted: function (el, binding) {
    
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})*/

Vue.directive('scroll', {
  inserted(el,binding) {
    let f = function () {
      console.log(store.state.forgets)
     // console.log(typeof(binding.value))
      if (binding.value(el)) {
        el.removeEventListener('scroll', f)
      }
    }
    el.addEventListener('scroll', f)
  }

    //window.addEventListener("scroll", function et () {
      //console.log(window.pageYOffset)
      
      
      /*
      console.log("before - "+y)
      if (window.pageYOffset > y){
          y=y+185;
        console.log("reached - "+y)
        console.log(evt)
        //console.log(binding.value(evt)
    
        if (binding.value(evt, el)) {
          console.log("eroor")
         // window.removeEventListener('scroll', et())
        }

              }*/

    }),



  Vue.directive('bfocus', {
    bind(el) {
      console.log("bind - " + el.parentNode)
      el.focus()
      console.log("done")
      el.style.background = "lightgrey"
    }
  })


Vue.directive('focus', {
  inserted(el) {
    console.log("inserted - " + el.parentNode)
    el.focus()
    console.log("done")
    el.style.background = "lightgrey"
  }
})

/*Vue.directive('colors',{
  update(el,binding){
    if(binding.arg == 'colorful'){
      el.style.background=binding.value;
    }
  }
})
*/




Vue.directive('search', {
  bind() {
    console.log("binded")
  },
  componentUpdated(el, binding, Vnode) {
    console.log(Vnode.children[0].text)
    el.innerHTML = Vnode.children[0].text
    console.log(el)

    console.log(binding.value)
    let ak = el.innerHTML.replaceAll(binding.value, '<span style="background:rgb(255, 209, 149)">' + binding.value + '</span>')
    console.log(binding.value)
    console.log(el)
    console.log(ak)
    el.innerHTML = ak
    console.log(Vnode)
    console.log(el)
    //console.log(document.querySelector("span"))

    console.log(el)
    console.log(Vnode)


  },
  unbind() {
    console.log("unbind")
  }
}),

  Vue.directive('sample', {
    update(el, binding) {
      console.log("component updated = " + el.innerHTML)
      //el.innerHTML=binding.value;
      //console.log("component updated = " + el.innerHTML)

      let pattern = binding.value;

      console.log(pattern)
      el.style.color = "red"



      //var ind = el.innerHTML.slice
      //el.querySelector('span').style.color="red"
      //targets.stu




      //var arr=high.match(binding.arg)
      //console.log(binding.arg)
      //el.style.color="red"
    }
  })



const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});




new Vue({
  store: store,
  router: router,
  render: h => h(App),
}).$mount('#app') 