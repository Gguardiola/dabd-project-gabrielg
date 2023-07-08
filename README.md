Proyecto de base da datos UPC - EPSEVG
# Introducción
Esta aplicación utiliza las tecnologias **NextJS, React y Prisma.**

El objetivo de esta aplicación es gestionar una base de datos relacional a través de Prisma para satisfacer operaciones CRUD, evitar SQL injection y la optimización de consultas complicadas.

# Contexto

Queremos hacer una base de datos que almacene la información y el trabajo realizado de la tripulación de naves espaciales de la corporación "Among Us Corporation".


De cada nave conocemos su nombre cómo identificador único (por ejemplo Nostromo), el modelo de la nave (pueden haber diferentes naves que sean el mismo modelo, cómo un coche) y su color para que haya menos confusión.


Existen personas que realizan viajes cómo tripulantes de estas naves. Estas personas se identifican por su ID, fecha de nacimiento y nombre.


Cada nave lleva tripulantes (viaje_tripulante), de los cuales nos interesa tener fecha de abordaje en la nave, un ID del viaje.


En caso de que una persona desee cambiarse de nave, su viaje_tripulante se mantendrá con el fin de conservar la información cómo ingeniero/supervisor en esa nave. Cuando se monte en una nueva nave tendrá una nueva identificación viaje_tripulante y sabremos en que nave se encuentra en ese momento a través de la fecha_abordaje más reciente.


En caso de volver a una nave anteriormente visitada, se registrará un nuevo viaje_tripulante con una nueva fecha_abordaje. Así podemos identificar cuantas veces ha embarcado y todas sus tareas (en caso de ser ingeniero) o supervisiones (en caso de ser supervisor) realizadas en cada viaje.


Estos tripulantes pueden ser ingenieros, que se dedican a la realización de multiples tareas, o supervisores, los cuales se encargarán de supervisar a los ingenieros.


Cada tarea lleva su ID y una descripción de la tarea. En el momento en el que un ingeniero comienza una tarea se registrará la fecha de inicio junto con el sector de la nave en el que se realizó (puede ser que haga falta reparar una tuberia en la cocina y también en el baño). Los ingenieros además están obligados a tener que realizar un informe de las tareas realizadas para su supervisión. La finalización de las tareas se definen por una fecha_fin, la cual constará vacia hasta su finalización.


Los informes de las tareas se componen por un veredicto de cada ingeniero que ha realizado esa tarea. Este veredicto constará vacio hasta que se haya finalizado la tarea.


Cabe destacar que unicamente los ingenieros pueden realizar tareas. Varios ingenieros pueden trabajar en diferentes tareas al mismo tiempo. Las tareas pueden ser realizadas por varios ingenieros y es posible que hayan tareas sin ingenieros e ingenieros sin tareas.


Cada tripulante supervisor puede estar supervisando uno o varios ingenieros, o ninguno y pueden haber ingenieros que no estén supervisados. Cómo la corporación Among Us se dedica integramente la investigación del cosmos, estos supervisores pertenecen a empresas subcontratadas dedicadas integramente a esta función. Por seguridad se registrará a que empresa pertenece cada supervisor, identificandose con la ID de empresa y el nombre. Cada supervisor pertenece a una empresa y cada empresa tiene uno o más supervisores.

## UML

![ImagenUML](https://i.imgur.com/uuIOYak.png)

## Vista previa de la app

![ImagenDEMO](https://i.imgur.com/FTxbe30.jpg)

