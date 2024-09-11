import os
import pytest
from dotenv import load_dotenv
from fastapi.testclient import TestClient
from typing import Generator
from sqlalchemy import StaticPool, create_engine
from sqlalchemy.orm import sessionmaker, Session
from src.main import app
from src.database import get_db
from src.models import BaseModel
from src.example.services import crear_producto, ProductoCreate
from src.example.schemas import Producto


load_dotenv()

# creamos una db para testing
DATABASE_URL = os.getenv("DB_URL_TEST")
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    # utilizaremos esta funcion para "pisar" la que definimos en src/database.py.
    db = TestingSessionLocal()
    try:
        print("Using test DB!")
        yield db
    finally:
        db.close()

# forzamos a fastapi para que utilice la db para testing.
app.dependency_overrides[get_db] = override_get_db

@pytest.fixture
def session() -> Generator[Session, None, None]:
    # Creamos las tablas en la db de pruebas
    BaseModel.metadata.create_all(bind=engine)

    db = TestingSessionLocal()

    # aqui podemos crear instancias de objetos para hacer tests
    # haciendo uso de las funciones "create_<clase>" de services y los schemas <Clase>Create.
    producto_1 = crear_producto(db, ProductoCreate(nombre="Juan", precio=500))
    producto_2 = crear_producto(
        db, ProductoCreate(nombre="Ana", precio=500)
    )
 
    # db.add_all(
    #     [
    #         persona_1,
    #         persona_2,
    #         mascota_1,
    #         mascota_2,
    #         mascota_3
    #     ]
    # )
    # db.commit()

    yield db

    db.close()
    BaseModel.metadata.drop_all(bind=engine)
