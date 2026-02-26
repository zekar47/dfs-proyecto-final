# Configuración de Google OAuth para el Login con Google

## 📋 Pasos para configurar Google Sign-In

### 1. Crear proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de **Google Identity Services**

### 2. Configurar OAuth 2.0

1. En el menú izquierdo, ve a **APIs & Services** > **Credentials**
2. Haz clic en **+ CREATE CREDENTIALS** > **OAuth 2.0 Client IDs**
3. Configura lo siguiente:
   - **Application type**: Web application
   - **Name**: SIX Login (o el nombre que prefieras)
   - **Authorized JavaScript origins**: 
     - `http://localhost:5173` (para desarrollo)
     - `https://tudominio.com` (para producción)

4. Haz clic en **Create**
5. **Copia el Client ID** - lo necesitarás para el código

### 3. Actualizar el código

En el archivo `src/components/GoogleSignIn.vue`, reemplaza:

```javascript
client_id: 'TU_CLIENT_ID_AQUI',
```

Con tu Client ID real:

```javascript
client_id: '123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com',
```

### 4. Probar la configuración

1. Reinicia el servidor de desarrollo
2. Abre `http://localhost:5173`
3. Haz clic en "Continuar con Google"
4. Deberías ver la ventana de login de Google

## 🔧 Características implementadas

### ✅ Funcionalidad actual
- **Botón Google Sign-In** con diseño oficial de Google
- **Fallback automático** si Google no carga
- **Manejo de errores** robusto
- **Datos del usuario** (nombre, email, foto, token)
- **Almacenamiento local** de datos del usuario
- **Estados de carga** durante la autenticación

### 📱 Datos que recibes de Google
```javascript
{
  email: "usuario@gmail.com",
  name: "Nombre Apellido",
  picture: "https://lh3.googleusercontent.com/...",
  given_name: "Nombre",
  family_name: "Apellido",
  token: "eyJhbGciOiJSUzI1NiIsImtpZCI6Ij..."
}
```

## 🚀 Próximos pasos (opcional)

### Para producción:
1. **Backend integration** - Valida el token en tu servidor
2. **User database** - Guarda usuarios de Google en tu BD
3. **Session management** - Implementa sesiones seguras
4. **Error handling** - Maneja casos especiales (cuenta suspendida, etc.)

### Mejoras UX:
1. **Auto-login** - Si ya está logueado con Google
2. **Profile picture** - Muestra la foto del usuario
3. **Logout** - Cierra sesión de Google también
4. **Multiple accounts** - Permite cambiar de cuenta

## 🐛 Solución de problemas

### Si el botón de Google no aparece:
1. Revisa que el Client ID sea correcto
2. Verifica que `http://localhost:5173` esté en los orígenes autorizados
3. Revisa la consola del navegador para errores

### Si hay errores de CORS:
1. Asegúrate de que el dominio esté configurado correctamente
2. Verifica que no haya bloqueadores de popup activados

### Si el token es inválido:
1. El token JWT de Google expira en 1 hora
2. En producción, valida el token en tu backend

## 📄 Recursos útiles

- [Google Identity Services Documentation](https://developers.google.com/identity/gsi/web)
- [OAuth 2.0 for Client-side Web Applications](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow)
- [Google Sign-In Button Customization](https://developers.google.com/identity/gsi/web/reference/js-reference)
