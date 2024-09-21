from typing import List
from sqlalchemy.orm import Session
from src.example.models import Producto, Cliente, Pedido
from src.example import schemas, exceptions

# operaciones CRUD para Producto

def crear_producto(db: Session, producto: schemas.ProductoCreate) -> Producto:
    return Producto.create(db, nombre=producto.nombre, precio=producto.precio)

def listar_productos(db: Session) -> List[Producto]:
    return Producto.get_all(db)


def leer_producto(db: Session, producto_id: int) -> Producto:
    db_producto = Producto.get(db, producto_id)
    if db_producto is None:
        raise exceptions.ProductoNoEncontrado()
    return db_producto


def modificar_producto(
    db: Session, producto_id: int, producto: schemas.ProductoUpdate
) -> Producto:
    db_producto = leer_producto(db, producto_id)
    return db_producto.update(db, nombre=producto.nombre, precio=producto.precio)


def eliminar_producto(db: Session, producto_id: int) -> Producto:
    db_producto = leer_producto(db, producto_id)
    db_producto.delete(db)
    return db_producto

# CRUD para Cliente
def crear_cliente(db: Session, cliente: schemas.ClienteCreate) -> Cliente:
    return Cliente.create(db, nombre=cliente.nombre, email=cliente.email)

def listar_clientes(db: Session) -> List[Cliente]:
    return Cliente.get_all(db)

def leer_cliente(db: Session, cliente_id: int) -> Cliente:
    db_cliente = Cliente.get(db, cliente_id)
    if db_cliente is None:
        raise exceptions.ClienteNoEncontrado()
    return db_cliente

def modificar_cliente(db: Session, cliente_id: int, cliente: schemas.ClienteUpdate) -> Cliente:
    db_cliente = leer_cliente(db, cliente_id)
    return db_cliente.update(db, nombre=cliente.nombre, email=cliente.email)

def eliminar_cliente(db: Session, cliente_id: int) -> Cliente:
    db_cliente = leer_cliente(db, cliente_id)
    db_cliente.delete(db)
    return db_cliente

# CRUD para Pedido
def crear_pedido(db: Session, pedido: schemas.PedidoCreate) -> Pedido:
    return Pedido.create(db, cliente_id=pedido.cliente_id, producto_id=pedido.producto_id, cantidad=pedido.cantidad)

def listar_pedidos(db: Session) -> List[Pedido]:
    return Pedido.get_all(db)

def leer_pedido(db: Session, pedido_id: int) -> Pedido:
    db_pedido = Pedido.get(db, pedido_id)
    if db_pedido is None:
        raise exceptions.PedidoNoEncontrado()
    return db_pedido

def modificar_pedido(db: Session, pedido_id: int, pedido: schemas.PedidoUpdate) -> Pedido:
    db_pedido = leer_pedido(db, pedido_id)
    return db_pedido.update(db, cliente_id=pedido.cliente_id, producto_id=pedido.producto_id, cantidad=pedido.cantidad)

def eliminar_pedido(db: Session, pedido_id: int) -> Pedido:
    db_pedido = leer_pedido(db, pedido_id)
    db_pedido.delete(db)
    return db_pedido