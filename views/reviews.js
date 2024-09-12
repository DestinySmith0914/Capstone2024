import html from "html-literal";

export default state => html`
  <section id="reviews">
    <form id="reviews" method="POST" action="">
      <h2>Customer Reviews</h2>
      <div>
        <label for="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter Name"
          required
        />
      </div>

      <div>
        <label for="review">Review:</label>
        <input
          type="text"
          name="review"
          id="review"
          placeholder="Enter Review"
          required
        />
      </div>

      <div>
        <label for="rating">Rating:</label>
        <input
          type="number"
          name="rating"
          id="rating"
          placeholder="Rating here"
          required
        />
      </div>

      <div>
        <label for="date">Date:</label>
        <input
          type="date"
          name="date"
          id="date"
          placeholder="Date"
          required
        />
      </div>
      <input type="submit" name="submit" value="Submit Review" />
    </form>
    <div class="reviews-box">
      <h2>Thing</h2>
      <table id="table">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Review</th>
          <th scope="col">Rating</th>
          <th scope="col">Date</th>
        </tr>
        ${state.reviews
          .map(reviews => {
            return `<tr><td>${reviews.name}</td><td>${reviews.review}</td><td>${reviews.rating}</td><td>${reviews.date}</td></tr>`;
          })
          .join("")}
      </table>
    </div>
  </section>
`;
