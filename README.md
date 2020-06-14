## Cátedra de Ingeniería de Software
## Código Asignatura: 03075
## Asignatura: Fundamentos de Programación Web
## Cuatrimestre: II Cuatrimestre 2020
## Proyectos y Tarea

### Resolución de problema
Utilice la herramienta notepad para crear una página html que use Javascript, css y HTML5. Si utiliza otra tecnología cómo páginas JSP, bootstrap el proyecto se calificará con una nota máxima de 20 puntos sobre 100.

Debe cumplir los siguientes requerimientos:
Le empresa Verduritas Frescas S.A. se ha dedicado a hacer entregas de verduras por varios años con pedidos mediante Whastapp. Sin embargo ahora quieren incursionar con una pequeña página web, Muy básica será HTML. Javascript y HTML5. Cada uno de los estilos que usará deberá ser un Css y deberá existir un archivo para todos los javascript que se utilicen.
1. Requieren que un usuario pueda comprar sus productos sin estar registrado. Lo único que necesitan del usuario cada vez que registre una compra es el número de cédula (funcionará para personas físicas y jurídicas) Se debe validar mediante Javascript el formato de la cédula digitada
y si no cumple deberá ponerla en color rojo y desplegar un mensaje de error que indique “Cédula con formato inválido”.
2. Una vez que el usuario ingresó se le desplegará una lista de productos, cada producto deberá tener: Id de producto, una imagen, descripción, costo unitario, cantidad en inventario, fecha de expiración, un campo para que el usuario digite la cantidad requerida (Se debe validar que en
este campo solo se puedan digitar números y que cuando pierda el foco si la cantidad solicitada es mayor que la cantidad en inventario debe poner el campo de cantidad solicitada en rojo y mostrar el mensaje “No contamos con la cantidad del producto que requiere”). Para este caso
deberá tener al menos 10 productos ingresados, recuerde que la página vende verduras.
3. La página deberá tener un botón de pre visualizar pedido. Si se da click ahí y si no hay ningún error de validación de inventario de acuerdo al punto 2. Si el cliente compra más de 5 productos, indiferentemente de si los productos son del mismo tipo o no. Se le hará un descuento del 5% a cada artículo, calculable antes de calcular el monto con el impuesto. El sistema desplegará una tabla en donde se cuente con el resumen del pedido del usuario, para cada producto, se debe aplicar un 13% de IVA. Si hay descuento se debe marcar en verde los datos de las columnas descuento y total sino en celeste. como ejemplo se puede ver la siguiente tabla en el caso en el que si hay descuento.

| Cantidad | Descripción | Precio | Subtotal | Descuento al con | 13 IVA | 
| --- | --- | --- | --- | --- | --- | 
| 2 | Banano | 5 | 10 | 9,5 | 10,735 | 
| 2 | Chayote | 10 | 20 | 19 | 21,47 | 
| 1 | Piña | 15 | 15 | 14,25 | 16,102 | 
| 1 | tomate | 20 | 20 | 19 | 21,47 | 
| Total |  |  |  | | 69,78 |

En el caso que no hay descuento
| Cantidad | Descripción | Precio | Subtotal | Descuento al con | 13 IVA | 
| --- | --- | --- | --- | --- | --- | 
| 1 | Banano | 5 | 5 | 0 | 5,65 | 
| 1 | Chayote | 10 | 10 | 0 | 11,3 | 
| 1 | Piña | 15 | 15 | 0 | 16,95 | 
| 1 | tomate | 20 | 20 | 0 | 22,6 | 
| Total  |  |  |  | | 56,5 |

4. Al final habrá un botón que diga enviar pedido y que indique al usuario que el pedido por el monto (monto de la factura) ha sido enviado.

El estudiante debe grabar video de todas las acciones que considere necesarias para explicar los puntos que se le solicitan, debe contener explicaciones de partes del código fuente. Que por el conocimiento del estudiante son primordiales para el funcionamiento del instrumento.
El estudiante debe presentar el instrumento con todo el código fuente. El video debe ser presentado dentro de una carpeta en el escritorio del servidor virtual que se le asignó. La carpeta debe tener como nombre: Resolución Problema
Cualquier diferencia con el nombre de la carpeta o el lugar en donde esté. Automáticamente la nota que obtendrá en el instrumento es de 20.
Recuerde que en el servidor virtual se guardan todas las acciones que realice, por lo que es requerido que entregue cada instrumento en el tiempo que se ha establecido para hacerlo. No se calificará ningún instrumento que no sea presentado en el servidor virtual, sin excepciones.

| Aspecto a Evaluar | Valor |
| --- | --- |
| Se valida la identificación del usuario de forma correcta | 10 |
| Se despliega la lista de productos de forma correcta y se hacen las validaciones que se solicitan | 25 |
| Despliega el resumen de la compra, aplica formatos correctos para el descuento | 30 |
| Cuando se le da al botón de enviar pedido sale el mensaje final solicitado que indica el monto | 5 |
| Presenta el video explicativo y ahonda en la parte de código más importante. Se demuestra con este video el conocimiento del estudiante del instrumento que presentó. | 30 |
| Total | 100 |
