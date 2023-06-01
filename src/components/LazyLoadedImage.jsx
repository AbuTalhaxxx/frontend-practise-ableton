function LazyLoadedImage() {
  return (
    <figure className="relative">
      <img loading="lazy"
        srcSet="https://ableton-production.imgix.net/about/poster-juanpe.jpg?auto=compress%2Cformat&w=320 320w, https://ableton-production.imgix.net/about/poster-juanpe.jpg?auto=compress%2Cformat&w=768 768w, https://ableton-production.imgix.net/about/poster-juanpe.jpg?auto=compress%2Cformat&w=1024 1024w, https://ableton-production.imgix.net/about/poster-juanpe.jpg?auto=compress%2Cformat&w=1280 1280w, https://ableton-production.imgix.net/about/poster-juanpe.jpg?auto=compress%2Cformat&w=1440 1440w, https://ableton-production.imgix.net/about/poster-juanpe.jpg?auto=compress%2Cformat&w=1462 1462w"
        src="https://ableton-production.imgix.net/about/poster-juanpe.jpg?auto=compress%2Cformat&ixjsv=1.1.3&w=683"
      />
      <span className="rounded-[50%] bg-[#0000ff] h-20 w-20 absolute top-0 left-0 right-0 bottom-0 m-auto flex justify-center items-center">
        <Icon />
      </span>
      <figcaption className="mt-2 ml-2 text-xs font-semibold">
        Why Ableton - Juanpe Bolivar
      </figcaption>
    </figure>
  );
}

function Icon() {
  return (
    <a href="https://www.youtube.com/watch?v=9SbnhgjeyXA" role="button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="fill-[#ffffff] h-7 w-7 inline-block"
        viewBox="0 0 48 56"
      >
        <path d="M0 0L0 56 48 28 0 0z"></path>
      </svg>
    </a>
  );
}

export default LazyLoadedImage;
