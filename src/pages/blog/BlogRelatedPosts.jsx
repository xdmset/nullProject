import React from "react";
import { Link } from "react-router-dom";
import blogData from "../../data/blogPosts.js";

export default function BlogRelatedPosts() {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4 text-primary-700">📰 Otros artículos sobre la LSM</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {blogData.slice(1).map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className="flex items-center bg-primary-200 shadow rounded p-4 min-w-[250px] hover:shadow-lg transition-shadow"
          >
            <img src={post.image} alt={post.title} className="w-20 h-20 rounded object-cover" />
            <div className="ml-3">
              <h5 className="font-medium text-primary-100">{post.title}</h5>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

