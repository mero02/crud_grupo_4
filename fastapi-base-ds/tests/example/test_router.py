import pytest
from typing import Union
from sqlalchemy.orm import Session
from fastapi.testclient import TestClient
from fastapi import status
from tests.database import app, session
from src.example.exceptions import ErrorCode


client = TestClient(app)


def test_read_productos(session: Session) -> None:
    response = client.get(f"/productos")
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == 2
