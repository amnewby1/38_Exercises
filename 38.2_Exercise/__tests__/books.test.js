// const request = require("supertest");
// const jwt = require("jsonwebtoken");

// const app = require("../app");
const db = require("../db");
const Book = require("../models/book");

describe("Test Book Class", function () {
  //   beforeEach(async function () {
  //     let b1 = await Book.create({
  //       book: {
  //         isbn: "1234567890",
  //         "amazon-url": "www.springboard.com",
  //         author: "test-author",
  //         language: "test-language",
  //         pages: 1000,
  //         publisher: "test-publisher",
  //         title: "test-title",
  //         year: 2000,
  //       },
  //     });

  //     let b2 = await Book.create({
  //       book: {
  //         isbn: "9876543210",
  //         "amazon-url": "www.google.com",
  //         author: "test2-author",
  //         language: "test2-language",
  //         pages: 500,
  //         publisher: "test2-publisher",
  //         title: "test2-title",
  //         year: 1984,
  //       },
  //     });
  //   });

  afterEach(async function () {
    await db.query("DELETE FROM books");
  });

  afterAll(async () => {
    await db.end();
  });

  //   test("find one", async function () {
  //     let b = await Book.findOne("1234567890");
  //     expect(b).toEqual({
  //       isbn: "1234567890",
  //       amazon_url: "www.springboard.com",
  //       author: "test-author",
  //       language: "test-language",
  //       pages: 1000,
  //       publisher: "test-publisher",
  //       title: "test-title",
  //       year: 2000,
  //     });
  //   });

  //   test("find all", async function () {
  //     let books = await Book.findAll();
  //     expect(books).toEqual([
  //       {
  //         isbn: "1234567890",
  //         amazon_url: "www.springboard.com",
  //         author: "test-author",
  //         language: "test-language",
  //         pages: 1000,
  //         publisher: "test-publisher",
  //         title: "test-title",
  //         year: 2000,
  //       },
  //       {
  //         isbn: "9876543210",
  //         amazon_url: "www.google.com",
  //         author: "test2-author",
  //         language: "test2-language",
  //         pages: 500,
  //         publisher: "test2-publisher",
  //         title: "test2-title",
  //         year: 1984,
  //       },
  //     ]);
  //   });

  //   test("create book", async function () {
  //     let b = await Book.create({
  //       book: {
  //         isbn: "1111111111",
  //         "amazon-url": "www.giphy.com",
  //         author: "GiphyEngineers",
  //         language: "English",
  //         pages: 100,
  //         publisher: "GiphyPubllishers",
  //         title: "Make a Giphy",
  //         year: 2010,
  //       },
  //     });

  //     expect(b.isbn).toBe("1111111111");
  //     expect(b.year).toBe(2010);
  //   });

  //   test("update book", async function () {
  //     // Set up the initial state
  //     const initialBook = await Book.create({
  //       book: {
  //         isbn: "9999999999",
  //         amazon_url: "www.example.com",
  //         author: "initial-author",
  //         language: "initial-language",
  //         pages: 200,
  //         publisher: "initial-publisher",
  //         title: "initial-title",
  //         year: 2020,
  //       },
  //     });

  //     // Define the desired changes
  //     const updatedBookData = {
  //       book: {
  //         amazon_url: "www.updated-url.com",
  //         author: "updated-author",
  //         language: "updated-language",
  //         pages: 300,
  //         publisher: "updated-publisher",
  //         title: "updated-title",
  //         year: 1990,
  //       },
  //     };

  //     // Call the update method
  //     const updatedBook = await Book.update("1234567890", updatedBookData);

  //     // Retrieve the book after the update
  //     const retrievedBook = await Book.findOne("1234567890");

  //     // Assert that the updated book matches the expected values
  //     expect(updatedBook).toEqual(retrievedBook);
  //   });

  test("remove", async function () {
    // Set up the initial state
    const initialBook = await Book.create({
      book: {
        isbn: "5555555555",
        amazon_url: "www.google.com",
        author: "microsoft",
        language: "multiple",
        pages: 400,
        publisher: "microsoft",
        title: "How to create an email",
        year: 1998,
      },
    });
    console.log(initialBook);
    // Call the remove method
    await Book.remove("5555555555");
    // Retrieve the book after removal (expecting an error)
    await expect(Book.findOne("5555555555")).toThrow(
      `There is no book with an isbn 5555555555`
    );
  });
});
