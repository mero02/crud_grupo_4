import pytest
from typing import Union
from sqlalchemy.orm import Session
from fastapi.testclient import TestClient
from fastapi import status
from tests.database import app, session
from src.example import exceptions
from src.example.services import (
    listar_productos,
    crear_producto,
    modificar_producto,
    leer_roducto,
    eliminar_producto
)
from src.example.schemas import ProductoCreate, ProductoUpdate


def test_crear_producto(session: Session) -> None:
    nombre = "Pepe"
    precio = 500
    producto_3 = crear_producto(session, ProductoCreate(nombre=nombre, precio=precio))
    assert producto_3.nombre == nombre
    assert producto_3.precio == precio

