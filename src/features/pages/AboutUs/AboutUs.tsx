import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';

import { AuthorInfo } from './types';

export default function AboutUs({ author }: { author: AuthorInfo }) {
  return (
    <div className="m-auto flex items-start gap-5">
      <div>
        <img
          src={author.url.image}
          alt={author.name}
          loading="lazy"
          decoding="async"
          className="h-7xl flex w-7xl object-contain max-md:hidden"
        />
      </div>
      <div className="flex">
        <div className="flex w-full flex-col items-center justify-center text-justify">
          <h3 className="text-2xl font-semibold uppercase">{author.name}</h3>
          <p className="text-xl">{author.title}</p>
          <p className="mt-3 uppercase">bio</p>
          <p className="mb-3 text-justify">{author.bio}</p>
          <p className="mt-3 uppercase">education</p>
          <ul className="mb-3 list-inside list-disc text-left">
            {author.education?.map(({ instituteName, certificate }, index) => (
              <li key={index}>
                {instituteName.includes('RS School, React Course 2025Q3') ? (
                  <a
                    href="https://rs.school/courses/reactjs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-button-reload"
                  >
                    {instituteName}
                  </a>
                ) : (
                  instituteName
                )}

                {certificate && (
                  <>
                    {' — '}
                    <a
                      href={certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-button-reload"
                    >
                      certificate
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-3 uppercase">skills</p>
          <p className="text-center">{author.skills}</p>
          <ul className="text-muted-foreground mt-3 list-inside list-disc text-left text-sm">
            <div className="mt-3 flex items-center gap-2.5">
              <ul className="flex flex-row items-center">
                <li className="flex">
                  <Link
                    to={author.url.gitHub}
                    target="_blank"
                    className="hover:text-button-reload p-3 transition-colors duration-300 lg:p-2"
                  >
                    <Github strokeWidth={1.25} size={28} className="max-sm:size-6" />
                  </Link>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
