
// Den HTML Content holen
const enterPressed = document.getElementById("submit-btn");
const bookNameInput = document.getElementById("book-name");
const authorNameInput = document.getElementById("author-name");
const displayBook = document.getElementById("display-book");

//Wenn der Enter Button betätigt wird
enterPressed.addEventListener("click", ()=>{
    event.preventDefault();

    const bookName = bookNameInput.value;
    const authorName = authorNameInput.value;

    if (bookName && authorName){
        const newBook = new Book(bookName,  authorName)
        addBookToLibrary(newBook)
        displayName()
    }
})

//Library als Array
const myLibrary = [];


//Constructor vom Book
function Book(name, author) {
  this.name = name;
  this.author = author;
  this.read = false; 
}

//Hizufügen der Bücher
function addBookToLibrary(book) {

    myLibrary.push(book)
}


//Den Namen sowie Author anzeigen lassen
function displayName () {

    //iterieren durch das Library Array

    displayBook.innerHTML ="";
    for (let i = 0; i<myLibrary.length; i++){
        // Elemente werden in HTML Dokument erstellt
        const bookElement = document.createElement("div")
        const removeButton = document.createElement("button")
        removeButton.className = "remove-btn";
        const toggleReadButton = document.createElement ("button")
        toggleReadButton.className = "toggle-read-btn";

        //remove Button wird mit als "Remove" benannt + funktion removeBook aufgerufen mit dem index i 
        removeButton.textContent = "Remove"
        removeButton.addEventListener("click", ()=>removeBook(i))

        //der Schalter wird angezeigt mit wenn read === true, schalte um auf Unread vice versa
        toggleReadButton.textContent = myLibrary[i].read ? "Mark as Unread" : "Mark as Read"
        toggleReadButton.style.backgroundColor = myLibrary[i].read ? "orange" : "white"
        toggleReadButton.style.color = myLibrary[i].read ? "white" : "orange"
        toggleReadButton.addEventListener("click", ()=>toggleReadStatus(i))


        //Bücher werden als Book + Author angezeigt
        bookElement.textContent = `Book: ${myLibrary[i].name}, Author: ${myLibrary[i].author}`

        //Die jenigen Elemente werden hinzugefügt zum DOM
        bookElement.appendChild(removeButton)
        bookElement.appendChild(toggleReadButton)
        displayBook.appendChild(bookElement)
        
    }
}

//Remove Methode
const removeBook = (index) =>{
    myLibrary.splice(index, 1) //überschreibt das originale Array
    displayName()
    
}

//Toggle Methode
const toggleReadStatus = (index) => {

    // ! setzt immer den Zustand umgekehrt => also wenn false, dann wird umgekehrt auf true und vice versa
    myLibrary[index].read = !myLibrary[index].read;
    displayName();
};


