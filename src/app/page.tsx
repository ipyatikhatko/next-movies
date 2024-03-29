import DiscoverMoviesNav from "@/components/DiscoverMoviesNav";
import MovieCard from "@/components/MovieCard";
import PopularMoviesCarousel from "@/components/MoviesCarousel";
import Link from "next/link";
import getCarouselMovies from "@/api/pages/home/getCarouselMovies";
import { Suspense } from "react";
import { getMovieGenres } from "@/api/movie";

export default async function Home() {
  const carouselMovies = await getCarouselMovies();
  const movieGenres = await getMovieGenres("en");
  return (
    <>
      <div className="px-4 my-4 lg:max-w-screen-xl mx-auto overflow-hidden">
        <PopularMoviesCarousel
          containerClassName="xs:rounded-xl"
          movies={carouselMovies.results.slice(0, 6)}
        />
      </div>
      <section className="px-4 my-4 lg:max-w-screen-xl mx-auto">
        <h1 className="w-fit text-xl text-blue-400">Discover movies</h1>
        <div className="flex items-center mb-4">
          <Suspense fallback={<div className="animate-pulse h-full rounded" />}>
            <DiscoverMoviesNav genres={movieGenres.data.genres} />
          </Suspense>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 sm:gap-x-2 lg:grid-cols-4 lg:gap-x-4 gap-x-1 gap-y-5">
          {carouselMovies.results.map((movie) => (
            <Link scroll={false} key={movie.id} href={`/movie/${movie.id}`}>
              <MovieCard movie={movie} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
