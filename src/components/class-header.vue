<template>

<nav>
  <ul>
    <li><router-link to="/home" exact>Member List </router-link></li>
    <li><router-link to="/home/add" exact>Add New Member</router-link></li>
  </ul>
</nav>
</template>

<script>

</script>

<style>
ul{
  list-style-type: none ;
  text-align: center;
  margin: 0%;
}
li{
  display: inline-block;
  margin: 0 10px;
}
a{
  color: rgb(0, 0, 0);
  text-decoration: none;
  padding: 6px 8px;
  border-radius: 10px;
}
nav{
  background: rgb(134, 133, 133);
  padding: 14px 0;
  margin-bottom: 40px;
}
.router-link-active{
  background: #eee;
  color:#444
}
</style>
