from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database import get_db
from src.example import models, schemas, exceptions, services

router = APIRouter()

# Rutas para Producto

@router.post("/productos", response_model=schemas.Producto)
def create_producto(producto: schemas.ProductoCreate, db: Session = Depends(get_db)):
    return services.crear_producto(db, producto)


@router.get("/productos", response_model=list[schemas.Producto])
def read_productos(db: Session = Depends(get_db)):
    return services.listar_productos(db)


@router.get("/productos/{producto_id}", response_model=schemas.Producto)
def read_producto(producto_id: int, db: Session = Depends(get_db)):
    return services.leer_producto(db, producto_id)


@router.put("/productos/{producto_id}", response_model=schemas.Producto)
def update_producto(
    producto_id: int, producto: schemas.ProductoUpdate, db: Session = Depends(get_db)
):
    return services.modificar_producto(db, producto_id, producto)


@router.delete("/productos/{producto_id}", response_model=schemas.Producto)
def delete_producto(producto_id: int, db: Session = Depends(get_db)):
    return services.eliminar_producto(db, producto_id)

# Rutas para Cliente

@router.post("/clientes", response_model=schemas.Cliente)
def create_cliente(cliente: schemas.ClienteCreate, db: Session = Depends(get_db)):
    return services.crear_cliente(db, cliente)

@router.get("/clientes", response_model=list[schemas.Cliente])
def read_clientes(db: Session = Depends(get_db)):
    return services.listar_clientes(db)

@router.get("/clientes/{cliente_id}", response_model=schemas.Cliente)
def read_cliente(cliente_id: int, db: Session = Depends(get_db)):
    return services.leer_cliente(db, cliente_id)

@router.put("/clientes/{cliente_id}", response_model=schemas.Cliente)
def update_cliente(cliente_id: int, cliente: schemas.ClienteUpdate, db: Session = Depends(get_db)):
    return services.modificar_cliente(db, cliente_id, cliente)

@router.delete("/clientes/{cliente_id}", response_model=schemas.Cliente)
def delete_cliente(cliente_id: int, db: Session = Depends(get_db)):
    return services.eliminar_cliente(db, cliente_id)


# Rutas para Pedido

@router.post("/pedidos", response_model=schemas.Pedido)
def create_pedido(pedido: schemas.PedidoCreate, db: Session = Depends(get_db)):
    return services.crear_pedido(db, pedido)

@router.get("/pedidos", response_model=list[schemas.Pedido])
def read_pedidos(db: Session = Depends(get_db)):
    return services.listar_pedidos(db)

@router.get("/pedidos/{pedido_id}", response_model=schemas.Pedido)
def read_pedido(pedido_id: int, db: Session = Depends(get_db)):
    return services.leer_pedido(db, pedido_id)

@router.put("/pedidos/{pedido_id}", response_model=schemas.Pedido)
def update_pedido(pedido_id: int, pedido: schemas.PedidoUpdate, db: Session = Depends(get_db)):
    return services.modificar_pedido(db, pedido_id, pedido)

@router.delete("/pedidos/{pedido_id}", response_model=schemas.Pedido)
def delete_pedido(pedido_id: int, db: Session = Depends(get_db)):
    return services.eliminar_pedido(db, pedido_id)