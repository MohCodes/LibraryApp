let myLibrary = [];

const book = function (bookName,author,bookDate,bookPages,read,arrayIndex){
    //constructor
    this.bookName = bookName;
    this.author = author;
    this.bookPages = bookPages;
    this.bookDate = bookDate
    this.read = read;
    this.arrayIndex = arrayIndex; 

};

//first book
const firstBook = new book ('Game of Thrones','George R.R. Martin', '1996-07-06',69,true,0);
myLibrary.push(firstBook);




//Variable for new inputs

let newBook
let newBookName;
let newBookAuthor;
let newBookPages;
let newBookPublishDate
let newBookRead;
let newArrayIndex



// Function Adding Book Information to Variables from popup Form

function addBookToLibrary(){

    //book name
    const bookNameInput = document.getElementById("bookNameInput").value;
    newBookName = bookNameInput;

    //book author
    const bookAuthorInput = document.getElementById("bookAuthorInput").value;
    newBookAuthor = bookAuthorInput;

    //book page
    const bookPagesInput = document.getElementById("bookPagesInput").value;
    newBookPages = bookPagesInput;

    //book publish date
    const bookDateInput = document.getElementById("bookDateInput").value;
    newBookPublishDate = bookDateInput;

    if(bookNameInput == "" || bookAuthorInput == ""|| bookPagesInput == ""|| bookDateInput == ""){
        alert("Please Fill in The Form!");
        return false;
    };

    //book read
    newBookRead = document.querySelector('input[name ="read"]:checked').value;

    if(newBookRead ==="Yes"){
    newBookRead = true; 
    }
    else{
    newBookRead = false;
    };

    // setting ID like number using array index
    newArrayIndex = myLibrary.indexOf(newBookName) 

    //adding new object to constructor and closing popup window
    newBook = new book(`${newBookName}`,`${newBookAuthor}`,`${newBookPublishDate}`,`${newBookPages}`,newBookRead,`${newArrayIndex}`);
    myLibrary.push(newBook);
    setData();
    displayBooks();
    
    form.className = "formClosed";

};



// function to open popup
const form = document.getElementById("formClosed");
function formPopUp(){
    form.className = "formOpen";
};

//submit input from form
const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener('click', addBookToLibrary)
// submitBtn.addEventListener('click', displayBooks)


//function to close popup

function formCloseDown(){
    form.className = "formClosed";
};

// open form when + is clicked

let addButton = document.getElementById('addButton');
addButton.addEventListener('click',formPopUp);

// close form when X is clicked 

let xButton = document.getElementById("exitForm");
xButton.addEventListener("click",formCloseDown);

function removeDynamicBooks (){
    var x = document.getElementById("bookDisplay");
    x.className = "bookDelete";
};


//set up/ appending of HTML elements

function createBookElements(item){

    //create book card container div
    let containerDiv = document.getElementById("container");
    const newDiv = document.createElement('div');
    newDiv.setAttribute('id',item.bookName);
    newDiv.setAttribute('data-book-number',`${(myLibrary.indexOf(item)+1)}`)
    if(item.read == true){
     newDiv.className = "bookRead bookDisplay";
     containerDiv.appendChild(newDiv);
     }
     else{
    newDiv.className = "bookNotRead bookDisplay";
    containerDiv.appendChild(newDiv);
     };
 
     ///remove button container
     const removeContainer = document.createElement('div');
     removeContainer.className = "removeContainer";
     newDiv.appendChild(removeContainer);
     //remove button
     const removeButtonElement = document.createElement('button');
     removeButtonElement.setAttribute('id',"remove");
     removeButtonElement.className = 'remove'
     removeButtonElement.textContent = 'X';
     removeContainer.appendChild(removeButtonElement);
     removeButtonElement.addEventListener('click',removeBook);

     //book title
     const containerTitle = document.createElement('p');
     containerTitle.className = "bookContent containerTitle";
     containerTitle.textContent= `Title: ${item.bookName}`
     newDiv.appendChild(containerTitle); 

     const containerAuthor = document.createElement('p');
     containerAuthor.className = "bookContent", "containerAuthor";
     containerAuthor.textContent= `By: ${item.author}`
     newDiv.appendChild(containerAuthor);

     const containerPages = document.createElement('p');
     containerPages.className = "bookContent containerPages";
     containerPages.textContent= `Number of Pages: ${item.bookPages}`;
     newDiv.appendChild(containerPages);

     const containerPublish = document.createElement('p');
     containerPublish.className = "bookContent containerPublish";
     containerPublish.textContent= `Published: ${item.bookDate}`;
     newDiv.appendChild(containerPublish);

     let readButton = document.createElement('button');
     readButton.className = "bookContent readButton";
     if(item.read == true){
     readButton.textContent= "Read" 
     }
     else{
         readButton.textContent = "Unread"
     };
     newDiv.appendChild(readButton);

     readButton.addEventListener('click', ()=>{
        item.read = !item.read
        setData();
        displayBooks();
     });;


};

function displayBooks(){

        removeAllBooks()

        for(let i = 0; i<myLibrary.length;i++){
            createBookElements(myLibrary[i]);
        }


};

function removeAllBooks(){
    let allBooks = document.getElementsByClassName('bookDisplay');
    for (i = allBooks.length-1;i>=0;i--){
        allBooks[i].className = "bookDelete"
    }
    
}

function removeBook(item){
    myLibrary.splice(myLibrary.indexOf(item),1);
    setData();
    displayBooks();
};

displayBooks();

function setData() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}


function restore() {
    if(!localStorage.myLibrary) {
        displayBooks();
    }else {
        let objects = localStorage.getItem('myLibrary') // gets information from local storage to use in below loop to create DOM/display
        objects = JSON.parse(objects);
        myLibrary = objects;
        displayBooks();
    }
}

restore();