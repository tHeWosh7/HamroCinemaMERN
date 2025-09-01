import { useMemo } from "react";
import { useAppContext } from "../context/AppContext";

function getRandomSubset(array, size) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}

// Client-side recommendations based on favourites + shows
export default function useRecommendations() {
  const { shows = [], favouriteMovies = [] } = useAppContext();

  return useMemo(() => {
    if (!Array.isArray(shows) || shows.length === 0) return [];

    // Collect the ids of fav movies (support multiple shapes)
    const favIds = favouriteMovies
      .map(f => f?._id || f?.id || f?.movieId)
      .filter(Boolean);

    // Build genre weights from favourites
    const genreWeights = {};
    shows.forEach(s => {
      const movieId = s?.movie?._id || s?._id || s?.movieId;
      if (!movieId) return;

      if (favIds.includes(movieId)) {
        const genres = (s?.movie?.genres || s?.genres || [])
          .map(g => (typeof g === "string" ? g : g?.name))
          .filter(Boolean);
        genres.forEach(name => {
          genreWeights[name] = (genreWeights[name] || 0) + 1;
        });
      }
    });

    const noSignal = Object.keys(genreWeights).length === 0;

    const scored = shows
      .map(s => {
        const title = s?.movie?.title || s?.title;
        const id = s?.movie?._id || s?._id || s?.movieId;
        const rating = s?.movie?.vote_average ?? s?.vote_average ?? 0;
        const genres = (s?.movie?.genres || s?.genres || [])
          .map(g => (typeof g === "string" ? g : g?.name))
          .filter(Boolean);

        if (favIds.includes(id)) return null;

        let score = 0;
        if (noSignal) {
          score = rating;
        } else {
          genres.forEach(name => (score += genreWeights[name] || 0));
          score *= rating;
        }

        return title ? { title, score } : null;
      })
      .filter(Boolean);

    // ✅ sort first, then slice top 15
    scored.sort((a, b) => b.score - a.score);

    const topPool = scored.slice(0, 15); 
    return getRandomSubset(topPool, 5).map(x => x.title);
  }, [shows, favouriteMovies]);
}
