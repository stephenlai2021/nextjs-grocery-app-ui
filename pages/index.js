import Head from "next/head";
import Link from "next/link";
import fs from "fs/promises";
import path from "path";

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "data", "db.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      categories: data.categoryMenu,
      promos: data.promos,
      deals: data.deals,
    },
  };
};

export default function Home({ categories, promos, deals }) {
  return (
    <div>
      <Head>
        <title>Grocery Mobile App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          <div className="info">
            <p>Hey!</p>
            <p>Let's search your grocery food</p>
          </div>
          <div
            className="img"
            style={{ backgroundImage: "url(img/user.jpg)" }}
          ></div>
        </nav>
        <div className="search">
          <span className="las la-search"></span>
          <input type="text" placeholder="Search your daily Grocery food ..." />
        </div>
      </header>

      <main>
        <div className="categories section-wrapper">
          <div className="flex-header">
            <h2>Categories</h2>
            <Link href="/category">
              <a>See all</a>
            </Link>
          </div>
          <div className="items">
            {categories.map((category) => (
              <div className="item" key={category.id}>
                <div
                  className="item-img"
                  style={{ backgroundImage: `url(${category.image})` }}
                ></div>
                <h4>{category.title}</h4>
              </div>
            ))}
          </div>
        </div>

        <div className="promo">
          <div className="items promo-items">
            {promos.map((promo) => (
              <div className="promo-item" key={promo.id}>
                <div
                  className="promo-img"
                  style={{ backgroundImage: `url(${promo.image})` }}
                ></div>
                <div className="promo-info">
                  <h3>{promo.title}</h3>
                  <p>{promo.description}</p>
                  <a href="">Order now</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="popular section-wrapper">
          <div className="flex-header">
            <h2>Popular deals</h2>
            <a href="">See all</a>
          </div>
          <div className="items">
            {deals.map((deal) => (
              <div className="popular-item" key={deal.id}>
                <div
                  className="popular-img"
                  style={{ backgroundImage: `url(${deal.image})` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
