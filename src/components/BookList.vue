<template>
  <div class="mt-5">
    <h2>Book List</h2>

    <div v-if="books.length === 0">
      No books found.
    </div>

    <div
      v-for="book in books"
      :key="book.id"
      class="border rounded p-3 mb-3"
    >
      <div v-if="editingId !== book.id">
        <p><strong>Name:</strong> {{ book.name }}</p>
        <p><strong>ISBN:</strong> {{ book.isbn }}</p>

        <button
          class="btn btn-primary me-2"
          @click="startEdit(book)"
        >
          Edit
        </button>

        <button
          class="btn btn-danger"
          @click="deleteBook(book.id)"
        >
          Delete
        </button>
      </div>

      <div v-else>
        <div class="mb-2">
          <label class="form-label">Name</label>
          <input
            v-model="editName"
            type="text"
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">ISBN</label>
          <input
            v-model="editIsbn"
            type="number"
            class="form-control"
          />
        </div>

        <button
          class="btn btn-success me-2"
          @click="updateBook(book.id)"
        >
          Save
        </button>

        <button
          class="btn btn-secondary"
          @click="cancelEdit"
        >
          Cancel
        </button>
      </div>
    </div>

    <hr class="my-5" />

    <h2>Query Results</h2>

    <p>
      Books with ISBN greater than 1000,
      ordered by ISBN ascending,
      limited to 3 results.
    </p>

    <div v-if="queriedBooks.length === 0">
      No matching books found.
    </div>

    <div
      v-for="book in queriedBooks"
      :key="book.id"
      class="border rounded p-3 mb-3"
    >
      <p><strong>Name:</strong> {{ book.name }}</p>
      <p><strong>ISBN:</strong> {{ book.isbn }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import db from '../Firebase/init.js'
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore'

const books = ref([])
const queriedBooks = ref([])

const editingId = ref(null)
const editName = ref('')
const editIsbn = ref('')

const fetchBooks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'books'))

    books.value = querySnapshot.docs.map((bookDoc) => ({
      id: bookDoc.id,
      ...bookDoc.data()
    }))
  } catch (error) {
    console.error('Error retrieving books:', error)
  }
}

const fetchQueriedBooks = async () => {
  try {
    const q = query(
      collection(db, 'books'),
      where('isbn', '>', 1000),
      orderBy('isbn', 'asc'),
      limit(3)
    )

    const querySnapshot = await getDocs(q)

    queriedBooks.value = querySnapshot.docs.map((bookDoc) => ({
      id: bookDoc.id,
      ...bookDoc.data()
    }))
  } catch (error) {
    console.error('Error querying books:', error)
  }
}

const startEdit = (book) => {
  editingId.value = book.id
  editName.value = book.name
  editIsbn.value = book.isbn
}

const cancelEdit = () => {
  editingId.value = null
  editName.value = ''
  editIsbn.value = ''
}

const updateBook = async (id) => {
  try {
    const bookRef = doc(db, 'books', id)

    await updateDoc(bookRef, {
      name: editName.value,
      isbn: Number(editIsbn.value)
    })

    cancelEdit()

    await fetchBooks()
    await fetchQueriedBooks()

    alert('Book updated successfully!')
  } catch (error) {
    console.error('Error updating book:', error)
  }
}

const deleteBook = async (id) => {
  try {
    const bookRef = doc(db, 'books', id)

    await deleteDoc(bookRef)

    await fetchBooks()
    await fetchQueriedBooks()

    alert('Book deleted successfully!')
  } catch (error) {
    console.error('Error deleting book:', error)
  }
}

onMounted(() => {
  fetchBooks()
  fetchQueriedBooks()
})
</script>