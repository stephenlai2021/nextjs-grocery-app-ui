import React from "react";
import Link from "next/link";

export const getStaticProps = async () => {
  const res = await fetch(
    "https://grocery-app-ui-nextjs-default-rtdb.firebaseio.com/categories.json"
  );
  const data = await res.json();

  const categories = [];
  for (const key in data) {
    categories.push({
      id: key,
      image: data[key].image,
      title: data[key].title,
    });
  }

  return {
    props: {
      categories,
    },
  };
};

const Categories = ({ categories }) => {
  return (
    <div>
      <header>
        <nav>
          <div className="flex action-bar">
            <Link href="/">
              <a>
                <span className="las la-angle-left"></span>
              </a>
            </Link>
            <div className="info">
              <h2>Categories</h2>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className="categories section-wrapper">
          <div className="category-items">
            {categories.map((category) => (
              <div className="category-item" key={category.id}>
                {/* <Link href={`/products/${category.title}`}> */}
                <Link href={`/products/`}>
                  <a>
                    <div
                      className="item-img"
                      style={{ backgroundImage: `url(${category.image})` }}
                    ></div>
                    <h4>{category.title}</h4>
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

export default Categories;
