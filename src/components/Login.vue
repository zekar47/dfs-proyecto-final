<template>
  <div class="container">
    <img src="/six.png" class="logo" alt="SIX Logo" />

    <h1>Login</h1>

    <div class="card">
      <input 
        v-model="email" 
        placeholder="Correo" 
        type="email"
        :class="{ 'error': errors.email }"
        @blur="validateEmail"
      />
      <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
      
      <input 
        v-model="password" 
        type="password" 
        placeholder="Contraseña"
        :class="{ 'error': errors.password }"
        @blur="validatePassword"
      />
      <span v-if="errors.password" class="error-message">{{ errors.password }}</span>

      <button 
        @click="loginUser" 
        :disabled="isLoading"
        class="primary-button"
      >
        {{ isLoading ? 'Ingresando...' : 'Ingresar' }}
      </button>

      <!-- Separador -->
      <div class="divider">
        <span>o</span>
      </div>

      <!-- Botón de Google Sign-In -->
      <GoogleSignIn 
        @success="handleGoogleSuccess"
        @error="handleGoogleError"
      />

      <button class="secondary" @click="$router.push('/register')">
        Registrarse
      </button>
    </div>

    <div v-if="message" class="message" :class="messageType">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GoogleSignIn from './GoogleSignIn.vue'

const email = ref('')
const password = ref('')
const errors = ref({})
const isLoading = ref(false)
const message = ref('')
const messageType = ref('')

const validateEmail = () => {
  if (!email.value) {
    errors.value.email = 'El correo es requerido'
    return false
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = 'Ingresa un correo válido'
    return false
  }
  delete errors.value.email
  return true
}

const validatePassword = () => {
  if (!password.value) {
    errors.value.password = 'La contraseña es requerida'
    return false
  }
  if (password.value.length < 6) {
    errors.value.password = 'La contraseña debe tener al menos 6 caracteres'
    return false
  }
  delete errors.value.password
  return true
}

const showMessage = (text, type = 'success') => {
  message.value = text
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 3000)
}

const loginUser = async () => {
  // Validar todos los campos
  const isEmailValid = validateEmail()
  const isPasswordValid = validatePassword()
  
  if (!isEmailValid || !isPasswordValid) {
    showMessage('Por favor corrige los errores', 'error')
    return
  }

  isLoading.value = true
  
  try {
    // Simulación de login - aquí iría la llamada real a la API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    showMessage('¡Login exitoso!', 'success')
    
    // Aquí redirigiríamos al dashboard o página principal
    console.log('Usuario logueado:', { email: email.value })
    
  } catch (error) {
    showMessage('Error al iniciar sesión', 'error')
    console.error('Error:', error)
  } finally {
    isLoading.value = false
  }
}

// Manejar éxito de Google Sign-In
const handleGoogleSuccess = async (userData) => {
  try {
    isLoading.value = true
    
    // Aquí iría la llamada a tu API para registrar/autenticar el usuario de Google
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    showMessage(`¡Bienvenido ${userData.name}!`, 'success')
    
    // Guardar datos del usuario (en producción, guardarías el token)
    localStorage.setItem('user', JSON.stringify(userData))
    
    // Redirigir al dashboard
    console.log('Usuario de Google logueado:', userData)
    
    // Ejemplo de redirección (descomenta cuando tengas dashboard)
    // router.push('/dashboard')
    
  } catch (error) {
    showMessage('Error al procesar la autenticación de Google', 'error')
    console.error('Error:', error)
  } finally {
    isLoading.value = false
  }
}

// Manejar error de Google Sign-In
const handleGoogleError = (errorMessage) => {
  showMessage(errorMessage || 'Error al iniciar sesión con Google', 'error')
}
</script>