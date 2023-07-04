const db = require("../db");

/** Collection of related methods for books. */

class Book {
  /** given an isbn, return book data with that isbn:
   *
   * => {isbn, amazon_url, author, language, pages, publisher, title, year}
   *
   **/

  static async findOne(isbn) {
    const bookRes = await db.query(
      `SELECT isbn,
                amazon_url,
                author,
                language,
                pages,
                publisher,
                title,
                year
            FROM books 
            WHERE isbn = $1`,
      [isbn]
    );

    if (bookRes.rows.length === 0) {
      throw { message: `There is no book with an isbn '${isbn}`, status: 404 };
    }

    return bookRes.rows[0];
  }

  /** Return array of book data:
   *
   * => [ {isbn, amazon_url, author, language,
   *       pages, publisher, title, year}, ... ]
   *
   * */

  static async findAll() {
    const booksRes = await db.query(
      `SELECT isbn,
                amazon_url,
                author,
                language,
                pages,
                publisher,
                title,
                year
            FROM books 
            ORDER BY title`
    );

    return booksRes.rows;
  }

  /** create book in database from data, return book data:
   *
   * {isbn, amazon_url, author, language, pages, publisher, title, year}
   *
   * => {isbn, amazon_url, author, language, pages, publisher, title, year}
   *
   * */

  static async create({ book }) {
    const result = await db.query(
      `INSERT INTO books (
            isbn,
            amazon_url,
            author,
            language,
            pages,
            publisher,
            title,
            year) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING isbn,
                 amazon_url,
                 author,
                 language,
                 pages,
                 publisher,
                 title,
                 year`,
      [
        book.isbn,
        book["amazon-url"],
        book.author,
        book.language,
        book.pages,
        book.publisher,
        book.title,
        book.year,
      ]
    );
    console.log("Database insertion result:", result.rows[0]);
    return result.rows[0];
  }

  /** Update data with matching ID to data, return updated book.

   * {isbn, amazon_url, author, language, pages, publisher, title, year}
   *
   * => {isbn, amazon_url, author, language, pages, publisher, title, year}
   *
   * */

  static async update(isbn, { book }) {
    const result = await db.query(
      `UPDATE books SET 
            amazon_url=($1),
            author=($2),
            language=($3),
            pages=($4),
            publisher=($5),
            title=($6),
            year=($7)
            WHERE isbn=$8
        RETURNING isbn,
                  amazon_url,
                  author,
                  language,
                  pages,
                  publisher,
                  title,
                  year`,
      [
        book.amazon_url,
        book.author,
        book.language,
        book.pages,
        book.publisher,
        book.title,
        book.year,
        isbn,
      ]
    );

    if (result.rows.length === 0) {
      throw { message: `There is no book with an isbn '${isbn}`, status: 404 };
    }

    return result.rows[0];
  }

  /** remove book with matching isbn. Returns undefined. */

  static async remove(isbn) {
    const result = await db.query(
      `DELETE FROM books 
         WHERE isbn = $1 
         RETURNING isbn`,
      [isbn]
    );

    if (result.rows.length === 0) {
      throw { message: `There is no book with an isbn '${isbn}`, status: 404 };
    }
  }
}

module.exports = Book;
