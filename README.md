# MovieMaster

MovieMaster is a React-based web application that displays and sorts movies fetched from the [The Movie Database (TMDb)](https://www.themoviedb.org/) API. It allows users to explore movies in various categories like "Popular," "Top Rated," and "Upcoming." The app also provides a filter and sort functionality based on user ratings and release dates, along with a dark mode toggle feature for better accessibility.

## Features

- **Movie Lists**: Displays movies in three categories: Popular, Top Rated, and Upcoming.
- **Sorting**: Users can sort movies by release date or rating in ascending or descending order.
- **Filtering**: Filter movies by minimum user rating (6+, 7+, or 8+ stars).
- **Dark Mode**: Toggle between light and dark themes for better accessibility.
- **Responsive Design**: The UI is optimized for various screen sizes.
  
## Installation

Follow the steps below to set up and run the project locally:

### Prerequisites
Make sure you have the following installed on your machine:
- Node.js (v14+)
- npm (Node Package Manager)

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/moviemaster.git
   cd moviemaster
   ```

2. **Install Dependencies**
   Run the following command to install the necessary npm packages:
   ```bash
   npm install
   ```

3. **Set Up API Key**
   You will need an API key from [TMDb](https://developers.themoviedb.org/3/getting-started/introduction) to fetch movie data.
   - Create a file named `apikey.js` in the `src` folder.
   - In this file, export your API key:
     ```javascript
     const API_KEY = 'your_tmdb_api_key';
     export default API_KEY;
     ```

4. **Run the App**
   Start the development server:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

## Project Structure

The project is organized as follows:

```
moviemaster/
├── public/
├── src/
│   ├── assets/               # Image assets (emojis and icons)
│   ├── components/
│   │   ├── Navbar/           # Navbar component for navigation and dark mode toggle
│   │   ├── MovieList/        # MovieList and its related components like MovieCard, FilterGroup
│   │   └── DarkMode/         # Dark Mode toggle component
│   ├── apikey.jsx            # TMDb API key file (not in version control)
│   ├── App.jsx               # Main application component
│   ├── App.css               # Global styles for App
│   ├── main.jsx              # Entry point for React application
│   └── index.css             # Global styles and theming (light/dark modes)
```

## Key Files

### `main.jsx`
This is the entry point of the React app. It initializes the `App` component and renders it inside the root div.

### `App.jsx`
The main component that defines the structure of the app, including the `Navbar` and three movie categories: Popular, Top Rated, and Upcoming.

### `Navbar.jsx`
Contains navigation links for Popular, Top Rated, and Upcoming movie sections and includes the Dark Mode toggle.

### `MovieList.jsx`
Fetches movie data from the TMDb API based on the category and renders a list of movies. Also includes filter and sorting functionality.

### `MovieCard.jsx`
Displays individual movie details like title, release date, rating, and a short overview.

### `DarkMode.jsx`
Implements the dark mode feature by toggling the theme between light and dark and persisting the user's preference using `localStorage`.

## Styling

The app uses **CSS Grid** for layout and **CSS Flexbox** for aligning elements. Custom themes (dark and light mode) are applied using CSS variables defined in `index.css`.

### Dark Mode
The dark mode toggle switches the background color and text color by altering the `data-theme` attribute on the body element. The user's preference is saved in `localStorage` for persistence across sessions.

```css
:root {
  --body_background: #101010;
  --body_color: #fff;
  --heading_color: #ffe400;
}

[data-theme="light"] {
  --body_background: #fff;
  --body_color: #000;
  --heading_color: #000;
}
```

## API Integration

MovieMaster uses TMDb’s API to fetch movie details. The API calls are made inside the `MovieList.jsx` component. Below is an example of the API call made to fetch the movies for a specific category:

```javascript
const fetchMovies = async () => {
    const apiUrl = `https://api.themoviedb.org/3/movie/${type}?api_key=` + API_KEY;
    const response = await fetch(apiUrl);
    const data = await response.json();
    setMovies(data.results);
    setFilterMovies(data.results);
};
```

## Screenshot

Here is a screenshot of the application:
![Screenshot](src/assets/Screenshot(30).png)

## Future Enhancements

- **Search Feature**: Allow users to search for movies by title.
- **More Filters**: Add filters for genres, languages, and runtime.
- **Infinite Scrolling**: Load more movies as the user scrolls down.

## Contributing

Feel free to submit pull requests or report issues. Contributions are welcome to help improve the app!
