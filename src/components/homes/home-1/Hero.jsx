import SelectComponent from "@/components/common/SelectComponent";
import { carTypes } from "@/data/categories";
import { Link } from "react-router-dom";
import React, { useState } from "react";
const categories = ["All", "New", "Used"];
export default function Hero() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <section className="boxcar-banner-section-v1 inventory-pager">
      <div className="container">
        <div className="banner-content">
          <div className="form-tabs">
            <div className="form-tab-content">
              <div
                className="form-tab-content wow fadeInUp"
                data-wow-delay="300ms"
              >
                <div className="form-tab-pane current" id="tab-1">
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    style={{ border: "1px solid #000" }}
                  >
                    <div
                      className="form_boxes"
                      style={{ display: "flex", width: "90%", height: "90%" }}
                    >
                      <input
                        type="email"
                        name="email"
                        className="email"
                        defaultValue=""
                        placeholder="Tìm kiếm"
                        style={{ borderRadius: "35px" }}
                        required
                      />
                    </div>

                    <Link className="form-submit">
                      <button type="submit" className="theme-btn">
                        <i className="flaticon-search" />
                      </button>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
