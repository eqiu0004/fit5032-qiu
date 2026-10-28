<template>
  <div>
    <h1>Sign In</h1>

    <p>
      <input
        type="email"
        placeholder="Email"
        v-model="email"
      />
    </p>

    <p>
      <input
        type="password"
        placeholder="Password"
        v-model="password"
      />
    </p>

    <p>
      <button @click="signin">
        Sign in via Firebase
      </button>
    </p>

    <p>{{ message }}</p>

    <div v-if="role">
      <h3>Current Role: {{ role }}</h3>
      <p>Signed in as: {{ currentUserEmail }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const email = ref('')
const password = ref('')
const message = ref('')
const role = ref('')
const currentUserEmail = ref('')

const auth = getAuth()

const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user

      console.log('Firebase Sign In Successful!')
      console.log('Current User:', auth.currentUser)
      console.log('User Email:', user.email)

      currentUserEmail.value = user.email

      if (user.email === 'asiub@qq.com') {
        role.value = 'Admin'
      } else {
        role.value = 'User'
      }

      console.log('Current Role:', role.value)

      message.value = 'Sign in successful!'
    })
    .catch((error) => {
      console.log('Firebase Sign In Failed')
      console.log('Error code:', error.code)
      console.log('Error message:', error.message)

      message.value = error.code
      role.value = ''
      currentUserEmail.value = ''
    })
}
</script>