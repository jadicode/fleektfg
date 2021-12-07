# Fleek - E-Commerce.
- Fleek es un prototipo de tienda online que vende productos relacionados con la tecnología.

## Lenguajes empleados:
- ReactJS
- HTML
- CSS
- NodeJS
- Docker para base de datos (MariaDB)

## Cómo iniciar Fleek
- Lo primero de todo, necesitas tener instalado **Docker**, **NodeJS** y **Visual Studio Code** para ejecutar todos los procesos necesarios para que Fleek arranque.
- Una vez todo listo, instala la extensión **Docker** en Visual Studio Code desde su tienda de extensiones.
- Abre el directorio completo en Visual Studio Code.
- Localiza la carpeta *server* y click derecho en el archivo "docker-compose.yml" > Compose-Up (Con esto iniciamos la base de datos necesaria para el servidor).
- Ahora, para ejecutar el servidor, abre la terminal y ubícate en */server/*, cuando estés inicia el servidor escribiendo **npm start**.
- Por último, ubícate en /client/, abre la terminal instala las dependencias con el comando "npm install" y seguidamente ejecuta **npm run start** para iniciar Fleek!!


### Roles en Fleek
- No usuario: Puedes comprar pero no acceder a sitios determinados en Fleek. Como por ejemplo, /fleekocasion.
- Usuario: Puedes comprar, acceder a /fleekocasion y editar tus ajustes.
- Admin: Puedes comprar, acceder a todas las rutas, ver pedidos individuales, ver pedidos múltiples, subir productos a fleek, ver productos y eliminar productos.

### Usuarios de Prueba:
- Rol de usuario: Javier/Pestillo10
- Rol de administrador: admin/admin
