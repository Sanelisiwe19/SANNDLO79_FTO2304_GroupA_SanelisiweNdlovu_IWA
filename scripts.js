import { authors, books, genres, BOOKS_PER_PAGE } from "./data.js";


let matches = books
let page = 1;
let range = [0, 36];

const items = document.querySelector('[data-list-items]')
const searchCancel = document.querySelector('[data-search-cancel]')
const settingsCancel = document.querySelector('[data-settings-cancel]')
const settingsForm = document.querySelector('[data-settings-form]')
const listClose = document.querySelector('[data-list-close]')
const headerSearch = document.querySelector('[data-header-search]')
const headerSettings = document.querySelector('[data-header-settings]')
const listBtn = document.querySelector('[data-list-button]')
const searchOverlay = document.querySelector('[data-search-overlay]')
const settingsOverlay = document.querySelector('[data-settings-overlay]')
const settingsTheme = document.querySelector('[data-settings-theme]')
const searchFormBtn = document.querySelector('[form="search"]')
const searchTitle = document.querySelector('[data-search-title]')
const searchAuthor = document.querySelector('[data-search-authors]')
const searchGenre = document.querySelector('[data-search-genres]')
const listActive = document.querySelector('[data-list-active]')
const listDescription = document.querySelector('[data-list-description]')
const listSubtitle = document.querySelector('[data-list-subtitle]')
const listTitle = document.querySelector('[data-list-title]')
const listBlur = document.querySelector('[data-list-blur]')
const listImage = document.querySelector('[data-list-image]')
const searchForm = document.querySelector('[data-search-form]')

if (!matches || !Array.isArray(matches)) throw new Error('Source required');
if (!range || range.length < 2) throw new Error('Range must be an array with two numbers');



const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}
const css = {day, night}
const createPreview = ({ author, id, image, title }) => {
    const preview = document.createElement('button');
    preview.classList = 'preview';
    preview.setAttribute('data-preview', id);

    preview.innerHTML = /* html */ `
      <img class="preview__image" src="${image}" alt="${title}">
      <div class="preview__content">
        <h2 class="preview__title">${title}</h2>
        <h3 class="preview__author">${authors[author]}</h3>
      </div>
    `;

    return preview;
  };
  

let fragment = document.createDocumentFragment();
let extracted = matches.slice(range[0], range[1]);

for ( const{ author, image, title, id } of extracted) {
    const preview = createPreview({
        author,
        id,
        image,
        title,
    });

    fragment.appendChild(preview);
}

items.appendChild(fragment)

const genresFragment = document.createDocumentFragment()
let element = document.createElement('option')
element.value = 'any'
element.innerText = 'All genre'
genresFragment.appendChild(element)

for (const [id, name]of Object.entries(genres)) {
    let element = document.createElement('option')
    element.value = id
    element.innerText = name
    genresFragment.appendChild(element)
}


searchGenre.appendChild(genresFragment)

const authorsFregment = document.createDocumentFragment()
let element2 = document.createElement('option')
element.value = 'any'
element.innerText = 'All Authors'
authorsFregment.appendChild(element2)

for (const [id, name] of Object.entries(authors)) {
    let element2 = document.createElement('option')
    element2.value = id
    element2.innerText = name
    authorsFregment.appendChild(element2)
}

searchAuthor.appendChild(authorsFregment)

settingsTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
const v = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';


 
document.documentElement.style.setProperty('--color-dark', css[v].dark);
document.documentElement.style.setProperty('--color-light', css[v].light);



settingsOverlay.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = Object.fromEntries(formData);
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light',css[result.theme].light);
    settingsOverlay.open = false;
});
listBtn.innerText = `Show more (${books.length - [page * BOOKS_PER_PAGE]})`

listBtn.innerHTML = /* html */ [
    `<span>Show more</span>
    <span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>`,
]

listBtn.addEventListener('click', () => {
    const startIndex = page * BOOKS_PER_PAGE;
    const endIndex = (page + 1) * BOOKS_PER_PAGE;
    const fragment = document.createDocumentFragment();

    for (let i = startIndex; i < endIndex && i < matches.length; i++) {
        const book = matches[i];
        const { author, image, title, id } = book;

        const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);


    element.innerHTML = `
      <img class="preview__image" src="${image}">
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
      </div>
    `;

    fragment.appendChild(element);
  }

  items.appendChild(fragment);

  page++;

  const remaining = matches.length - endIndex;
  listBtn.disabled = endIndex >= matches.length;
  listBtn.textContent = `Show more (${remaining})`;
});

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(searchForm);
    const filters = Object.fromEntries(formData);
    const result = [];

    for (let i = 0; i < matches.length; i++) {
        const book = matches [i];

       const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes[filters.title.toLowerCase()]
       const authorMatch = filters.author = 'any' || book.author === filters.author;
       const genreMatch = filters.genre = 'any' || book.author === filters.genre;


        if (titleMatch && authorMatch && genreMatch) {
          result.push(book);
        }
    }
    const dataListMessage = document.querySelector('[data-list-message]');

    if (result.length < 1) {
       dataListMessage.classList.add('list__message_show');
       items.innerHTML = '';
    }  else {
     data-list-message.class.remove('list__message_show')
     items.innerHTML = '';
    
    const fragment = document.createDocumentFragment();

    for (const book of result) {
        const { author, image, title, id } = books;

        const element = document.createElement('button');
        element.classList = 'preview';
        element.setAttribute('data-preview', id);

        element.innerHTML = `
        <img class="preview__image" src="${image}">
        <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
        </div>
      `;


        fragment.appendChild(element);
    }
    
    items.appendChild(fragments);
  } 

  searchOverlay.open = false;
  listBtn.disabled = true

 });

 fragment = document.createDocumentFragment()
extracted = books.slice(0, 36)

for (const { author, image, title, id } of extracted) {
  //const { author: authorId, id, image, title } = props

  const element = document.createElement('button')
  element.classList = 'preview'
  element.setAttribute('data-preview', id)

  element.innerHTML = /* html */ `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `
        fragment.appendChild(element)
    }

  items.appendChild(fragment)

html.search.button.addEventListener("click", handleSearchButtonClick);

html.search.cancel.addEventListener("click", handleSearchCancelClick);

html.settings.button.addEventListener("click", handleSettingsButtonClick);

html.settings.cancel.addEventListener("click", handleSettingsCancelClick);

html.list.close.addEventListener("click", handleBookPreviewCloseClick);

html.list.button.addEventListener("click", handleListButtonClick);

html.list.items.addEventListener("click", handleListItemClick);

html.settings.form.addEventListener("submit", updateDarkLightMode);

html.search.form.addEventListener("submit", handleFilterFormSubmit);

  