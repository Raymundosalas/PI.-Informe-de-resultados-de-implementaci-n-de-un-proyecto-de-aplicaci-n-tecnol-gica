<template>

<div>

<h2>Pacientes</h2>

<input
v-model="nombre"
placeholder="Nombre"
/>

<input
v-model="telefono"
placeholder="Telefono"
/>

<input
v-model="correo"
placeholder="Correo"
/>

<button @click="guardar">

Guardar

</button>

<hr>

<table>

<tr>
<th>ID</th>
<th>Nombre</th>
<th>Telefono</th>
<th>Correo</th>
<th>Acciones</th>
</tr>

<tr
v-for="p in pacientes"
:key="p.id"
>

<td>{{p.id}}</td>
<td>{{p.nombre}}</td>
<td>{{p.telefono}}</td>
<td>{{p.correo}}</td>

<td>

<button @click="eliminar(p.id)">
Eliminar
</button>

</td>

</tr>

</table>

</div>

</template>

<script setup>

import {
ref,
onMounted
}
from 'vue'

const pacientes = ref([])

const nombre = ref('')
const telefono = ref('')
const correo = ref('')

const token =
localStorage.getItem('token')

const cargar = async()=>{

 const res = await fetch(
 'http://localhost:3000/api/pacientes',
 {
  headers:{
   Authorization:token
  }
 }
 )

 pacientes.value = await res.json()

}

const guardar = async()=>{

 await fetch(
 'http://localhost:3000/api/pacientes',
 {
  method:'POST',

  headers:{
   'Content-Type':'application/json',
   Authorization:token
  },

  body:JSON.stringify({
   nombre:nombre.value,
   telefono:telefono.value,
   correo:correo.value
  })

 })

 cargar()

}

const eliminar = async(id)=>{

 await fetch(
 `http://localhost:3000/api/pacientes/${id}`,
 {
  method:'DELETE',

  headers:{
   Authorization:token
  }
 })

 cargar()

}

onMounted(()=>{
 cargar()
})

</script>
