import MovieCard from '../cards/MovieCard';
import ReadingState from '../ReadingState';

function BookDetails({ name, writer }) {
  return (
    <div>
      <h2 className="text-lg font-semibold">{name}</h2>
      <span className="text-base text-gray-600 dark:text-gray-300">
        {writer}
      </span>
    </div>
  );
}

export default function ActivitesSection() {
  return (
    <section className="mt-20">
      <div>
        <h2 className="text-3xl font-bold">Activites</h2>
      </div>
      <div className="mt-5 flex gap-5 sm:flex-col">
        {/* Left Side */}
        <div className="basis-2/4">
          <p className="text-base">
            Looking for inspiration? Check out what inspire me, I'm reading and
            the last few I've finished.
          </p>
          <div>
            <ReadingState
              label="Currently reading..."
              readingState="Reading"
              classNames="mt-5"
            />
            <div className="mt-3">
              <BookDetails name="Think like a Monk" writer="Jay Shetty" />
            </div>
          </div>
          <div>
            <ReadingState
              label="Just finished"
              readingState="Done"
              classNames="mt-5"
            />
            <div className="mt-3">
              <BookDetails
                name="Pattern"
                writer="Lydia Hallie	&#38; Addy Osmani"
              />
            </div>
          </div>
        </div>

        {/* Divide */}
        <div>
          <div className="h-full border border-gray-200 dark:border-gray-800" />
        </div>

        {/* Right Side */}
        <div className="basis basis-2/4">
          <p className="text-base">
            Struggling for a film to watch? Here's the latest few from me.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-5">
            <MovieCard
              url="https://www.imdb.com/title/tt6468322/"
              image="money-heist"
              alt="Money Heist"
            />
            <MovieCard
              url="https://imdb.com/title/tt0903747/"
              image="breaking-bad"
              alt="Breaking Bad"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
