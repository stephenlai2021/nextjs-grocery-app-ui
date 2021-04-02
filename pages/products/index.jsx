import React from "react";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "data", "db.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
  };
};

const Products = ({ products }) => {
  return (
    <div>
      <header>
        <nav>
          <div className="flex action-bar">
            <Link href="/category">
              <a>
                <span className="las la-angle-left"></span>
              </a>
            </Link>
            <div className="info">
              <h2>Fruits</h2>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className="products-wrapper section-wrapper">
          <div className="products">
            {products.map((product) => (
              <div className="product" key={product.id}>
                <Link href={`/products/${product.id}`}>
                  <a>
                    <div
                      className="prod-img"
                      style={{ backgroundImage: `url(${product.image})` }}
                    ></div>
                    <h3 className="prod-title">
                      <a href="/product">{product.title}</a>
                    </h3>
                    <small>{product.weight}</small>
                    <h4 className="prod-price">{product.price}</h4>

                    <button className="to-cart-btn">
                      <span className="las la-plus"></span>
                    </button>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;
