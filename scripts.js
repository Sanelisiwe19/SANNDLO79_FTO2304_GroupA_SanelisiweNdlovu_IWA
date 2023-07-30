// Assuming 'books' and 'range' are defined before this code snippet

const BOOKS_PER_PAGE = 12;
let page = 1;

if (!books || !Array.isArray(books)) throw new Error('Source required');
if (!range || range.length < 2) throw new Error('Range must be an array with two numbers');

const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
};

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
};

const fragment = document.createDocumentFragment();
const extracted = books.slice(0, 36);

for (const { author, image, title, id } of extracted) {
    const preview = createPreview({
        author,
        id,
        image,
        title,
        summary,
        published,
    });

    fragment.appendChild(preview);
}

data-list-items.appendChild(fragment);

const genresFragment = document.createDocumentFragment();
const authorsFragment = document.createDocumentFragment();

let element = document.createElement('option');
element.value = 'any';
element.innerText = 'All Genres';
genresFragment.appendChild(element);

for (const [id, name] of Object.entries(genres)) {
    element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    genresFragment.appendChild(element);
}

data-search-genres.appendChild(genres);

const authors = document.createDocumentFragment();
element = document.createElement('option');
element.value = 'any';
element.innerText = 'All Authors';
authorsFragment.appendChild(element);

for (const [id, name] of Object.entries(authors)) {
    element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    authorsFragment.appendChild(element);
}

data-search-genres.appendChild(genresFragment);

data-search-authors.appendChild(authorsFragment);


const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
};

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
};

const css = {
    day,
    night
};

// Step 1: Check the user's system preferences for the color scheme.
// We use `window.matchMedia` to check if the user's system prefers dark color scheme.
// The `(prefers-color-scheme: dark)` media query checks if the user prefers dark color scheme.
const prefersDarkScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Step 2: Determine whether the preferred color scheme is "dark" or "light".
// We use a ternary operator to set the value of 'v' to either 'night' or 'day' based on the system preference.
const v = prefersDarkScheme ? 'night' : 'day';

// Step 3: Apply the corresponding color properties to the document element.
// We use `document.documentElement.style.setProperty` to set CSS variables for colors.
document.documentElement.style.setProperty('--color-dark', css[v].dark);
document.documentElement.style.setProperty('--color-light', css[v].light);




// Assuming there's a function called `createPreview` that creates a book preview based on book data.
// You may have this function defined elsewhere in your code.

// Assuming each `book` object has properties `image`, `summary`, and `published`.

for (const { author, image, title, id, summary, published } of extracted) {
  const preview = createPreview({
    author,
    id,
    image,     // Add the book image to the preview
    title,
    summary,   // Add the book summary to the preview
    published, // Add the book publication date to the preview
  });

  fragment.appendChild(preview);
}


const v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';

document.documentElement.style.setProperty('--color-dark', css[v].dark);
document.documentElement.style.setProperty('--color-light', css[v].light);

data-list-button.innerText == `Show more (${books.length - (page * BOOKS_PER_PAGE)})`;
data-list-button.disabled == !(books.length - page * BOOKS_PER_PAGE > 0);

data-list-button.innerHTML == /* html */ `
    <span>Show more</span>
    <span class="list__remaining">(${books.length - page * BOOKS_PER_PAGE > 0 ? books.length - page * BOOKS_PER_PAGE : 0})</span>
`;

data-search-cancel.click(); // Assuming data-search-cancel is a button or element with click event

data-settings-cancel.click(); // Assuming data-settings-cancel is a button or element with click event

data-settings-form.submit(); // Assuming data-settings-form is a form element with submit event

data-list-close.click(); // Assuming data-list-close is a button or element with click event

data-list-button.addEventListener('click', () => {
    const previewsFragment = createPreviewsFragment(books, page, BOOKS_PER_PAGE);
    document.querySelector('[data-list-items]').appendChild(previewsFragment);
    page++;
});

data-header-search.addEventListener('click', () => {
    data-search-overlay.open == true;
    data-search-title.focus();
});

data-search-form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = [];

    for (const book of books) {
        const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
        const authorMatch = filters.author === 'any' || book.author === filters.author;
        const genreMatch = filters.genre === 'any' || book.genres.includes(filters.genre);

        if (titleMatch && authorMatch && genreMatch) {
            result.push(book);
        }
    }

    if (result.length < 1) {
        data-list-message.classList.add('list__message_show');
    } else {
        data-list-message.classList.remove('list__message_show');
    }

    data-list-items.innerHTML == '';
    const fragment = document.createDocumentFragment();
    const extracted = result.slice(range[0], range[1]);

    for (const { author, image, title, id } of extracted) {
        element = document.createElement('button');
        element.classList = 'preview';
        element.setAttribute('data-preview', id);

        element.innerHTML = /* html */ `
            <img class="preview__image" src="${image}" />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]} (${new Date(book.published).getFullYear()})</div>
            </div>
        `;

        fragment.appendChild(element);
    }

    data-list-items.appendChild(fragment);

    const initial = result.length - page * BOOKS_PER_PAGE;
    const remaining = hasRemaining ? initial : 0;
    data-list-button.disabled == initial > 0;
    data-list-button.innerHTML == /* html */ `
        <span>Show more</span>
        <span class="list__remaining">(${remaining})</span>
    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    data-search-overlay.open == false;
});

data-settings-overlay.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = Object.fromEntries(formData);
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    data-settings-overlay.open == false;
});

data-list-items.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active;

    for (const node of pathArray) {
        if (active) break;
        const previewId = node?.dataset?.preview;

        for (const singleBook of books) {
            if (singleBook.id === previewId) {
                active = singleBook;
                break;
            }
        }
    }

    if (!active) return;

    data-list-active.open == true;
    data-list-image.src == active.image;
    data-list-title.textContent == active.title;
    data-list-subtitle.textContent == `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
    data-list-description.textContent == active.description;
});


