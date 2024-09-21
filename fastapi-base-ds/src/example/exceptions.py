from typing import Dict, Any, List, Union
from src.example.constants import ErrorCode
from src.exceptions import NotFound, BadRequest, PermissionDenied

class ProductoNoEncontrado(NotFound):
    DETAIL = ErrorCode.PRODUCTO_NO_ENCONTRADO

class ClienteNoEncontrado(NotFound):
    DETAIL = ErrorCode.CLIENTE_NO_ENCONTRADO

class PedidoNoEncontrado(NotFound):
    DETAIL = ErrorCode.PEDIDO_NO_ENCONTRADO