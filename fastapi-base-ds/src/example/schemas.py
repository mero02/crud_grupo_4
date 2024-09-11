from pydantic import BaseModel, EmailStr, field_validator
from typing import List
from datetime import datetime
from src.example.constants import ErrorCode
from src.example import exceptions

# Los siguientes schemas contienen atributos sin muchas restricciones de tipo.
# Podemos crear atributos con ciertas reglas mediante el uso de un "Field" adecuado.
# https://docs.pydantic.dev/latest/concepts/fields/


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
