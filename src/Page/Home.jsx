import React from "react";
import bookVideo from "../assets/videos/books.mp4";
import './Home.css'
const booksData = {
  Fiction: [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description: "A classic tale of love, wealth, and betrayal.",
      img: "https://m.media-amazon.com/images/I/81af+MCATTL.jpg",
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      description: "A powerful story about racial injustice in the Deep South.",
      img: "https://cdn2.penguin.com.au/covers/original/9781785150357.jpg",
    },
  ],
  "Non-fiction": [
    {
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      description: "An exploration of humanity's history and evolution.",
      img: "https://www.the5ammommy.com/wp-content/uploads/2018/09/Review-Sapiens-1-800x675.png",
    },
    {
      title: "Educated",
      author: "Tara Westover",
      description: "A memoir about a woman who escaped her survivalist family to pursue education.",
      img: "https://tse3.mm.bing.net/th/id/OIP.PbDszBsyMXLtP87jAYBF1wHaD4?rs=1&pid=ImgDetMain",
    },
  ],
  "Science Fiction": [
    {
      title: "Dune",
      author: "Frank Herbert",
      description: "A sci-fi epic about politics, religion, and power on a desert planet.",
      img: "https://tse2.mm.bing.net/th/id/OIP.kc59hFr2EgPG2qSem_ZnQQHaK-?rs=1&pid=ImgDetMain",
    },
    {
      title: "Ender's Game",
      author: "Orson Scott Card",
      description: "A young genius is trained to save humanity from an alien threat.",
      img: "https://tse2.mm.bing.net/th/id/OIP.BvNWSc1WSc_1-lgXub-oxAHaMH?rs=1&pid=ImgDetMain",
    },
  ],
  Biography: [
    {
      title: "The Diary of a Young Girl",
      author: "Anne Frank",
      description: "The poignant diary of a Jewish girl hiding during WWII.",
      img: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/723168a.webp",
    },
    {
      title: "Long Walk to Freedom",
      author: "Nelson Mandela",
      description: "The autobiography of South Africa’s beloved leader.",
      img: "https://th.bing.com/th/id/OIP.OIvI9P-b2FJRMr480rwYcQHaL7?w=184&h=298&c=7&r=0&o=5&pid=1.7",
    },
  ],
};

const Home = () => {
  return (
    <>
      {/* Video Banner */}
      <div className="relative overflow-hidden w-full h-screen">
        <video
          src={bookVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4 py-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Discover Your Next Adventure
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white max-w-2xl mb-8">
            Immerse yourself in worlds of imagination, knowledge, and inspiration. From timeless classics to contemporary bestsellers, our collection awaits.
          </p>
          <a href="/services">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg text-lg border-2 border-blue-400 hover:border-blue-300 shadow-md transition-all duration-300">
            Explore Books
          </button>
          </a>
        </div>
      </div>

      {/* Hero Section */}
          <section className="hero">
          <div className="hero-content">
            <h2>Discover Your Next Favourite Books</h2>
            <p>Explore a wide variety of books across all genres</p>
          </div>
        </section>

      {/* Book Categories */}
        <section className="book-categories">
          <h2>Book Categories</h2>
          <div className="categories">
            {Object.entries(booksData).map(([category, books]) => (
              <div className="category-card" key={category}>
                <h3>{category}</h3>
                <div className="books">
                  {books.map((book, index) => (
                    <div className="book" key={index}>
                      <img
                        src={book.img}
                        alt={book.title}
                        className="book-image"
                      />
                      <h4>{book.title}</h4>
                      <p>
                        <em>{book.author}</em>
                      </p>
                      <p>{book.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
    </>
  );
};

export default Home;
