from pydantic import BaseModel, EmailStr, field_validator
from typing import List
from datetime import datetime
from src.example.constants import ErrorCode
from src.example import exceptions

# Los siguientes schemas contienen atributos sin muchas restricciones de tipo.
# Podemos crear atributos con ciertas reglas mediante el uso de un "Field" adecuado.
# https://docs.pydantic.dev/latest/concepts/fields/

# Schemas para Producto
class ProductoBase(BaseModel):
    nombre: str
    precio: int


class ProductoCreate(ProductoBase):
    pass


class ProductoUpdate(ProductoBase):
    pass


class Producto(ProductoBase):
    id: int
    fecha_creacion: datetime
    fecha_modificacion: datetime

    # from_atributes=True permite que Pydantic trabaje con modelos SQLAlchemy
    # más info.: https://docs.pydantic.dev/latest/api/config/#pydantic.config.ConfigDict.from_attributes
    model_config = {"from_attributes": True}

# Schemas para Cliente
class ClienteBase(BaseModel):
    nombre: str
    email: str

class ClienteCreate(ClienteBase):
    pass

class ClienteUpdate(ClienteBase):
    pass

class Cliente(ClienteBase):
    id: int
    fecha_creacion: datetime
    pedidos: List["Pedido"] = []

    model_config = {"from_attributes": True}

# Schemas para Pedido
class PedidoBase(BaseModel):
    cliente_id: int
    producto_id: int
    cantidad: int

class PedidoCreate(PedidoBase):
    pass

class PedidoUpdate(PedidoBase):
    pass

class Pedido(PedidoBase):
    id: int
    fecha_creacion: datetime

    model_config = {"from_attributes": True}