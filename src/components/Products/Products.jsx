import React, { Component } from "react";

export default class Products extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      price: "",
      discount: "",
      products: [],
      editingItem: null,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, price, discount, products, editingItem } = this.state;

    if (discount < 0 || discount > 100) {
      return alert("Discountni to'g'ri kiriting!");
    }
    if (!title) {
      return alert("Titleni kiriting");
    }
    if (!price) {
      return alert("Priceni kiriting");
    }

    if (editingItem) {
      const updated = products.map((p) =>
        p.id === editingItem.id
          ? { id: editingItem.id, title, price, discount }
          : p
      );
      this.setState({
        products: updated,
        title: "",
        price: "",
        discount: "",
        editingItem: null,
      });
    } else {
      const newProduct = {
        id: Date.now(),
        title,
        price: Number(price),
        discount: Number(discount),
      };
      this.setState({
        products: [...products, newProduct],
        title: "",
        price: "",
        discount: "",
      });
    }
  };

  handleDelete = (id) => {
    this.setState({ products: this.state.products.filter((p) => p.id !== id) });
  };

  handleUpdate = (item) => {
    this.setState({
      title: item.title,
      price: item.price,
      discount: item.discount,
      editingItem: item,
    });
  };

  handleCancel = () => {
    this.setState({
      title: "",
      price: "",
      discount: "",
      editingItem: null,
    });
  };

  discountedPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  render() {
    const { title, price, discount, products, editingItem } = this.state;
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Products (Class component)</h2>
        <form onSubmit={this.handleSubmit} className=" mb-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => this.setState({ title: e.target.value })}
            className="border p-1 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => this.setState({ price: e.target.value })}
            className="border p-1 rounded"
          />
          <input
            type="number"
            placeholder="Discount (0-100)"
            value={discount}
            onChange={(e) => this.setState({ discount: e.target.value })}
            className="border p-1 rounded"
          />
          <button className="bg-[#0389ff] text-white px-3 py-1 rounded cursor-pointer">
            {editingItem ? "Update" : "Add"}
          </button>

          {editingItem && (
            <button
              type="button"
              onClick={this.handleCancel}
              className="bg-gray-500 text-white px-3 py-1 rounded ml-2 cursor-pointer"
            >
              Cancel
            </button>
          )}
        </form>

        <div className="grid grid-cols-5 gap-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="p-3 mb-2 rounded-3xl bg-white shadow-md"
            >
              <h3 className="font-semibold">{item.title}</h3>
              {item.discount > 0 ? (
                <div>
                  <p className="text-gray-500 ">
                    Old Price:{" "}
                    <span className="line-through">{item.price}</span>
                  </p>

                  {item.discount === 100 ? (
                    <p className="text-green-600 font-bold">Free </p>
                  ) : (
                    <p className="text-green-600 font-bold">
                      Discounted:{" "}
                      {this.discountedPrice(item.price, item.discount)} so‘m
                    </p>
                  )}

                  <p className="text-sm ">Discount: {item.discount}% </p>
                </div>
              ) : (
                <p>Price: {item.price}</p>
              )}
              <div className="flex items-center gap-2 mt-5">
                <button
                  onClick={() => this.handleDelete(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2 cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={() => this.handleUpdate(item)}
                  className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
