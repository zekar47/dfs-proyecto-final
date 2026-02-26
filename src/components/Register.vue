<template>
  <div class="container">
    <img src="/six.png" class="logo" alt="SIX Logo" />

    <h1>Registro</h1>

    <div class="card">
      <input 
        v-model="name" 
        placeholder="Nombre" 
        :class="{ 'error': errors.name }"
        @blur="validateName"
      />
      <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
      
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
      
      <input 
        v-model="confirmPassword" 
        type="password" 
        placeholder="Confirmar contraseña"
        :class="{ 'error': errors.confirmPassword }"
        @blur="validateConfirmPassword"
      />
      <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>

      <button 
        @click="registerUser" 
        :disabled="isLoading"
        class="primary-button"
      >
        {{ isLoading ? 'Creando cuenta...' : 'Crear cuenta' }}
      </button>

      <button class="secondary" @click="$router.push('/')">
        Volver al login
      </button>
    </div>

    <div v-if="message" class="message" :class="messageType">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errors = ref({})
const isLoading = ref(false)
const message = ref('')
const messageType = ref('')

const validateName = () => {
  if (!name.value) {
    errors.value.name = 'El nombre es requerido'
    return false
  }
  if (name.value.length < 2) {
    errors.value.name = 'El nombre debe tener al menos 2 caracteres'
    return false
  }
  delete errors.value.name
  return true
}

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

const validateConfirmPassword = () => {
  if (!confirmPassword.value) {
    errors.value.confirmPassword = 'Confirma tu contraseña'
    return false
  }
  if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'Las contraseñas no coinciden'
    return false
  }
  delete errors.value.confirmPassword
  return true
}

const showMessage = (text, type = 'success') => {
  message.value = text
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 3000)
}

const registerUser = async () => {
  // Validar todos los campos
  const isNameValid = validateName()
  const isEmailValid = validateEmail()
  const isPasswordValid = validatePassword()
  const isConfirmPasswordValid = validateConfirmPassword()
  
  if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
    showMessage('Por favor corrige los errores', 'error')
    return
  }

  isLoading.value = true
  
  try {
    // Simulación de registro - aquí iría la llamada real a la API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    showMessage('¡Cuenta creada exitosamente!', 'success')
    
    // Limpiar formulario
    name.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    
    // Redirigir al login después de 2 segundos
    setTimeout(() => {
      $router.push('/')
    }, 2000)
    
    console.log('Usuario registrado:', { 
      name: name.value, 
      email: email.value 
    })
    
  } catch (error) {
    showMessage('Error al crear la cuenta', 'error')
    console.error('Error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>