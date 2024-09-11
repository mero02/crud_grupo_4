from typing import List
from sqlalchemy.orm import Session
from src.example.models import Producto
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
    return db_producto.update(db, producto)


def eliminar_producto(db: Session, producto_id: int) -> Producto:
    db_producto = leer_producto(db, producto_id)
    db_producto.delete(db)
    return db_producto
