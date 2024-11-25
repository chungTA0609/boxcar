import React from "react";
import Sidebar from "./Sidebar";

import SelectComponent from "../common/SelectComponent";
import Pagination from "../common/Pagination";
const cartItems = [
  {
    productImage: "/images/resource/add-car1.jpg",
    productName: "Mercedes-Benz, C Class",
    productDescription:
      "2023 C300e AMG Line Night Ed Premium Plus 5dr 9G-Tronic",
    price: "$399",
    originalPrice: "$789",
    brand: "Volvo",
    year: "2023",
    transmission: "Automatic",
    fuelType: "Petrol",
    removeIcon: "/images/icons/remove.svg",
    editIcon: "/images/icons/edit.svg",
  },
  {
    productImage: "/images/resource/add-car2.jpg",
    productName: "Mercedes-Benz, C Class",
    productDescription:
      "2023 C300e AMG Line Night Ed Premium Plus 5dr 9G-Tronic",
    price: "$399",
    originalPrice: "$789",
    brand: "Volvo",
    year: "2023",
    transmission: "Automatic",
    fuelType: "Petrol",
    removeIcon: "/images/icons/remove.svg",
    editIcon: "/images/icons/edit.svg",
  },
  {
    productImage: "/images/resource/add-car3.jpg",
    productName: "Mercedes-Benz, C Class",
    productDescription:
      "2023 C300e AMG Line Night Ed Premium Plus 5dr 9G-Tronic",
    price: "$399",
    originalPrice: "$789",
    brand: "Volvo",
    year: "2023",
    transmission: "Automatic",
    fuelType: "Petrol",
    removeIcon: "/images/icons/remove.svg",
    editIcon: "/images/icons/edit.svg",
  },
];
export default function MyListings() {
  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Quản lý Hãng</h3>
            </div>
            <div className="my-listing-table wrap-listing">
              <div className="cart-table">
                {/* <div className="title-listing">
                  <div className="text-box v1">
                    <div className="form_boxes v3">
                      <small>Sort by</small>

                      <SelectComponent options={["Newest", "Oldest"]} />
                    </div>
                  </div>
                </div> */}
                <table>
                  <thead>
                    <tr>
                      <th>Make</th>
                      <th>Model</th>
                      <th>Year</th>
                      <th>Transmission</th>
                      <th>FuelType</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="shop-cart-product">
                            <div className="shop-product-cart-img">
                              <img
                                alt={item.productName}
                                src={item.productImage}
                                width={120}
                                height={105}
                              />
                            </div>
                            <div className="shop-product-cart-info">
                              <h3>
                                <a href="#" title={item.productName}>
                                  {item.productName}
                                </a>
                              </h3>
                              <p>{item.productDescription}</p>
                              <div className="price">
                                <span>{item.price}</span>
                                <del>{item.originalPrice}</del>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span>{item.brand}</span>
                        </td>
                        <td>
                          <span>{item.year}</span>
                        </td>
                        <td>
                          <span>{item.transmission}</span>
                        </td>
                        <td>
                          <span>{item.fuelType}</span>
                        </td>
                        <td>
                          <a href="#" className="remove-cart-item">
                            <img
                              alt="Remove item"
                              src={item.removeIcon}
                              width={18}
                              height={18}
                            />
                          </a>
                          <a href="#" className="remove-cart-item">
                            <img
                              alt="Edit item"
                              src={item.editIcon}
                              width={18}
                              height={18}
                            />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="pagination-sec">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <Pagination />
                    </ul>
                    <div className="text">Showing results 1-30 of 1,415</div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
