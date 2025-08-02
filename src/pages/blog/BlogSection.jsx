import React from 'react';

export default function BlogSection({ bgColor, img, title, titleColor, content, reverse }) {
  return (
    <section className={`${bgColor} p-6 rounded-xl mb-10`}>
      <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-6`}>
        <img className="w-full md:w-1/2 rounded-xl shadow-lg" src={img} alt="Sección" />
        <div className="md:w-1/2 text-gray-800">
          <h3 className={`text-2xl font-bold mb-2 ${titleColor}`}>{title}</h3>
          {content.map((paragraph, idx) => (
            <p key={idx} className="mb-3">{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
