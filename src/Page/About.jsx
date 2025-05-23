import React from 'react';
import './About.css';


const About = () => {
  return (
    <>
      <section className="about-section">
        <div className="about-container">
          <h1>About Our Bookstore</h1>
          <p>
            Welcome to [Online Bookstore], your one-stop destination for a wide variety of books.
            Whether you're looking for the latest bestseller, classic novels, educational books, or niche genres, we have it all.
            Our goal is to bring the joy of reading to people of all ages and backgrounds, offering a curated selection of books that cater to every reader's taste.
          </p>
          
          <div className="about-content">
            <div className="about-image">
              <img 
                src="https://static1.thetravelimages.com/wordpress/wp-content/uploads/2019/11/Argosy-Cropped.jpg" 
                alt="Our Bookstore" 
                className="about-img" 
              />
              <img 
                src="https://thumbs.dreamstime.com/b/modern-spacious-bookshop-natural-color-29821239.jpg"
                alt="Our Bookstore" 
                className="about-img" 
              />
            
             </div>
             
          

            <div className="about-text">
              <h2>Our Mission</h2>
              <p>
                At [Online Bookstore], we believe in the power of books to enrich minds and broaden horizons.
                Our mission is to make books accessible to everyone, offering not only a wide selection of titles but also a seamless shopping experience.
                We aim to build a community of readers and support local authors and publishers.
              </p>
              
              <h2>Why Choose Us?</h2>
              <ul>
                <li>Fast and reliable shipping</li>
                <li>A vast selection of books across all genres</li>
                <li>Expert recommendations and reviews</li>
                <li>Easy returns and exchanges</li>
              </ul>

              <h2>Join Us Today!</h2>
              <p>
                Explore our extensive collection and start your next reading adventure with us.
                Join the growing community of book lovers at [Your Bookstore Name] today!
              </p>
            </div>
          </div>
        </div>
        
      </section>
    </>
  );
};

export default About;
