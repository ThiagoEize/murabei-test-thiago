import json
import sqlite3

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def hello_world():
    return "Hello, World!"

# GET /api/v1/books - returns a list of all books


@app.route('/api/v1/books', methods=['GET'])
def get_books():
    # Get the page and page_size parameters from the request arguments
    page = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=10, type=int)

    # Call the get_all_books function with the page and page_size parameters
    books = get_all_books(page=page, page_size=page_size)

    # Return the books as a JSON response
    return jsonify(books)


# GET /api/v1/books/author/<author> - returns a list of all books by the given author


@app.route('/api/v1/books/author/<author_slug>', methods=['GET'])
def get_books_by_author(author_slug):
    return jsonify(get_books_by_author_name(author_slug))

# GET /api/v1/books/subject/<subject_slug> - returns a list of all books by the given subject


@app.route('/api/v1/books/subjects', methods=['GET'])
def get_books_by_subject():
    return jsonify(get_books_by_subject())

# GET /api/v1/books/subjects/<subject_slug> - returns a list of books by the given subject


@app.route('/api/v1/books/subjects/<subject>', methods=['GET'])
def books_by_subject_slug(subject):
    return jsonify(get_books_by_subject_slug(subject))

# GET /api/v1/authors - returns a list of all authors


@app.route('/api/v1/authors', methods=['GET'])
def get_all_authors():
    return jsonify(get_authors())

# POST /api/v1/books - creates a new book


@app.route('/api/v1/books', methods=['POST'])
def create_book():

    # Get the book data from the request body
    book_data = request.get_json()

    return jsonify(create_new_book(book_data))


def get_all_books(page=1, page_size=10):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Calculate the offset based on the page number and page size
    offset = (page - 1) * page_size

    # Execute a SELECT query with pagination
    cursor.execute(f'SELECT * FROM book LIMIT {page_size} OFFSET {offset};')
    books = cursor.fetchall()

    # Convert the books data to a list of dictionaries
    book_list = []
    for book in books:
        book_dict = {
            'id': book[0],
            'title': book[1],
            'author_id': book[3],
            'publisher': book[12],
            'pages': book[17],
            'synopsis': book[21],
        }
        book_list.append(book_dict)

    # Close the database connection
    conn.close()

    # Return the books as a JSON response
    return book_list


def get_authors():
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Execute a SELECT query to fetch all authors
    cursor.execute('SELECT * FROM author;')
    authors = cursor.fetchall()

    author_list = []

    for author in authors:
        author_dict = {
            'id': author[0],
            'title': author[1],
            'slug': author[2],
            'biography': author[3]
        }
        author_list.append(author_dict)

    # Close the database connection
    conn.close()

    # Return the authors as a JSON response
    return author_list


def get_books_by_author_name(author_slug):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Execute a SELECT query to fetch all books by the given author
    cursor.execute(
        'SELECT * FROM book WHERE author_slug = ?;', (author_slug,))
    books = cursor.fetchall()

    # Convert the books data to a list of dictionaries
    book_list = []

    for book in books:
        book_dict = {
            'id': book[0],
            'title': book[1],
            'author_id': book[3],
            'publisher': book[12],
            'pages': book[17],
            'synopsis': book[21],
        }
        book_list.append(book_dict)

    # Close the database connection
    conn.close()

    # Return the books as a JSON response
    return book_list


def get_books_by_subject():
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Execute a SELECT query to fetch all subjects, and the slug from the table subject

    cursor.execute("SELECT subjects FROM book;")
    subjects = cursor.fetchall()

    conn.close()

    return subjects


def get_books_by_subject_slug(subject):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    query = '''
    SELECT *
    FROM book
    WHERE subjects = ?
    '''

    # Execute a SELECT query to fetch all books by the given subject
    cursor.execute(query, (subject,))
    books = cursor.fetchall()

    # Convert the books data to a list of dictionaries
    book_list = []

    for book in books:
        book_dict = {
            'id': book[0],
            'title': book[1],
            'author_id': book[3],
            'publisher': book[12],
            'pages': book[17],
            'synopsis': book[21],
        }
        book_list.append(book_dict)

    # Close the database connection
    conn.close()

    # Return the books as a JSON response
    return book_list


def create_new_book(book_data):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Extract book data from the input
    title = book_data['title']
    publisher = book_data['publisher']
    synopsis = book_data['synopsis']
    author_id = book_data['author_id']

    # Retrieve the current maximum id in the book table
    cursor.execute('SELECT MAX(id) FROM book;')
    max_id = cursor.fetchone()[0]

    # Calculate the next id
    next_id = (max_id + 1) if max_id is not None else 1

    # Insert the new book record with the calculated id
    cursor.execute('''
        INSERT INTO book (id, title, publisher, synopsis, author_id)
        VALUES (?, ?, ?, ?, ?);
    ''', (next_id, title, publisher, synopsis, author_id))

    # Commit the transaction
    conn.commit()

    # Close the database connection
    conn.close()

    # Return a success message
    return {'message': 'Book created successfully.'}, 201


# # GET /api/v1/books
# @app.route("/api/v1/books", methods=["GET"])
# def get_books():

#     conn = sqlite3.connect('db.sqlite')
#     cursor = conn.cursor()

#     # Execute a SELECT query to fetch all books
#     cursor.execute('SELECT * FROM book;')
#     books = cursor.fetchall()

#     # Convert the books data to a list of dictionaries
#     book_list = []
#     for book in books:
#         book_dict = {
#             'id': book[0],
#             'title': book[1],
#             'author': book[2],
#             'year': book[3],
#             'genre': book[4]
#         }
#         book_list.append(book_dict)

#     # Close the database connection
#     conn.close()

#     # Return the books as a JSON response
#     return jsonify(book_list)

# # GET /api/v1/authors

# PUT /api/v1/books/<book_id> - updates an existing book
@app.route('/api/v1/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    # Get the book data from the request body
    book_data = request.get_json()

    # Extract fields from the request data
    title = book_data.get('title')
    publisher = book_data.get('publisher')
    synopsis = book_data.get('synopsis')

    # Connect to the database
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Update the book record
    cursor.execute('''
        UPDATE book
        SET title = ?, publisher = ?, synopsis = ?, author_id = ?
        WHERE id = ?;
    ''', (title, publisher, synopsis, author_id, book_id))

    # Commit the changes
    conn.commit()

    # Close the database connection
    conn.close()

    # Return a success message
    return jsonify({'message': 'Book updated successfully.'}), 200
    
# DELETE /api/v1/books/<book_id> - deletes an existing book
@app.route('/api/v1/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()

    # Check if the book exists
    cursor.execute('SELECT * FROM book WHERE id = ?;', (book_id,))
    book = cursor.fetchone()

    if book:
        # Book exists, proceed to delete
        cursor.execute('DELETE FROM book WHERE id = ?;', (book_id,))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Book deleted successfully.'}), 200
    else:
        # Book does not exist
        conn.close()
        return jsonify({'error': 'Book not found.'}), 404