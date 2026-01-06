# Privacidad del ID de Google Tag Manager

## ¿Es Privado el ID de GTM?

**Respuesta corta**: No, el ID de Google Tag Manager (`GTM-T7WXJGD6`) no es un secreto y está diseñado para ser visible en el código del cliente.

## Consideraciones

### ✅ Es Normal que Sea Público

- Los IDs de GTM/Google Analytics están diseñados para estar en el código del cliente
- Se ejecutan en el navegador del usuario, por lo que son visibles de todas formas
- Es una práctica común tener estos IDs en repositorios públicos
- Muchos proyectos open source los tienen visibles

### ⚠️ Riesgos Potenciales

1. **Datos falsos**: Alguien podría usar tu ID para enviar datos falsos a tu cuenta
   - Google tiene protecciones contra esto
   - Puedes configurar filtros en Google Analytics

2. **Información sobre tu sitio**: El ID puede revelar que usas Google Analytics
   - Esto es información pública de todas formas

3. **No es un secreto de seguridad crítico**: No compromete la seguridad de tu aplicación

## Opciones para Mayor Privacidad

Si prefieres no tener el ID directamente en el código, puedes usar variables de entorno:

### Opción 1: Variable de Entorno (Recomendado)

1. **Crear archivo `.env` en `frontend/`** (NO hacer commit):
   ```
   VITE_GTM_ID=GTM-T7WXJGD6
   ```

2. **Agregar `.env` a `.gitignore`**:
   ```
   frontend/.env
   frontend/.env.local
   ```

3. **Modificar `index.html`** para usar la variable:
   ```html
   <script>
     (function(w,d,s,l,i){
       if(!i) return; // Si no hay ID, no cargar GTM
       w[l]=w[l]||[];
       w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
       var f=d.getElementsByTagName(s)[0],
       j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
       j.async=true;
       j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
       f.parentNode.insertBefore(j,f);
     })(window,document,'script','dataLayer','%VITE_GTM_ID%');
   </script>
   ```

4. **En Vercel**, agregar la variable de entorno:
   - Settings → Environment Variables
   - `VITE_GTM_ID = GTM-T7WXJGD6`

**Nota**: Vite no procesa variables de entorno en `index.html` directamente. Necesitarías usar un plugin o mover el script a JavaScript.

### Opción 2: Script Dinámico en JavaScript

1. **Crear archivo `frontend/src/utils/gtm.js`**:
   ```javascript
   export const initGTM = () => {
     const gtmId = import.meta.env.VITE_GTM_ID
     if (!gtmId) return
     
     window.dataLayer = window.dataLayer || []
     window.dataLayer.push({
       'gtm.start': new Date().getTime(),
       event: 'gtm.js'
     })
     
     const script = document.createElement('script')
     script.async = true
     script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
     document.head.appendChild(script)
   }
   ```

2. **Llamar en `main.jsx`**:
   ```javascript
   import { initGTM } from './utils/gtm'
   initGTM()
   ```

3. **Agregar variable de entorno en Vercel**: `VITE_GTM_ID`

### Opción 3: Mantenerlo Público (Más Simple)

- Es la opción más común y práctica
- El ID no es realmente un secreto
- Google tiene protecciones contra abusos
- Muchos proyectos open source lo hacen así

## Recomendación

**Para un repositorio público**: Mantener el ID visible es aceptable y común. Si quieres mayor privacidad, usa la Opción 2 (script dinámico) con variable de entorno.

**Para un repositorio privado**: No hay problema en tenerlo visible.

## Protecciones en Google Analytics

- Filtros de IP
- Filtros de spam
- Límites de tasa
- Validación de datos

## Conclusión

El ID de GTM no es un secreto crítico. Tenerlo en un repositorio público es una práctica común y aceptable. Si prefieres mantenerlo privado, usa variables de entorno.
