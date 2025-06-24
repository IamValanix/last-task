# Last Task

## Bakery y BakeryBackend
Versión con base de datos que utiliza:
- **Backend**: Flask + PostgreSQL (base de datos local)
- **Frontend**: React + Vite + TypeScript
- **Estilos**: Tailwind CSS

### Rutas principales:

1. **`/`** - Login  
   Página de inicio de sesión para usuarios registrados. Contiene un botón para redirigir al registro si no se tiene cuenta.

2. **`/register`** - Registro  
   Permite crear nuevas cuentas. Después del registro, redirige al login para iniciar sesión.

3. **`/landing`** - Catálogo  
   Muestra los productos disponibles de la panadería.

4. **`/admin`** - Panel de administración  
   Área exclusiva para administradores con funcionalidades CRUD para gestionar usuarios.

---

## Bakery Serverless
Versión simplificada sin backend que utiliza LocalStorage.

### Rutas principales:

1. **`/`** - Registro  
   Permite crear usuarios nuevos (almacenados en LocalStorage). Redirige al login después del registro.

2. **`/login`** - Autenticación  
   Permite iniciar sesión con usuarios registrados. Al autenticarse, redirige al panel de admin.

3. **`/admin`** - Administración  
   Panel para modificar y eliminar usuarios almacenados en LocalStorage.

> **Nota importante**: En la versión con base de datos, la restricción de acceso se implementa en la barra de búsqueda de la ruta `/landing`.
