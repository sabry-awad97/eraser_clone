import React from 'react';

const Hero = () => {
  return (
    <section className="bg-black">
      <div
        className="flex items-baseline 
        justify-center pt-20"
      >
        <h2 className="rounded-full border border-white p-2 px-3 text-center text-white">
          See What's New | <span className="text-sky-300">AI Diagram</span>
        </h2>
      </div>
      <div className="mx-auto h-screen max-w-screen-xl px-4 py-12 lg:flex">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold text-sky-300 sm:text-5xl">
            Documents & diagrams
            <strong className="font-extrabold text-white sm:block">
              for engineering teams.
            </strong>
          </h1>

          <p className="mt-4 text-slate-200 sm:text-xl/relaxed">
            All-in-one markdown editor, collaborative canvas, and
            diagram-as-code builder
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-black shadow hover:bg-slate-100 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
