# Cómo actualizar el sitio en Hostinger (paso a paso)

Sitio: **bricklerginecologia.com**
Cuando le entregue una actualización, siga esta guía. Son unos 5 minutos.

## Antes de empezar

- Le mando un archivo `.zip` con el sitio completo, y le digo **qué archivos cambiaron** (por ejemplo: "solo cambió index.html").
- Guárdelo en su computadora (carpeta Descargas).
- Si le explico que solo cambió `index.html`, puede subir solo ese archivo y saltarse el resto.

## Paso 1. Prepare los archivos en su computadora

1. Haga **doble clic** sobre `sitio-dra-brickler.zip`. En Mac se crea una carpeta con el mismo nombre.
2. Ábrala. Debe ver dentro: el archivo `index.html` y la carpeta `assets`.

## Paso 2. Entre al administrador de archivos de Hostinger

1. Abra **hpanel.hostinger.com** e inicie sesión.
2. Toque **Websites** (menú de la izquierda).
3. En **bricklerginecologia.com**, toque **Manage** (Administrar).
4. En el menú de la izquierda, abra **Files** y luego **File Manager**.
5. Toque la tarjeta de la izquierda: **"Access files of bricklerginecologia.com"**.
6. Se abre una pestaña nueva. Entre a la carpeta **public_html** (toque su nombre).

> No toque la tarjeta de la derecha ("Access all files of Unlimited Web Hosting").

## Paso 3. Suba los archivos nuevos (forma más simple)

Dentro de **public_html**:

1. Toque el ícono de la **flecha hacia arriba** (Upload), arriba a la derecha.
2. Se abre una ventana con dos opciones: **File** y **Folder**.
3. Para el archivo de la página:
   - Toque **File**, elija `index.html` de la carpeta que abrió en el Paso 1 y suba.
4. Para las imágenes y el video (solo si le dije que cambiaron):
   - Toque otra vez Upload, elija **Folder**, y seleccione la carpeta `assets`.
5. Si le pregunta si quiere **reemplazar** (replace / overwrite) archivos que ya existen, diga **sí**.
6. Espere a que termine la barra de progreso.

## Paso 4. Revise que quedó bien ubicado

Dentro de **public_html** deben estar, directamente:

- `index.html`
- la carpeta `assets`

No deben estar dentro de otra carpeta (por ejemplo `sitio`).
Si ve una carpeta extra, mándeme una captura y le digo qué hacer.

## Paso 5. Mire el sitio

1. Abra **bricklerginecologia.com** en una pestaña nueva.
2. Para ver los cambios, recargue sin memoria guardada:
   - Mac: **Cmd + Shift + R**
   - Windows: **Ctrl + Shift + R**
3. En el celular, cierre la pestaña y vuelva a abrir el sitio.

## Si algo no sale

- **Sigue viéndose el sitio anterior:** espere unos minutos y recargue con Cmd + Shift + R.
- **Aparece un error o una página en blanco:** mándeme una captura del File Manager, con la carpeta `public_html` abierta.
- **Mensaje "409 Conflict":** significa que intentó mover o extraer archivos que ya existen. No pasa nada. Borre el archivo repetido y suba de nuevo, o avíseme.
- **No puede subir una carpeta:** use la forma 2 (abajo).

---

## Forma 2: subir el .zip y extraerlo

Úsela solo si la forma simple no le funciona.

1. En **public_html**, **borre** `index.html` y la carpeta `assets` anteriores. Selecciónelos y toque el bote de basura.
2. Suba el `.zip` con **Upload > File**.
3. Seleccione el `.zip` y toque el ícono de **Extract**.
4. En "Choose folder name" escriba `sitio` (no deja dejarlo vacío) y toque **EXTRACT**.
5. Entre a la carpeta `sitio`. Seleccione `assets` e `index.html`.
6. Toque la flecha **Move**. Haga **doble clic** sobre **".."** hasta que diga `/files/public_html/` y toque **MOVE**.
7. Borre la carpeta `sitio` vacía y el `.zip`.
8. Revise, como en el Paso 4.

## Lo que no debe tocar

- No elija "Connect with GitHub" ni plantillas en Hostinger.
- No compre VPS ni extensiones.
- No borre otras carpetas de `public_html` que no reconozca. Si duda, pregúnteme.
