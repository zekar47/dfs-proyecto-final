<template>
  <div class="google-sign-in">
    <div id="google-signin-button"></div>
    
    <!-- Botón fallback si Google Sign-In no carga -->
    <button 
      v-if="showFallback"
      @click="handleGoogleSignIn"
      class="google-button"
      :disabled="isLoading"
    >
      <svg class="google-icon" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      {{ isLoading ? 'Conectando...' : 'Continuar con Google' }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['success', 'error'])
const isLoading = ref(false)
const showFallback = ref(false)

// Cargar Google Identity Services
const loadGoogleScript = () => {
  return new Promise((resolve, reject) => {
    if (window.google) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    
    script.onload = () => {
      setTimeout(() => {
        if (window.google) {
          resolve()
        } else {
          reject(new Error('Google Identity Services failed to load'))
        }
      }, 100)
    }
    
    script.onerror = () => {
      reject(new Error('Failed to load Google Identity Services'))
    }
    
    document.head.appendChild(script)
  })
}

// Inicializar Google Sign-In
const initializeGoogleSignIn = async () => {
  try {
    // Temporalmente desactivamos Google Sign-In real hasta tener credenciales válidas
    showFallback.value = true
    
    // Descomenta esta sección cuando tengas un Client ID válido
    /*
    await loadGoogleScript()
    
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: 'TU_CLIENT_ID_AQUI', // Reemplaza con tu Client ID real
        callback: handleGoogleResponse,
        auto_select: false,
        cancel_on_tap_outside: true
      })

      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        {
          theme: 'filled_black',
          size: 'large',
          shape: 'rectangular',
          text: 'signin_with',
          logo_alignment: 'left',
          width: '100%'
        }
      )
    } else {
      showFallback.value = true
    }
    */
  } catch (error) {
    console.error('Error initializing Google Sign-In:', error)
    showFallback.value = true
  }
}

// Manejar respuesta de Google
const handleGoogleResponse = async (response) => {
  try {
    isLoading.value = true
    
    // Decodificar el JWT token
    const payload = JSON.parse(atob(response.credential.split('.')[1]))
    
    const userData = {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      given_name: payload.given_name,
      family_name: payload.family_name,
      token: response.credential
    }

    emit('success', userData)
    
  } catch (error) {
    console.error('Error processing Google response:', error)
    emit('error', 'Error al procesar la respuesta de Google')
  } finally {
    isLoading.value = false
  }
}

// Fallback para cuando Google Sign-In no está disponible
const handleGoogleSignIn = async () => {
  try {
    isLoading.value = true
    
    // Simulación - en producción esto redirigiría a Google OAuth
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Datos de prueba - reemplazar con implementación real
    const mockUserData = {
      email: 'usuario@gmail.com',
      name: 'Usuario de Prueba',
      picture: 'https://picsum.photos/seed/user123/100/100.jpg',
      given_name: 'Usuario',
      family_name: 'de Prueba',
      token: 'mock_token_' + Date.now()
    }

    emit('success', mockUserData)
    
  } catch (error) {
    console.error('Error en Google Sign-In fallback:', error)
    emit('error', 'Error al iniciar sesión con Google')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  // Mostrar fallback inmediatamente para evitar errores
  showFallback.value = true
  
  // Cuando tengas credenciales válidas, descomenta esta línea:
  // initializeGoogleSignIn()
})
</script>

<style scoped>
.google-sign-in {
  width: 100%;
  margin: 10px 0;
}

.google-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background: white;
  border: 1px solid #dadce0;
  border-radius: 8px;
  color: #3c4043;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.google-button:hover:not(:disabled) {
  background: #f8f9fa;
  border-color: #dadce0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transform: translateY(-1px);
}

.google-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.google-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

/* Estilos para el botón de Google original */
#google-signin-button {
  width: 100%;
  display: flex;
  justify-content: center;
}

#google-signin-button > div {
  width: 100% !important;
}

/* Responsive */
@media (max-width: 480px) {
  .google-button {
    padding: 10px 12px;
    font-size: 13px;
  }
  
  .google-icon {
    width: 16px;
    height: 16px;
  }
}
</style>
