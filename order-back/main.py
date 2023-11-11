from fastapi import FastAPI, Request
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
import sqlite3
from pydantic import BaseModel
from sqladmin import Admin, ModelView
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base = declarative_base()
engine = create_engine(
    "sqlite:///orders.db",
    connect_args={"check_same_thread": False},
)
Session = sessionmaker(bind=engine)


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    phone = Column(String)
    email = Column(String)
    
class Or_request(BaseModel):
    name: str | None = None
    phone: str 
    email: str


Base.metadata.create_all(engine)

admin = Admin(app, engine)

class OrderAdmin(ModelView, model=Order):
    column_list = [Order.id, Order.phone, Order.email, Order.name]

admin.add_view(OrderAdmin)


@app.post('/add_order', status_code=201)
def add_order(request: Or_request):
    session = Session()
    new_order = Order(
        name = request.name,
        phone = request.phone,
        email = request.email
    )
    session.add(new_order)
    session.commit()


if __name__ == '__main__':
    import uvicorn

    uvicorn.run("main:app", reload=True)