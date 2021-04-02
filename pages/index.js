import Head from "next/head";
import Link from "next/link";

export const getStaticProps = async () => {
  const res1 = await fetch('https://grocery-app-ui-nextjs-default-rtdb.firebaseio.com/categories.json')
  const data1 = await res1.json()  
  
  const res2 = await fetch(
    "https://grocery-app-ui-nextjs-default-rtdb.firebaseio.com/promos.json"
  );
  const data2 = await res2.json();

  const res3 = await fetch(
    "https://grocery-app-ui-nextjs-default-rtdb.firebaseio.com/deals.json"
  );
  const data3 = await res3.json();

  const categories = []
  for (const key in data1) {
    categories.push({ id: key, image: data1[key].image, title: data1[key].title })
  }

  const promos = []
  for (const key in data2) {
    promos.push({ id: key, image: data2[key].image, title: data2[key].title, description: data2[key].description })
  }
  
  const deals = []
  for (const key in data3) {
    deals.push({ id: key, image: data3[key].image })
  }

  return {
    props: {
      categories,
      promos,
      deals
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
            style={{ backgroundImage: "url(img/handsome.png)" }}
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
