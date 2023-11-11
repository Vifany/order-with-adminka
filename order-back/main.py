from fastapi import FastAPI
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import declarative_base
import sqlite3
from sqladmin import Admin, ModelView


con = sqlite3.connect("orders.db")

app = FastAPI()

Base = declarative_base()
engine = create_engine(
    "sqlite:///orders.db",
    connect_args={"check_same_thread": False},
)


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    phone = Column(String)
    email = Column(String)


Base.metadata.create_all(engine)



app = FastAPI()
admin = Admin(app, engine)


class OrderAdmin(ModelView, model=Order):
    column_list = [Order.id, Order.phone, Order.email, Order.phone]


admin.add_view(OrderAdmin)

if __name__ == '__main__':
    import uvicorn

    uvicorn.run("main:app", reload=True)