<template>
  <div>
    <h1>Log Out</h1>

    <p v-if="currentUser">
      Current User: {{ currentUser.email }}
    </p>

    <p v-else>
      No user is currently signed in.
    </p>

    <button @click="logout">
      Log Out
    </button>

    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signOut } from 'firebase/auth'

const auth = getAuth()

const currentUser = ref(auth.currentUser)
const message = ref('')

const logout = () => {
  console.log('Current User Before Logout:', auth.currentUser)

  signOut(auth)
    .then(() => {
      currentUser.value = auth.currentUser

      console.log('Firebase Log Out Successful!')
      console.log('Current User After Logout:', auth.currentUser)

      message.value = 'Log out successful!'
    })
    .catch((error) => {
      console.log('Firebase Log Out Failed')
      console.log('Error code:', error.code)
      console.log('Error message:', error.message)

      message.value = error.code
    })
}
</script>