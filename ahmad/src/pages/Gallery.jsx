import { gallery } from "../data/content";
import { useTitle } from "../hooks";
import { PageHeader } from "../components/Ui";

export default function Gallery() {
  useTitle(
    "Gallery",
    "Photographs from AWS Student Builder Group sessions at COMSATS University Islamabad."
  );

  return (
    <div className="page gallery-page">
      <svg className="gallery-art" viewBox="0 0 560 250" aria-hidden="true">
        <g fill="none" stroke="#c9b8ff" strokeWidth="2.4">
          <rect x="18" y="16" width="524" height="78" rx="12" />
          <rect x="46" y="30" width="78" height="50" rx="4" />
          <rect x="140" y="30" width="78" height="50" rx="4" />
          <rect x="234" y="30" width="78" height="50" rx="4" />
          <rect x="328" y="30" width="78" height="50" rx="4" />
          <rect x="422" y="30" width="78" height="50" rx="4" />
        </g>
        <g fill="#c9b8ff">
          {[52, 118, 214, 280, 376, 442, 508].map((x) => (
            <rect key={`t${x}`} x={x} y="22" width="14" height="7" rx="2" />
          ))}
          {[52, 118, 214, 280, 376, 442, 508].map((x) => (
            <rect key={`b${x}`} x={x} y="81" width="14" height="7" rx="2" />
          ))}
        </g>
        <g transform="rotate(-7 150 190)">
          <rect x="36" y="118" width="168" height="112" rx="8" fill="#14121c" stroke="#c9b8ff" strokeWidth="2.4" />
          <path d="M52 206h136" stroke="#8d86c4" strokeWidth="2" />
          <path d="M52 186c22-28 48-28 70 0 16 20 40 18 66-8" fill="none" stroke="#8d86c4" strokeWidth="2" />
          <circle cx="86" cy="156" r="10" fill="none" stroke="#c9b8ff" strokeWidth="2" />
        </g>
        <g transform="rotate(6 400 188)">
          <rect x="250" y="112" width="176" height="118" rx="8" fill="#14121c" stroke="#c9b8ff" strokeWidth="2.4" />
          <rect x="266" y="128" width="144" height="72" rx="4" fill="none" stroke="#8d86c4" strokeWidth="2" />
          <path d="M266 214h52M334 214h76" stroke="#8d86c4" strokeWidth="2" />
          <circle cx="378" cy="156" r="12" fill="none" stroke="#c9b8ff" strokeWidth="2" />
        </g>
      </svg>
      <PageHeader
        kicker="Gallery"
        art={null}
        title="The year, in the room."
        lede="Kickoff, the quiz at Tech Fest, and the architecture session. Community Day photographs land here after 24 November."
      />
      <div className="wrap masonry">
        {gallery.map((photo) => (
          <figure key={photo.src + photo.caption}>
            <img src={photo.src} alt={photo.alt} loading="lazy" />
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
