<script lang="ts">
import Logo from '@/components/logo/Logo.vue'
import { ref } from 'vue'
import { useUserStore } from '@stores/UserStore'
import { router } from '@/main'
import { login } from '@api/UserAPI'

export default {
  props: [],
  components: {
    Logo
  },
  setup() {
    // USER STORE
    const userStore = useUserStore()

    // FORM INPUTS
    const email = ref('')
    const password = ref('')
    const alert = ref('')

    async function handleSubmit() {
      try {
        login(email.value, password.value).then((response: any) => {
          if (response.status === 400) {
            alert.value = 'Wprowadzono błędne dane'
          } else {
            console.log(response.data)
            userStore.login(response.token)
            router.push('/')
            console.log(userStore.isLoggedIn)
          }
        })

        // if (response.status === 200) {
        //   // Login successful
        //   userStore.login(response.token)
        //   router.push({ path: '/' })
        // } else if (response.status === 400) {
        //   // Bad request, incorrect credentials
        //   alert.value = 'Wprowadzono błędne dane'
        // } else {
        //   // Handle other status codes as needed
        //   alert.value = 'Wystąpił błąd podczas logowania'
        // }
      } catch (error) {
        console.error(error)
        alert.value = 'Wystąpił błąd podczas logowania'
      }
    }
    return {
      alert,
      email,
      password,
      handleSubmit
    }
  }
}
</script>

<template>
  <div class="flex flex-row w-full h-screen justify-between items-start gap-6 mb-3">
    <div class="flex flex-col w-full h-screen bg-neutral-300">
      <Logo />
    </div>

    <!-- FROM -->
    <div class="flex flex-col w-full h-screen bg-neutral-300 justify-center items-center gap-4">
      <div class="flex flex-col w-60 items-start">
        <h1 class="text-2xl font-slab">Witaj</h1>
        <h1 class="text-2xl font-slab">Ponownie!</h1>
      </div>
      <div class="flex flex-col w-60">
        <label htmlFor="mail-input">Adres e-mail</label>
        <input type="text" id="mail-input" v-model="email" />
      </div>
      <div class="flex flex-col w-60">
        <label htmlFor="mail-input">Hasło</label>
        <input type="password" id="password-input" v-model="password" />
      </div>
      <button class="bg-primary-400 w-60 py-1 rounded-lg" @click="handleSubmit">Zaloguj się</button>

      <span class="text-red-600">{{ alert }}</span>
    </div>
  </div>
</template>
