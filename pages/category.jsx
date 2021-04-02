import React from "react";
import Link from "next/link";
import fs from 'fs/promises'
import path from 'path'

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'data', 'db.json')  
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)

  return {
    props: {
      categories: data.categories
    }
  }
}

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
            {
              categories.map((category) => (
                <div className="category-item" key={category.id}>
                  <Link href="/products">
                    <a>
                      <div
                        className="item-img"
                        style={{ backgroundImage: `url(${category.image})` }}
                      ></div>
                      <h4>{ category.title }</h4>
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

export default Categories
